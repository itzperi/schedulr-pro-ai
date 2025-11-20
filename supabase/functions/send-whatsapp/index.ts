import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const TWILIO_ACCOUNT_SID = Deno.env.get("TWILIO_ACCOUNT_SID");
const TWILIO_AUTH_TOKEN = Deno.env.get("TWILIO_AUTH_TOKEN");
const TWILIO_PHONE_NUMBER = Deno.env.get("TWILIO_PHONE_NUMBER");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WhatsAppRequest {
  to: string;
  consultantName: string;
  patientName: string;
  date: string;
  time: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting WhatsApp message send...");

    const { to, consultantName, patientName, date, time }: WhatsAppRequest = await req.json();

    // Validate required fields
    if (!to || !consultantName || !patientName || !date || !time) {
      console.error("Missing required fields");
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Format phone number for WhatsApp (must include country code without +)
    const formattedPhone = to.replace(/\D/g, "");
    const whatsappNumber = `whatsapp:+${formattedPhone}`;
    const fromNumber = `whatsapp:${TWILIO_PHONE_NUMBER}`;

    console.log("Sending to:", whatsappNumber);

    // Construct the message
    const message = `*Appointment Confirmed! ✅*\n\nDear ${patientName},\n\nYour appointment has been successfully booked:\n\n👨‍⚕️ *Consultant:* ${consultantName}\n📅 *Date:* ${date}\n⏰ *Time:* ${time}\n\n📍 *Ultra Bio Hair Transplant Clinic*\n\nPlease arrive 10 minutes early.\n\nThank you for choosing us! 🌟`;

    // Send WhatsApp message using Twilio API
    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;
    
    const auth = btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`);
    
    const response = await fetch(twilioUrl, {
      method: "POST",
      headers: {
        "Authorization": `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        From: fromNumber,
        To: whatsappNumber,
        Body: message,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Twilio API error:", result);
      throw new Error(result.message || "Failed to send WhatsApp message");
    }

    console.log("WhatsApp message sent successfully:", result.sid);

    return new Response(
      JSON.stringify({ 
        success: true, 
        messageSid: result.sid,
        message: "WhatsApp notification sent successfully" 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-whatsapp function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message || "Failed to send WhatsApp message",
        details: error.toString()
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
