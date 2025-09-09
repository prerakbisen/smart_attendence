import { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Camera,
  Video,
  VideoOff,
  Users,
  CheckCircle,
  AlertCircle,
  Scan,
  Download,
  Settings,
  RefreshCw
} from 'lucide-react';

const FaceRecognition = () => {
  const [isActive, setIsActive] = useState(false);
  const [recognizedStudents, setRecognizedStudents] = useState<any[]>([]);
  const [currentRecognition, setCurrentRecognition] = useState<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Sample recognition data
  const recentRecognitions = [
    { 
      id: 1, 
      name: 'John Smith', 
      rollNo: 'CS001', 
      time: '09:15 AM', 
      confidence: 98.5, 
      status: 'present',
      class: 'CS-A'
    },
    { 
      id: 2, 
      name: 'Sarah Johnson', 
      rollNo: 'IT002', 
      time: '09:16 AM', 
      confidence: 96.2, 
      status: 'present',
      class: 'IT-A'
    },
    { 
      id: 3, 
      name: 'Mike Wilson', 
      rollNo: 'ECE003', 
      time: '09:17 AM', 
      confidence: 94.8, 
      status: 'present',
      class: 'ECE-A'
    },
    { 
      id: 4, 
      name: 'Emma Brown', 
      rollNo: 'CS004', 
      time: '09:18 AM', 
      confidence: 97.3, 
      status: 'present',
      class: 'CS-A'
    },
  ];

  const stats = {
    totalScanned: 152,
    successRate: 97.8,
    avgTime: 1.2,
    confidence: 96.4
  };

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 640, 
          height: 480,
          facingMode: 'user'
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsActive(true);
        
        // Simulate face recognition
        simulateRecognition();
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please ensure camera permissions are granted.');
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setIsActive(false);
    setCurrentRecognition(null);
  }, []);

  const simulateRecognition = () => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance of recognition
        const randomStudent = recentRecognitions[Math.floor(Math.random() * recentRecognitions.length)];
        setCurrentRecognition({
          ...randomStudent,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        
        // Add to recognized students list
        setRecognizedStudents(prev => {
          const exists = prev.find(s => s.rollNo === randomStudent.rollNo);
          if (!exists) {
            return [randomStudent, ...prev.slice(0, 9)]; // Keep last 10
          }
          return prev;
        });
        
        // Clear current recognition after 3 seconds
        setTimeout(() => setCurrentRecognition(null), 3000);
      }
    }, 2000);

    return () => clearInterval(interval);
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Face Recognition Attendance</h2>
          <p className="text-muted-foreground mt-1">AI-powered automatic attendance marking</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="transition-smooth">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button variant="outline" className="transition-smooth">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="gradient-card shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students Scanned</CardTitle>
            <Scan className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.totalScanned}</div>
            <p className="text-xs text-success">+12 this session</p>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.successRate}%</div>
            <p className="text-xs text-success">High accuracy</p>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Recognition Time</CardTitle>
            <RefreshCw className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.avgTime}s</div>
            <p className="text-xs text-success">Ultra fast</p>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Confidence</CardTitle>
            <AlertCircle className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.confidence}%</div>
            <p className="text-xs text-success">Very reliable</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Camera Feed */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Camera className="mr-2 h-5 w-5 text-primary" />
                Live Camera Feed
              </div>
              <div className="flex items-center space-x-2">
                {isActive && (
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-success animate-pulse"></div>
                    <span className="text-sm text-success">Live</span>
                  </div>
                )}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-80 bg-black rounded-lg object-cover"
              />
              
              {/* Overlay for current recognition */}
              {currentRecognition && (
                <div className="absolute top-4 left-4 right-4">
                  <div className="gradient-primary rounded-lg p-4 text-white shadow-glow animate-fade-in-up">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{currentRecognition.name}</h3>
                        <p className="text-sm opacity-90">Roll: {currentRecognition.rollNo}</p>
                        <p className="text-sm opacity-90">Class: {currentRecognition.class}</p>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-white/20 text-white">
                          {currentRecognition.confidence}% match
                        </Badge>
                        <p className="text-sm opacity-90 mt-1">{currentRecognition.time}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Camera controls overlay */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                {!isActive ? (
                  <Button 
                    onClick={startCamera}
                    variant="hero"
                    size="lg"
                    className="shadow-glow animate-pulse-glow"
                  >
                    <Video className="mr-2 h-5 w-5" />
                    Start Camera
                  </Button>
                ) : (
                  <Button 
                    onClick={stopCamera}
                    variant="destructive"
                    size="lg"
                  >
                    <VideoOff className="mr-2 h-5 w-5" />
                    Stop Camera
                  </Button>
                )}
              </div>
            </div>

            {/* Camera Instructions */}
            <div className="text-center text-muted-foreground">
              <p className="text-sm">
                {!isActive 
                  ? "Click 'Start Camera' to begin face recognition attendance"
                  : "Position faces within the camera frame for automatic recognition"
                }
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Recognitions */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-secondary" />
              Recent Recognitions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {recentRecognitions.map((student, index) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-card border border-border hover:shadow-soft transition-smooth"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{student.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {student.rollNo} • {student.class}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={student.confidence > 95 ? "default" : "secondary"}
                      className="mb-1"
                    >
                      {student.confidence}%
                    </Badge>
                    <p className="text-xs text-muted-foreground">{student.time}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {recentRecognitions.length === 0 && (
              <div className="text-center py-8">
                <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No recognitions yet</p>
                <p className="text-sm text-muted-foreground">Start the camera to begin</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Additional Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-soft">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Scan className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">AI-Powered Recognition</h3>
            <p className="text-sm text-muted-foreground">
              Advanced machine learning algorithms for accurate face detection
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="h-6 w-6 text-success" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Real-time Tracking</h3>
            <p className="text-sm text-muted-foreground">
              Instant attendance marking with live verification
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
              <RefreshCw className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Fast Processing</h3>
            <p className="text-sm text-muted-foreground">
              Ultra-fast recognition with sub-second response times
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FaceRecognition;