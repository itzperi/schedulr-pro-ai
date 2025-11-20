import { useNavigate, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Calendar, Clock, User, Phone, Home, MessageCircle } from "lucide-react";
import { format } from "date-fns";

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { consultant, date, time, name, phone } = location.state || {};

  if (!consultant || !date || !time) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Icon */}
        <div className="text-center mb-8 animate-scale-in">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-success to-success/80 shadow-elevated mb-6 animate-pulse-glow">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-3">
            Appointment Confirmed!
          </h1>
          <p className="text-lg text-muted-foreground">
            Your booking has been successfully confirmed
          </p>
        </div>

        {/* Appointment Details Card */}
        <Card className="glass-card p-8 mb-6 animate-fade-in">
          <h2 className="text-xl font-bold text-navy mb-6 text-center">Appointment Details</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-background/50">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Patient Name</p>
                <p className="font-semibold text-navy text-lg">{name}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-background/50">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Consultant</p>
                <p className="font-semibold text-navy text-lg">{consultant.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-background/50">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-semibold text-navy text-lg">{format(date, "EEEE, MMMM d, yyyy")}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-background/50">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Time</p>
                <p className="font-semibold text-navy text-lg">{time}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-background/50">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Contact Number</p>
                <p className="font-semibold text-navy text-lg">{phone}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* WhatsApp Notification Card */}
        <Card className="glass-card p-6 mb-6 bg-gradient-to-br from-success/5 to-success/10 border-success/20 animate-fade-in">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-5 h-5 text-success" />
            </div>
            <div>
              <h3 className="font-semibold text-navy mb-2">WhatsApp Confirmation</h3>
              <p className="text-sm text-muted-foreground mb-3">
                A confirmation message will be sent to your WhatsApp shortly with all appointment details.
              </p>
              <div className="bg-white rounded-lg p-3 text-sm border border-success/20">
                <p className="text-navy">
                  <strong>Your appointment is confirmed!</strong><br />
                  Consultant: {consultant.name}<br />
                  Date: {format(date, "MMM d, yyyy")}<br />
                  Time: {time}<br />
                  <span className="text-muted-foreground text-xs">Ultra Bio Hair Transplant Clinic</span>
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-4 animate-slide-up">
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate("/")}
            className="h-14 rounded-xl hover:bg-primary/5 border-primary/20"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
          <Button
            size="lg"
            onClick={() => navigate("/")}
            className="h-14 bg-gradient-to-r from-primary to-primary-light hover:shadow-soft transition-all duration-300 btn-shine rounded-xl"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Book Another Appointment
          </Button>
        </div>

        {/* Footer Info */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          Need to make changes? Contact us at{" "}
          <span className="text-primary font-medium">+1 (555) 123-4567</span>
        </p>
      </div>
    </div>
  );
};

export default Success;
