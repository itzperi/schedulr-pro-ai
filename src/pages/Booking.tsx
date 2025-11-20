import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, Clock, ArrowLeft, User } from "lucide-react";
import { format, addDays, setHours, setMinutes } from "date-fns";

const consultants = [
  { id: 1, name: "Dr. Sarah Johnson", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop" },
  { id: 2, name: "Dr. Michael Chen", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop" },
  { id: 3, name: "Dr. Emily Rodriguez", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop" },
  { id: 4, name: "Dr. James Wilson", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop" },
  { id: 5, name: "Dr. Olivia Martinez", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop" },
  { id: 6, name: "Dr. David Lee", image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop" },
];

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30"
];

const Booking = () => {
  const { consultantId } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();

  const consultant = consultants.find(c => c.id === Number(consultantId));

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      navigate("/confirm", {
        state: {
          consultant,
          date: selectedDate,
          time: selectedTime,
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-lg sticky top-0 z-50 shadow-soft">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                <CalendarIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-navy">Book Appointment</h1>
                <p className="text-sm text-muted-foreground">Select date and time</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Consultant Info */}
        {consultant && (
          <Card className="glass-card p-6 mb-8 max-w-4xl mx-auto animate-fade-in">
            <div className="flex items-center gap-4">
              <img
                src={consultant.image}
                alt={consultant.name}
                className="w-20 h-20 rounded-2xl object-cover shadow-soft"
              />
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <User className="w-4 h-4" />
                  <span>Your Consultant</span>
                </div>
                <h2 className="text-2xl font-bold text-navy">{consultant.name}</h2>
              </div>
            </div>
          </Card>
        )}

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Calendar */}
          <Card className="glass-card p-8 animate-slide-up">
            <div className="flex items-center gap-2 mb-6">
              <CalendarIcon className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold text-navy">Select Date</h3>
            </div>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < new Date() || date > addDays(new Date(), 60)}
              className="rounded-2xl border-0 w-full pointer-events-auto"
              classNames={{
                months: "space-y-4 w-full",
                month: "space-y-4 w-full",
                caption: "flex justify-center pt-1 relative items-center mb-4",
                caption_label: "text-lg font-bold text-navy",
                nav: "space-x-1 flex items-center",
                nav_button: "h-10 w-10 bg-transparent hover:bg-primary/10 rounded-xl transition-colors",
                table: "w-full border-collapse space-y-1",
                head_row: "flex w-full",
                head_cell: "text-muted-foreground rounded-xl w-full font-medium text-sm flex-1",
                row: "flex w-full mt-2",
                cell: "relative p-0 text-center text-sm flex-1 focus-within:relative focus-within:z-20",
                day: "h-12 w-full rounded-xl hover:bg-primary/10 transition-colors font-medium",
                day_selected: "bg-primary text-white hover:bg-primary hover:text-white shadow-soft",
                day_today: "bg-accent/10 text-accent font-bold",
                day_disabled: "text-muted-foreground/30 cursor-not-allowed",
              }}
            />
          </Card>

          {/* Time Slots */}
          <Card className="glass-card p-8 animate-slide-up" style={{ animationDelay: "100ms" }}>
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold text-navy">Select Time</h3>
            </div>
            <div className="grid grid-cols-3 gap-3 max-h-[400px] overflow-y-auto pr-2">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  className={`rounded-xl h-12 transition-all duration-300 ${
                    selectedTime === time
                      ? "bg-primary hover:bg-primary-dark shadow-soft scale-105"
                      : "hover:bg-primary/10 hover:border-primary"
                  }`}
                  onClick={() => setSelectedTime(time)}
                  disabled={!selectedDate}
                >
                  {time}
                </Button>
              ))}
            </div>
          </Card>
        </div>

        {/* Continue Button */}
        <div className="max-w-6xl mx-auto mt-8 animate-fade-in">
          <Card className="glass-card p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                {selectedDate && selectedTime ? (
                  <>
                    <p className="text-sm text-muted-foreground mb-1">Selected Appointment</p>
                    <p className="text-lg font-bold text-navy">
                      {format(selectedDate, "EEEE, MMMM d, yyyy")} at {selectedTime}
                    </p>
                  </>
                ) : (
                  <p className="text-muted-foreground">Please select a date and time to continue</p>
                )}
              </div>
              <Button
                size="lg"
                disabled={!selectedDate || !selectedTime}
                onClick={handleContinue}
                className="bg-gradient-to-r from-primary to-primary-light hover:shadow-soft transition-all duration-300 btn-shine px-8"
              >
                Continue to Booking
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Booking;
