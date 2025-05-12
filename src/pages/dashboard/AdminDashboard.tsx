
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

// Mock data
const userData = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.j@example.edu",
    role: "Student",
    status: "active",
    joinedOn: "2024-11-15",
  },
  {
    id: 2,
    name: "Dr. James Wilson",
    email: "j.wilson@example.edu",
    role: "Faculty",
    status: "active",
    joinedOn: "2024-09-02",
  },
  {
    id: 3,
    name: "Maria Garcia",
    email: "m.garcia@example.edu",
    role: "Student",
    status: "inactive",
    joinedOn: "2025-01-10",
  },
  {
    id: 4,
    name: "Prof. Sarah Lee",
    email: "s.lee@example.edu",
    role: "Faculty",
    status: "active",
    joinedOn: "2024-08-20",
  },
  {
    id: 5,
    name: "Daniel Brown",
    email: "d.brown@example.edu",
    role: "Student",
    status: "active",
    joinedOn: "2025-02-05",
  },
];

const enrollmentData = [
  { month: 'Sep', students: 120 },
  { month: 'Oct', students: 145 },
  { month: 'Nov', students: 160 },
  { month: 'Dec', students: 170 },
  { month: 'Jan', students: 185 },
  { month: 'Feb', students: 200 },
  { month: 'Mar', students: 220 },
  { month: 'Apr', students: 235 },
  { month: 'May', students: 250 },
];

const classAllocationData = [
  {
    id: 1,
    className: "Mathematics 101",
    faculty: "Dr. James Wilson",
    students: 65,
    sections: 2,
  },
  {
    id: 2,
    className: "Physics 201",
    faculty: "Prof. Sarah Lee",
    students: 48,
    sections: 2,
  },
  {
    id: 3,
    className: "Computer Science 110",
    faculty: "Dr. Robert Chen",
    students: 72,
    sections: 3,
  },
  {
    id: 4,
    className: "Literature Studies",
    faculty: "Prof. Emily Adams",
    students: 35,
    sections: 1,
  },
];

export default function AdminDashboard() {
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [exportDataDialogOpen, setExportDataDialogOpen] = useState(false);
  const [selectedUserForView, setSelectedUserForView] = useState<any>(null);
  const [viewUserDialogOpen, setViewUserDialogOpen] = useState(false);
  const { canManageUsers, canViewReports, getAdminStatistics } = useAuth();
  const { toast } = useToast();
  const stats = getAdminStatistics();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleAddUser = () => {
    setAddUserDialogOpen(true);
  };

  const handleExportData = () => {
    setExportDataDialogOpen(true);
  };

  const handleViewUser = (user: any) => {
    setSelectedUserForView(user);
    setViewUserDialogOpen(true);
  };

  const handleCreateUser = () => {
    toast({
      title: "User creation initiated",
      description: "New user account is being processed.",
    });
    setAddUserDialogOpen(false);
  };

  const handleExport = () => {
    toast({
      title: "Data export initiated",
      description: "Your data export will be available shortly.",
    });
    setExportDataDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={handleExportData}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" x2="12" y1="3" y2="15"></line></svg>
            Export Data
          </Button>
          {canManageUsers() && (
            <Button size="sm" onClick={handleAddUser}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" x2="19" y1="8" y2="14"></line><line x1="22" x2="16" y1="11" y2="11"></line></svg>
              Add User
            </Button>
          )}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">+15 from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Faculty</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalFaculty}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeClasses}</div>
            <p className="text-xs text-muted-foreground">Across 10 subjects</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageAttendance}</div>
            <p className="text-xs text-muted-foreground">Institution-wide</p>
          </CardContent>
        </Card>
      </div>

      {/* Enrollment Trend and User Management */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {canViewReports() && (
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>Student Enrollment Trend</CardTitle>
              <CardDescription>Monthly enrollment numbers</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={enrollmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="students"
                    stroke="hsl(var(--primary))"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Users</CardTitle>
              <CardDescription>Latest added users</CardDescription>
            </div>
            <Button variant="ghost" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userData.slice(0, 3).map((user) => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">
                        {user.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`text-xs px-2 py-1 rounded-full ${
                      user.role === "Student"
                        ? "bg-info/10 text-info"
                        : "bg-secondary/10 text-secondary"
                    }`}
                  >
                    {user.role}
                  </div>
                </div>
              ))}
              <Button 
                variant="outline" 
                className="w-full text-sm" 
                size="sm"
                onClick={() => toast({
                  title: "View All Users",
                  description: "Navigating to user management."
                })}
              >
                View All Users
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Management */}
      {canManageUsers() && (
        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage students, faculty, and staff members
              </CardDescription>
            </div>
            <div className="flex gap-2 mt-4 sm:mt-0">
              <Button variant="outline" size="sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
                Filter
              </Button>
              <Button size="sm" onClick={handleAddUser}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" x2="19" y1="8" y2="14"></line><line x1="22" x2="16" y1="11" y2="11"></line></svg>
                Add User
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userData.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {user.name}
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.role === "Student"
                              ? "bg-info/10 text-info"
                              : "bg-secondary/10 text-secondary"
                          }`}
                        >
                          {user.role}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.status === "active"
                              ? "bg-success/10 text-success"
                              : "bg-muted-foreground/10 text-muted-foreground"
                          }`}
                        >
                          {user.status === "active" ? "Active" : "Inactive"}
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(user.joinedOn)}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewUser(user)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Class Allocation */}
      <Card>
        <CardHeader>
          <CardTitle>Class Allocation</CardTitle>
          <CardDescription>Manage faculty assignments to classes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Class Name</TableHead>
                  <TableHead>Assigned Faculty</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Sections</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classAllocationData.map((classItem) => (
                  <TableRow key={classItem.id}>
                    <TableCell className="font-medium">
                      {classItem.className}
                    </TableCell>
                    <TableCell>{classItem.faculty}</TableCell>
                    <TableCell>{classItem.students}</TableCell>
                    <TableCell>{classItem.sections}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "Reassign faculty",
                            description: `Reassigning faculty for ${classItem.className}`
                          });
                        }}
                      >
                        Reassign
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Add User Dialog */}
      <Dialog open={addUserDialogOpen} onOpenChange={setAddUserDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account for your institution.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                <Input id="firstName" placeholder="John" />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                <Input id="lastName" placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input id="email" type="email" placeholder="john.doe@example.edu" />
            </div>
            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-medium">Role</label>
              <select id="role" className="w-full rounded-md border border-input p-2">
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddUserDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateUser}>Create User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Export Data Dialog */}
      <Dialog open={exportDataDialogOpen} onOpenChange={setExportDataDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Export Data</DialogTitle>
            <DialogDescription>
              Select the data you want to export.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="students" defaultChecked />
              <label htmlFor="students">Student Data</label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="faculty" defaultChecked />
              <label htmlFor="faculty">Faculty Data</label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="classes" defaultChecked />
              <label htmlFor="classes">Class Data</label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="attendance" />
              <label htmlFor="attendance">Attendance Records</label>
            </div>
            <div className="space-y-2">
              <label htmlFor="format" className="text-sm font-medium">Export Format</label>
              <select id="format" className="w-full rounded-md border border-input p-2">
                <option value="csv">CSV</option>
                <option value="excel">Excel</option>
                <option value="json">JSON</option>
                <option value="pdf">PDF</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setExportDataDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleExport}>Export</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* View User Dialog */}
      <Dialog open={viewUserDialogOpen} onOpenChange={setViewUserDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              {selectedUserForView && `Viewing profile for ${selectedUserForView.name}`}
            </DialogDescription>
          </DialogHeader>
          {selectedUserForView && (
            <div className="py-4 space-y-4">
              <div className="flex flex-col items-center space-y-2">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="text-lg">
                    {selectedUserForView.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{selectedUserForView.name}</h2>
                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  selectedUserForView.role === "Student"
                    ? "bg-info/10 text-info"
                    : "bg-secondary/10 text-secondary"
                }`}>
                  {selectedUserForView.role}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Email:</span>
                  <span>{selectedUserForView.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <span className={selectedUserForView.status === "active" ? "text-success" : "text-muted-foreground"}>
                    {selectedUserForView.status === "active" ? "Active" : "Inactive"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Joined on:</span>
                  <span>{formatDate(selectedUserForView.joinedOn)}</span>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end space-x-2">
                <Button variant="outline" size="sm">Edit User</Button>
                <Button 
                  variant={selectedUserForView.status === "active" ? "destructive" : "default"} 
                  size="sm"
                >
                  {selectedUserForView.status === "active" ? "Deactivate" : "Activate"}
                </Button>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setViewUserDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
