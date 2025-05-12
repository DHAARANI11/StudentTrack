
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { 
  Book, 
  Calendar, 
  File, 
  Home, 
  LogOut, 
  Menu, 
  MessageSquare, 
  Settings, 
  User, 
  Users 
} from "lucide-react";

type SidebarNavProps = {
  role: 'student' | 'faculty' | 'admin';
  isCollapsed: boolean;
};

const SidebarNav = ({ role, isCollapsed }: SidebarNavProps) => {
  const { pathname } = useLocation();

  const studentLinks = [
    { href: "/student", label: "Dashboard", icon: Home },
    { href: "/student/courses", label: "Courses", icon: Book },
    { href: "/student/assessments", label: "Assessments", icon: File },
    { href: "/student/attendance", label: "Attendance", icon: Calendar },
    { href: "/student/leave", label: "Leave Requests", icon: MessageSquare },
    { href: "/student/profile", label: "Profile", icon: User },
  ];

  const facultyLinks = [
    { href: "/faculty", label: "Dashboard", icon: Home },
    { href: "/faculty/classes", label: "Classes", icon: Users },
    { href: "/faculty/attendance", label: "Attendance", icon: Calendar },
    { href: "/faculty/assessments", label: "Assessments", icon: File },
    { href: "/faculty/profile", label: "Profile", icon: User },
  ];

  const adminLinks = [
    { href: "/admin", label: "Dashboard", icon: Home },
    { href: "/admin/students", label: "Students", icon: Users },
    { href: "/admin/faculty", label: "Faculty", icon: Users },
    { href: "/admin/classes", label: "Classes", icon: Book },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  const links = role === 'student' 
    ? studentLinks 
    : role === 'faculty' 
      ? facultyLinks 
      : adminLinks;

  return (
    <nav className="space-y-1">
      {links.map((link) => {
        const isActive = pathname === link.href;
        const LinkIcon = link.icon;

        return (
          <Link
            key={link.href}
            to={link.href}
            className={cn(
              "flex items-center py-2 px-3 text-sm font-medium rounded-md transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-foreground/60 hover:text-foreground hover:bg-muted",
              isCollapsed ? "justify-center" : ""
            )}
          >
            <LinkIcon className={cn("h-5 w-5", isCollapsed ? "" : "mr-2")} />
            {!isCollapsed && <span>{link.label}</span>}
          </Link>
        );
      })}
    </nav>
  );
};

export function DashboardLayout({ role = 'student' }: { role?: 'student' | 'faculty' | 'admin' }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const displayName = role === 'student' ? 'John Doe' : role === 'faculty' ? 'Dr. Smith' : 'Admin User';
  const roleName = role.charAt(0).toUpperCase() + role.slice(1);
  
  // Full sidebar for desktop
  const Sidebar = () => (
    <div 
      className={cn(
        "h-screen border-r flex flex-col bg-card",
        isCollapsed ? "w-16" : "w-64",
        "transition-all duration-200 ease-in-out",
        isMobile ? "fixed z-40 shadow-xl" : "sticky top-0"
      )}
    >
      <div className={cn("flex h-16 items-center border-b", isCollapsed ? "justify-center" : "px-4")}>
        {!isCollapsed && (
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground rounded-md p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
              </svg>
            </div>
            <span className="font-bold">StudentTrack</span>
          </Link>
        )}
        {isCollapsed && (
          <div className="bg-primary text-primary-foreground rounded-md p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
            </svg>
          </div>
        )}
      </div>
      
      <div className="flex flex-col justify-between flex-1 py-4 overflow-auto">
        <div className={cn("px-3", isCollapsed ? "items-center" : "")}>
          <SidebarNav role={role} isCollapsed={isCollapsed} />
        </div>
        
        <div className={cn("mt-auto border-t pt-4", isCollapsed ? "px-2" : "px-3")}>
          <Button 
            variant="outline" 
            size="sm" 
            className={cn("w-full justify-center", isCollapsed ? "" : "justify-start")}
            onClick={() => window.location.href = "/signin"}
          >
            <LogOut className={cn("h-4 w-4", isCollapsed ? "" : "mr-2")} />
            {!isCollapsed && "Sign out"}
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar for desktop or when open on mobile */}
      {(!isMobile || isSidebarOpen) && <Sidebar />}
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-auto">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
          {/* Toggle button */}
          {!isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          )}
          
          {/* Mobile menu button */}
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          )}
          
          <h1 className="text-lg font-semibold">{roleName} Dashboard</h1>
          
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{displayName}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to={`/${role}/profile`}>My Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/signin">Sign out</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
