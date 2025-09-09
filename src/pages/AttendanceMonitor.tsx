import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Filter,
  Calendar
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const AttendanceMonitor = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  // Sample real-time attendance data
  const realTimeData = [
    { time: '09:00', present: 145, total: 160 },
    { time: '09:30', present: 158, total: 160 },
    { time: '10:00', present: 155, total: 160 },
    { time: '10:30', present: 160, total: 160 },
    { time: '11:00', present: 157, total: 160 },
    { time: '11:30', present: 159, total: 160 },
  ];

  const weeklyTrend = [
    { day: 'Monday', attendance: 92, target: 95 },
    { day: 'Tuesday', attendance: 88, target: 95 },
    { day: 'Wednesday', attendance: 95, target: 95 },
    { day: 'Thursday', attendance: 91, target: 95 },
    { day: 'Friday', attendance: 89, target: 95 },
  ];

  const classAttendance = [
    { class: 'CS-A', present: 45, absent: 5, percentage: 90 },
    { class: 'CS-B', present: 42, absent: 8, percentage: 84 },
    { class: 'IT-A', present: 48, absent: 2, percentage: 96 },
    { class: 'IT-B', present: 40, absent: 10, percentage: 80 },
    { class: 'ECE-A', present: 46, absent: 4, percentage: 92 },
  ];

  const lowAttendanceStudents = [
    { name: 'John Smith', rollNo: 'CS001', attendance: 65, classes: 45, present: 29 },
    { name: 'Sarah Johnson', rollNo: 'IT002', attendance: 68, classes: 44, present: 30 },
    { name: 'Mike Wilson', rollNo: 'ECE003', attendance: 62, classes: 48, present: 30 },
    { name: 'Emma Brown', rollNo: 'CS004', attendance: 69, classes: 46, present: 32 },
  ];

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Real-Time Attendance Monitor</h2>
          <p className="text-muted-foreground mt-1">Live tracking and analytics dashboard</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="transition-smooth">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" className="transition-smooth">
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
          <Button variant="academic" className="transition-bounce">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Live Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="gradient-card shadow-soft animate-pulse-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Live Attendance</CardTitle>
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-success mr-2 animate-pulse"></div>
              <CheckCircle className="h-4 w-4 text-success" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">92.4%</div>
            <p className="text-xs text-success">+2.1% from yesterday</p>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students Present</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">1,152</div>
            <p className="text-xs text-muted-foreground">of 1,247 total</p>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Attendance</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">23</div>
            <p className="text-xs text-warning">Below 70% threshold</p>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">2.3s</div>
            <p className="text-xs text-success">Face recognition speed</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Real-Time Attendance Flow */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-primary" />
              Real-Time Attendance Flow
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={realTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
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
                  dataKey="present" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--success))', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="total" 
                  stroke="hsl(var(--muted-foreground))" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly Trend Comparison */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart className="mr-2 h-5 w-5 text-secondary" />
              Weekly Attendance vs Target
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyTrend}>
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
                <Bar dataKey="attendance" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="target" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Class-wise Attendance and Low Attendance Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Class-wise Attendance */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Class-wise Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {classAttendance.map((classData, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <span className="font-medium text-foreground">{classData.class}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-muted-foreground">
                      {classData.present}/{classData.present + classData.absent}
                    </span>
                    <Badge 
                      variant={classData.percentage >= 90 ? "default" : classData.percentage >= 80 ? "secondary" : "destructive"}
                      className="transition-smooth"
                    >
                      {classData.percentage}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low Attendance Alerts */}
        <Card className="shadow-soft border-l-4 border-l-warning">
          <CardHeader>
            <CardTitle className="flex items-center text-warning">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Low Attendance Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lowAttendanceStudents.map((student, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-warning/5 border border-warning/20">
                  <div>
                    <p className="font-medium text-foreground">{student.name}</p>
                    <p className="text-sm text-muted-foreground">Roll: {student.rollNo}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="destructive" className="mb-1">
                      {student.attendance}%
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      {student.present}/{student.classes} classes
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="warning" className="w-full mt-4 transition-bounce">
              Generate Detention List
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AttendanceMonitor;