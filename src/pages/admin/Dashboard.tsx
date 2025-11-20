import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Calendar, Users, Clock, TrendingUp, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem("adminAuth");
    if (!isAuth) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin/login");
  };

  const stats = [
    { label: "Today's Appointments", value: "12", icon: Calendar, color: "from-primary to-primary-light" },
    { label: "This Week", value: "47", icon: TrendingUp, color: "from-success to-success/80" },
    { label: "Active Consultants", value: "6", icon: Users, color: "from-accent to-accent/80" },
    { label: "Avg. Wait Time", value: "15m", icon: Clock, color: "from-navy to-navy/80" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white shadow-soft sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-navy">Schedulr Admin</h1>
                <p className="text-sm text-muted-foreground">Dashboard Overview</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="rounded-xl"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card
              key={stat.label}
              className="glass-card p-6 hover-lift animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-3xl font-bold text-navy mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="glass-card p-8 mb-8 animate-slide-up">
          <h2 className="text-2xl font-bold text-navy mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              size="lg"
              onClick={() => navigate("/admin/consultants")}
              className="h-20 bg-gradient-to-r from-primary to-primary-light hover:shadow-soft transition-all duration-300 rounded-xl"
            >
              <Users className="w-5 h-5 mr-2" />
              Manage Consultants
            </Button>
            <Button
              size="lg"
              onClick={() => navigate("/admin/availability")}
              className="h-20 bg-gradient-to-r from-primary to-primary-light hover:shadow-soft transition-all duration-300 rounded-xl"
            >
              <Clock className="w-5 h-5 mr-2" />
              Set Availability
            </Button>
            <Button
              size="lg"
              onClick={() => navigate("/admin/appointments")}
              className="h-20 bg-gradient-to-r from-primary to-primary-light hover:shadow-soft transition-all duration-300 rounded-xl"
            >
              <Calendar className="w-5 h-5 mr-2" />
              View Appointments
            </Button>
          </div>
        </Card>

        {/* Recent Activity Placeholder */}
        <Card className="glass-card p-8 animate-fade-in">
          <h2 className="text-2xl font-bold text-navy mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-border/50">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-navy">New appointment booked</p>
                  <p className="text-sm text-muted-foreground">Patient with Dr. Sarah Johnson - {i} hour ago</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
