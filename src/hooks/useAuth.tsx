import { useContext } from "react";
import { AuthContext, User } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

// Define types for admin features
export type AdminFeature = 'students' | 'faculty' | 'classes' | 'settings' | 'reports' | 
                          'notifications' | 'system' | 'analytics' | 'attendance' | 'curriculum' | 
                          'finances' | 'events' | 'resources';

export type FacultyFeature = 'classes' | 'attendance' | 'assessments' | 'leave-requests' | 
                            'reports' | 'students' | 'schedule' | 'resources' | 'grades';

export type StudentFeature = 'courses' | 'attendance' | 'assessments' | 'leave' | 
                            'results' | 'schedule' | 'payments' | 'resources' | 'grades';

export type ActionType = 'view' | 'create' | 'update' | 'delete' | 'approve' | 'reject' | 
                        'download' | 'upload' | 'assign' | 'export';

export type EntityType = 'students' | 'faculty' | 'classes' | 'attendance' | 'assessments' | 
                        'reports' | 'courses' | 'leave' | 'schedule' | 'resources' | 'profiles' | 
                        'settings' | 'notifications' | 'events' | 'grades' | 'results';

export function useAuth() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  // Enhanced logout to redirect to signin page
  const enhancedLogout = () => {
    context.logout();
    navigate("/signin");
  };

  // Get appropriate dashboard based on user role
  const getDashboardPath = (role: string) => {
    switch (role) {
      case "admin":
        return "/admin/settings"; // Changed to settings as the default admin landing
      case "faculty":
        return "/faculty";
      case "student":
        return "/student";
      default:
        return "/signin";
    }
  };

  // Navigate to appropriate dashboard based on user role
  const navigateToDashboard = (role: string) => {
    const path = getDashboardPath(role);
    navigate(path);
  };

  // Enhanced update profile to include social links and profile picture
  const updateProfile = (profileData: {
    firstName?: string;
    lastName?: string;
    email?: string;
    profilePicture?: string;
    githubUrl?: string;
    linkedinUrl?: string;
    phoneNumber?: string;
    address?: string;
    bio?: string;
    department?: string;
    position?: string;
    website?: string;
    role?: string;
  }) => {
    // Clean up profilePicture if it's a File object
    const cleanedData = { ...profileData };
    
    // In a real app, you would upload the file to a storage service
    // and then update the user profile with the URL
    
    return context.updateProfile(cleanedData as Partial<User>);
  };

  // Enhanced admin access control with feature-specific permissions
  const hasAdminAccess = (feature: AdminFeature) => {
    if (context.user?.role !== 'admin') return false;
    
    // In a real app, you would check against user permissions stored in the database
    // For now, we'll implement a comprehensive permission system based on role
    const adminPermissions: Record<AdminFeature, boolean> = {
      students: true,
      faculty: true,
      classes: true,
      settings: true,
      reports: true,
      notifications: true,
      system: true,
      analytics: true,
      attendance: true,
      curriculum: true,
      finances: true,
      events: true,
      resources: true
    };
    
    return adminPermissions[feature] || false;
  };

  // Enhanced faculty access with feature-specific permissions
  const hasFacultyAccess = (feature: FacultyFeature) => {
    if (context.user?.role !== 'faculty') return false;
    
    // In a real app, you would check against user permissions
    const facultyPermissions: Record<FacultyFeature, boolean> = {
      classes: true,
      attendance: true,
      assessments: true,
      'leave-requests': true,
      reports: true,
      students: true,
      schedule: true,
      resources: true,
      grades: true
    };
    
    return facultyPermissions[feature] || false;
  };

  // Enhanced student access with feature-specific permissions
  const hasStudentAccess = (feature: StudentFeature) => {
    if (context.user?.role !== 'student') return false;
    
    // In a real app, you would check against user permissions
    const studentPermissions: Record<StudentFeature, boolean> = {
      courses: true,
      attendance: true,
      assessments: true,
      leave: true,
      results: true,
      schedule: true,
      payments: true,
      resources: true,
      grades: true
    };
    
    return studentPermissions[feature] || false;
  };
  
  // Enhanced action control for all user types
  const canPerformAction = (action: ActionType, entityType: EntityType) => {
    if (!context.user) return false;
    
    // Admin can do everything
    if (context.user.role === 'admin') return true;
    
    // Faculty can manage their own classes, attendance, and assessments
    if (context.user.role === 'faculty') {
      const facultyActions: Record<ActionType, EntityType[]> = {
        view: ['classes', 'students', 'attendance', 'assessments', 'reports', 'schedule', 'resources', 'grades'],
        create: ['attendance', 'assessments', 'reports', 'grades', 'resources'],
        update: ['attendance', 'assessments', 'grades', 'profiles'],
        delete: ['resources'],
        approve: ['leave'],
        reject: ['leave'],
        download: ['reports', 'resources', 'grades'],
        upload: ['resources', 'assessments'],
        assign: ['grades'],
        export: ['reports', 'grades', 'attendance']
      };
      
      return facultyActions[action]?.includes(entityType) || false;
    }
    
    // Students have limited permissions
    if (context.user.role === 'student') {
      const studentActions: Record<ActionType, EntityType[]> = {
        view: ['courses', 'attendance', 'assessments', 'results', 'schedule', 'resources', 'grades'],
        create: ['leave'],
        update: ['profiles'],
        delete: [],
        approve: [],
        reject: [],
        download: ['resources'],
        upload: ['assessments'],
        assign: [],
        export: []
      };
      
      return studentActions[action]?.includes(entityType) || false;
    }
    
    return false;
  };
  
  // Additional admin-specific functions
  const getAdminStatistics = () => {
    // In a real app, this would fetch statistics from an API
    return {
      totalStudents: 250,
      totalFaculty: 18,
      activeClasses: 24,
      averageAttendance: '89%'
    };
  };
  
  const canManageUsers = () => {
    return context.user?.role === 'admin';
  };
  
  const canConfigureSystem = () => {
    return context.user?.role === 'admin';
  };
  
  const canViewReports = () => {
    return context.user?.role === 'admin' || context.user?.role === 'faculty';
  };

  return {
    ...context,
    logout: enhancedLogout,
    updateProfile,
    getDashboardPath,
    navigateToDashboard,
    hasAdminAccess,
    hasFacultyAccess,
    hasStudentAccess,
    canPerformAction,
    getAdminStatistics,
    canManageUsers,
    canConfigureSystem,
    canViewReports
  };
}
