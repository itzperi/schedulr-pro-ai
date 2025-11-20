import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Calendar } from "lucide-react";

const consultants = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialization: "Hair Transplant Surgeon",
    experience: "15+ years",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialization: "Reconstructive Specialist",
    experience: "12+ years",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialization: "Aesthetic Medicine",
    experience: "10+ years",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialization: "Dermatology & Hair Care",
    experience: "18+ years",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    name: "Dr. Olivia Martinez",
    specialization: "Clinical Trichology",
    experience: "8+ years",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
  },
  {
    id: 6,
    name: "Dr. David Lee",
    specialization: "Advanced Hair Restoration",
    experience: "20+ years",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop",
  },
];

const Consultants = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-lg sticky top-0 z-50 shadow-soft">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-navy">Schedulr</h1>
                <p className="text-sm text-muted-foreground">Ultra Bio Hair Transplant</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/admin/login")}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Admin Login
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Expert Consultants</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Choose Your Consultant
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select from our team of experienced specialists to begin your consultation
          </p>
        </div>

        {/* Consultants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {consultants.map((consultant, index) => (
            <Card
              key={consultant.id}
              className="glass-card hover-lift overflow-hidden group cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => navigate(`/booking/${consultant.id}`)}
            >
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
                <img
                  src={consultant.image}
                  alt={consultant.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-navy mb-2">{consultant.name}</h3>
                <p className="text-primary font-medium mb-1">{consultant.specialization}</p>
                <p className="text-sm text-muted-foreground mb-4">{consultant.experience} experience</p>
                <Button
                  className="w-full bg-gradient-to-r from-primary to-primary-light hover:shadow-soft transition-all duration-300 btn-shine"
                  size="lg"
                >
                  Select Consultant
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-8 border-t bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Schedulr - Ultra Bio Hair Transplant Clinic. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Consultants;
