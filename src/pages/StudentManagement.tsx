import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  Search,
  AlertTriangle,
  FileX,
  Mail,
  Phone,
  Download,
  Filter,
  UserCheck,
  UserX,
  Calendar,
  TrendingDown
} from 'lucide-react';

const StudentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Sample student data
  const students = [
    {
      id: 1,
      name: 'John Smith',
      rollNo: 'CS001',
      class: 'CS-A',
      attendance: 65,
      totalClasses: 45,
      present: 29,
      absent: 16,
      email: 'john.smith@student.edu',
      phone: '+1 234-567-8901',
      status: 'detention',
      lastSeen: '2 days ago',
      parentContact: '+1 234-567-8900'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      rollNo: 'IT002',
      class: 'IT-A',
      attendance: 68,
      totalClasses: 44,
      present: 30,
      absent: 14,
      email: 'sarah.johnson@student.edu',
      phone: '+1 234-567-8902',
      status: 'warning',
      lastSeen: '1 day ago',
      parentContact: '+1 234-567-8903'
    },
    {
      id: 3,
      name: 'Mike Wilson',
      rollNo: 'ECE003',
      class: 'ECE-A',
      attendance: 62,
      totalClasses: 48,
      present: 30,
      absent: 18,
      email: 'mike.wilson@student.edu',
      phone: '+1 234-567-8904',
      status: 'detention',
      lastSeen: '3 days ago',
      parentContact: '+1 234-567-8905'
    },
    {
      id: 4,
      name: 'Emma Brown',
      rollNo: 'CS004',
      class: 'CS-A',
      attendance: 69,
      totalClasses: 46,
      present: 32,
      absent: 14,
      email: 'emma.brown@student.edu',
      phone: '+1 234-567-8906',
      status: 'warning',
      lastSeen: 'Today',
      parentContact: '+1 234-567-8907'
    },
  ];

  const detentionList = students.filter(s => s.status === 'detention');
  const warningList = students.filter(s => s.status === 'warning');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'detention': return 'destructive';
      case 'warning': return 'secondary';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'detention': return UserX;
      case 'warning': return AlertTriangle;
      default: return UserCheck;
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || student.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Student Management</h2>
          <p className="text-muted-foreground mt-1">Monitor attendance and manage student records</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="transition-smooth">
            <Download className="mr-2 h-4 w-4" />
            Export Reports
          </Button>
          <Button variant="academic" className="transition-bounce">
            <Mail className="mr-2 h-4 w-4" />
            Send Notifications
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="gradient-card shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{students.length}</div>
            <p className="text-xs text-muted-foreground">Active records</p>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-soft border-l-4 border-l-warning">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Warning List</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{warningList.length}</div>
            <p className="text-xs text-warning">70-75% attendance</p>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-soft border-l-4 border-l-destructive">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Detention List</CardTitle>
            <FileX className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{detentionList.length}</div>
            <p className="text-xs text-destructive">Below 70% attendance</p>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Attendance</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">66%</div>
            <p className="text-xs text-destructive">Below target</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="shadow-soft">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by name or roll number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex space-x-2">
              {['all', 'warning', 'detention'].map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFilter(filter)}
                  className="transition-smooth"
                >
                  {filter === 'all' ? 'All Students' : filter.charAt(0).toUpperCase() + filter.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Student List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-primary" />
              Student Records
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredStudents.map((student) => {
                const StatusIcon = getStatusIcon(student.status);
                
                return (
                  <div
                    key={student.id}
                    className="p-4 rounded-lg border border-border hover:shadow-soft transition-smooth bg-card"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <StatusIcon className={`h-6 w-6 ${
                            student.status === 'detention' ? 'text-destructive' : 
                            student.status === 'warning' ? 'text-warning' : 'text-success'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-foreground">{student.name}</h3>
                            <Badge variant={getStatusColor(student.status) as any}>
                              {student.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {student.rollNo} • {student.class}
                          </p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                            <span>Attendance: {student.attendance}%</span>
                            <span>Present: {student.present}/{student.totalClasses}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Last seen: {student.lastSeen}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline" className="p-2">
                            <Mail className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" className="p-2">
                            <Phone className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Detention List Detail */}
        <Card className="shadow-soft border-l-4 border-l-destructive">
          <CardHeader>
            <CardTitle className="flex items-center text-destructive">
              <FileX className="mr-2 h-5 w-5" />
              Detention List
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {detentionList.map((student) => (
                <div
                  key={student.id}
                  className="p-4 rounded-lg bg-destructive/5 border border-destructive/20"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-foreground">{student.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {student.rollNo} • {student.class}
                      </p>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>Classes: {student.present}/{student.totalClasses}</span>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Phone className="h-3 w-3 mr-1" />
                          <span>Parent: {student.parentContact}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="destructive">
                      {student.attendance}%
                    </Badge>
                  </div>
                  <div className="flex space-x-2 mt-3">
                    <Button size="sm" variant="outline" className="text-xs">
                      <Mail className="h-3 w-3 mr-1" />
                      Notify Parent
                    </Button>
                    <Button size="sm" variant="destructive" className="text-xs">
                      <FileX className="h-3 w-3 mr-1" />
                      Issue Warning
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-border">
              <Button variant="destructive" className="w-full transition-bounce">
                <Download className="mr-2 h-4 w-4" />
                Generate Official Detention List
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Center */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border border-border hover:shadow-soft transition-smooth cursor-pointer gradient-card">
              <Mail className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold text-foreground">Send Bulk Notifications</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Email/SMS to students and parents
              </p>
            </div>

            <div className="p-4 rounded-lg border border-border hover:shadow-soft transition-smooth cursor-pointer gradient-card">
              <Download className="h-8 w-8 text-secondary mb-3" />
              <h3 className="font-semibold text-foreground">Generate Reports</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Attendance reports and analytics
              </p>
            </div>

            <div className="p-4 rounded-lg border border-border hover:shadow-soft transition-smooth cursor-pointer gradient-card">
              <FileX className="h-8 w-8 text-warning mb-3" />
              <h3 className="font-semibold text-foreground">Manage Detentions</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Track and update detention status
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentManagement;