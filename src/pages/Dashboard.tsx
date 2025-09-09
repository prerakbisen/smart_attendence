import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Users,
  Calendar,
  TrendingUp,
  AlertTriangle,
  Clock,
  CheckCircle,
  Camera,
  BarChart3
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Dashboard = () => {
  // Sample data for charts
  const attendanceData = [
    { day: 'Mon', attendance: 92 },
    { day: 'Tue', attendance: 88 },
    { day: 'Wed', attendance: 95 },
    { day: 'Thu', attendance: 91 },
    { day: 'Fri', attendance: 89 },
    { day: 'Sat', attendance: 94 },
  ];

  const attendanceDistribution = [
    { name: 'Present', value: 87, color: 'hsl(var(--success))' },
    { name: 'Absent', value: 8, color: 'hsl(var(--danger))' },
    { name: 'Late', value: 5, color: 'hsl(var(--warning))' }
  ];

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Welcome Header */}
      <div className="gradient-hero rounded-xl p-8 text-white shadow-medium">
        <h2 className="text-3xl font-bold mb-2">Welcome to EduTrack Pro</h2>
        <p className="text-xl opacity-90">
          Your comprehensive educational management dashboard
        </p>
        <div className="mt-6 flex space-x-4">
          <Link to="/camera">
            <Button size="lg" className="bg-white/20 text-white border-white/30 hover:bg-white/30 transition-smooth">
              <Camera className="mr-2 h-5 w-5" />
              Start Attendance
            </Button>
          </Link>
          <Link to="/routine">
            <Button variant="outline" size="lg" className="bg-white/10 text-white border-white/30 hover:bg-white/20 transition-smooth">
              <Calendar className="mr-2 h-5 w-5" />
              Generate Routine
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="gradient-card shadow-soft transition-bounce hover:shadow-medium">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">1,247</div>
            <p className="text-xs text-success">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-soft transition-bounce hover:shadow-medium">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Attendance</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">92.4%</div>
            <p className="text-xs text-success">Above average</p>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-soft transition-bounce hover:shadow-medium">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Attendance Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">23</div>
            <p className="text-xs text-warning">Requires attention</p>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-soft transition-bounce hover:shadow-medium">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <Clock className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">8</div>
            <p className="text-xs text-info">Currently running</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Attendance Trend */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-primary" />
              Weekly Attendance Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="attendance" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Attendance Distribution */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-secondary" />
              Attendance Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={attendanceDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {attendanceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/attendance" className="block">
              <div className="p-4 rounded-lg border border-border hover:shadow-soft transition-smooth cursor-pointer gradient-card">
                <BarChart3 className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold text-foreground">View Attendance Reports</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Real-time attendance monitoring and analytics
                </p>
              </div>
            </Link>

            <Link to="/students" className="block">
              <div className="p-4 rounded-lg border border-border hover:shadow-soft transition-smooth cursor-pointer gradient-card">
                <Users className="h-8 w-8 text-secondary mb-3" />
                <h3 className="font-semibold text-foreground">Manage Students</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Student profiles and detention management
                </p>
              </div>
            </Link>

            <Link to="/routine" className="block">
              <div className="p-4 rounded-lg border border-border hover:shadow-soft transition-smooth cursor-pointer gradient-card">
                <Calendar className="h-8 w-8 text-accent mb-3" />
                <h3 className="font-semibold text-foreground">Daily Routine Generator</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Personalized schedules for optimal learning
                </p>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;