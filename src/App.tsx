
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/context/AuthContext";

// Layouts
import { MainLayout } from "@/components/layouts/MainLayout";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";

// Main Pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

// Auth Pages
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";

// Dashboard Pages
import StudentDashboard from "@/pages/dashboard/StudentDashboard";
import FacultyDashboard from "@/pages/dashboard/FacultyDashboard";
import AdminDashboard from "@/pages/dashboard/AdminDashboard";

// Student Pages
import StudentCourses from "@/pages/dashboard/student/Courses";
import StudentAssessments from "@/pages/dashboard/student/Assessments";
import StudentAttendance from "@/pages/dashboard/student/Attendance";
import StudentLeave from "@/pages/dashboard/student/Leave";
import StudentProfile from "@/pages/dashboard/student/Profile";
import LearningMaterials from "@/pages/dashboard/student/LearningMaterials";

// Faculty Pages
import FacultyClasses from "@/pages/dashboard/faculty/Classes";
import FacultyAttendance from "@/pages/dashboard/faculty/Attendance";
import FacultyAssessments from "@/pages/dashboard/faculty/Assessments";
import FacultyProfile from "@/pages/dashboard/faculty/Profile";
import LeaveRequests from "@/pages/dashboard/faculty/LeaveRequests";

// Admin Pages
import AdminStudents from "@/pages/dashboard/admin/Students";
import AdminFacultyManagement from "@/pages/dashboard/admin/Faculty";
import AdminClassesManagement from "@/pages/dashboard/admin/Classes";
import AdminSettings from "@/pages/dashboard/admin/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <AuthProvider>
          <BrowserRouter>
            <Toaster />
            <Sonner />
            <Routes>
              {/* Main Routes */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Route>
              
              {/* Auth Routes */}
              <Route path="/signin" element={<SignIn />} />
              {/* SignUp route is now restricted to admin */}
              <Route path="/signup" element={<SignUp />} />
              
              {/* Student Dashboard Routes */}
              <Route path="/student" element={<DashboardLayout role="student" />}>
                <Route index element={<StudentDashboard />} />
                <Route path="courses" element={<StudentCourses />} />
                <Route path="assessments" element={<StudentAssessments />} />
                <Route path="attendance" element={<StudentAttendance />} />
                <Route path="leave" element={<StudentLeave />} />
                <Route path="profile" element={<StudentProfile />} />
                <Route path="materials" element={<LearningMaterials />} />
              </Route>
              
              {/* Faculty Dashboard Routes */}
              <Route path="/faculty" element={<DashboardLayout role="faculty" />}>
                <Route index element={<FacultyDashboard />} />
                <Route path="classes" element={<FacultyClasses />} />
                <Route path="attendance" element={<FacultyAttendance />} />
                <Route path="assessments" element={<FacultyAssessments />} />
                <Route path="profile" element={<FacultyProfile />} />
                <Route path="leave-requests" element={<LeaveRequests />} />
                {/* New routes for extended functionality */}
                <Route path="roster" element={<></>} /> {/* Will be implemented later */}
                <Route path="classes/manage/:id" element={<></>} /> {/* Will be implemented later */}
              </Route>
              
              {/* Admin Dashboard Routes */}
              <Route path="/admin" element={<DashboardLayout role="admin" />}>
                <Route index element={<AdminDashboard />} />
                <Route path="students" element={<AdminStudents />} />
                <Route path="faculty" element={<AdminFacultyManagement />} />
                <Route path="classes" element={<AdminClassesManagement />} />
                <Route path="settings" element={<AdminSettings />} />
                {/* Admin-only section for signup */}
                <Route path="signup" element={<SignUp />} />
              </Route>
              
              {/* 404 Catch-all Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
