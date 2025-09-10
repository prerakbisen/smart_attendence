import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LaptopMinimalCheck,
  Users,
  Calendar,
  Camera,
  BarChart3,
  Home,
  Bell,
  Settings
} from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Attendance Monitor', href: '/attendance', icon: BarChart3 },
    { name: 'Daily Routine', href: '/routine', icon: Calendar },
    { name: 'Face Recognition', href: '/camera', icon: Camera },
    { name: 'Student Management', href: '/students', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-card shadow-medium">
        {/* Logo Header */}
        <div className="flex h-16 items-center justify-center border-b border-border gradient-hero">
          <div className="flex items-center space-x-3">
            <LaptopMinimalCheck className="h-8 w-8 text-white" />
            <span className="text-xl font-bold text-white">Edu+</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-6 px-4">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={cn(
                      'flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium transition-smooth',
                      isActive
                        ? 'gradient-primary text-white shadow-soft'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    <item.icon className={cn(
                      'h-5 w-5',
                      isActive ? 'text-white' : 'text-muted-foreground'
                    )} />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Actions */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="rounded-lg gradient-card p-4 text-center">
            <Bell className="mx-auto h-6 w-6 text-primary mb-2" />
            <p className="text-sm font-medium text-foreground">
              Smart Notifications
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Stay updated with attendance alerts
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-64">
        {/* Header */}
        <header className="h-16 bg-card shadow-soft flex items-center justify-between px-6 border-b border-border">
          <div>
            <h1 className="text-2xl font-extrabold text-primary flex items-center gap-2 tracking-tight">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-md">
              Edu+
              </span>
                <span className="text-lg text-success animate-bounce">✔️</span>
            </h1>
            <p className="text-sm text-muted-foreground">
              A smart solution that automates attendance and turns free periods into personalized growth opportunities
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <div className="h-2 w-2 rounded-full bg-success"></div>
              <span>System Online</span>
            </div>
            <button className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-smooth">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;