
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, UserPlus, FileEdit, Trash2, Eye, Check, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data
const studentsData = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.j@example.edu",
    course: "Computer Science",
    semester: 3,
    status: "active",
    joinedOn: "2024-08-15",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: 2,
    name: "Maria Garcia",
    email: "m.garcia@example.edu",
    course: "Mathematics",
    semester: 2,
    status: "active",
    joinedOn: "2024-09-05",
    image: null
  },
  {
    id: 3,
    name: "Daniel Brown",
    email: "d.brown@example.edu",
    course: "Physics",
    semester: 4,
    status: "inactive",
    joinedOn: "2023-11-10",
    image: null
  },
  {
    id: 4,
    name: "Sophia Lee",
    email: "s.lee@example.edu",
    course: "Computer Science",
    semester: 1,
    status: "active",
    joinedOn: "2025-01-20",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: 5,
    name: "James Wilson",
    email: "j.wilson@example.edu",
    course: "Engineering",
    semester: 5,
    status: "active",
    joinedOn: "2023-08-01",
    image: null
  },
];

export default function AdminStudents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [viewUserOpen, setViewUserOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [deleteUserOpen, setDeleteUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();

  const filteredStudents = studentsData.filter(student => 
    (student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.course.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (activeTab === "all" || 
     (activeTab === "active" && student.status === "active") ||
     (activeTab === "inactive" && student.status === "inactive"))
  );

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleAddUser = () => {
    toast({
      title: "User creation initiated",
      description: "Please fill out the form to add a new student.",
    });
    setAddUserOpen(true);
  };

  const handleViewUser = (student: any) => {
    setSelectedUser(student);
    setViewUserOpen(true);
  };

  const handleEditUser = (student: any) => {
    setSelectedUser(student);
    setEditUserOpen(true);
  };

  const handleDeleteUser = (student: any) => {
    setSelectedUser(student);
    setDeleteUserOpen(true);
  };

  const handleSaveUser = () => {
    toast({
      title: "Student added successfully",
      description: "The new student has been added to the system.",
    });
    setAddUserOpen(false);
  };

  const handleUpdateUser = () => {
    toast({
      title: "Student updated successfully",
      description: "The student information has been updated.",
    });
    setEditUserOpen(false);
  };

  const handleConfirmDelete = () => {
    toast({
      title: "Student deleted",
      description: "The student has been removed from the system.",
    });
    setDeleteUserOpen(false);
  };

  const handleToggleStatus = (student: any) => {
    const newStatus = student.status === "active" ? "inactive" : "active";
    toast({
      title: `Student ${newStatus === "active" ? "activated" : "deactivated"}`,
      description: `${student.name} is now ${newStatus}.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <h1 className="text-3xl font-bold">Student Management</h1>
        <Button onClick={handleAddUser}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select defaultValue="all" onValueChange={setActiveTab}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Students</SelectItem>
            <SelectItem value="active">Active Only</SelectItem>
            <SelectItem value="inactive">Inactive Only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentsData.length}</div>
            <p className="text-xs text-muted-foreground">All registered students</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {studentsData.filter(s => s.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">Currently enrolled</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">New Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Added this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Different programs</p>
          </CardContent>
        </Card>
      </div>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>Students</CardTitle>
          <CardDescription>Manage student accounts and information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Semester</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          {student.image && <AvatarImage src={student.image} />}
                          <AvatarFallback>
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {student.name}
                      </div>
                    </TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.course}</TableCell>
                    <TableCell>{student.semester}</TableCell>
                    <TableCell>
                      <Badge variant={student.status === "active" ? "default" : "secondary"}>
                        {student.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(student.joinedOn)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleViewUser(student)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleEditUser(student)}>
                          <FileEdit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleToggleStatus(student)}>
                          {student.status === "active" ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                        </Button>
                        <Button variant="outline" size="sm" className="text-destructive" onClick={() => handleDeleteUser(student)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add User Dialog */}
      <Dialog open={addUserOpen} onOpenChange={setAddUserOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>
              Enter the details to create a new student account.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                <Input id="firstName" placeholder="First name" />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                <Input id="lastName" placeholder="Last name" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input id="email" type="email" placeholder="student@example.edu" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="course" className="text-sm font-medium">Course</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cs">Computer Science</SelectItem>
                    <SelectItem value="math">Mathematics</SelectItem>
                    <SelectItem value="phys">Physics</SelectItem>
                    <SelectItem value="eng">Engineering</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="semester" className="text-sm font-medium">Semester</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1st Semester</SelectItem>
                    <SelectItem value="2">2nd Semester</SelectItem>
                    <SelectItem value="3">3rd Semester</SelectItem>
                    <SelectItem value="4">4th Semester</SelectItem>
                    <SelectItem value="5">5th Semester</SelectItem>
                    <SelectItem value="6">6th Semester</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium">Status</label>
              <Select defaultValue="active">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddUserOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveUser}>Save Student</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View User Dialog */}
      <Dialog open={viewUserOpen} onOpenChange={setViewUserOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Student Information</DialogTitle>
            <DialogDescription>
              {selectedUser && `Details for ${selectedUser.name}`}
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="py-4 space-y-4">
              <div className="flex justify-center">
                <Avatar className="h-20 w-20">
                  {selectedUser.image && <AvatarImage src={selectedUser.image} />}
                  <AvatarFallback className="text-lg">
                    {selectedUser.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium">Name</h3>
                  <p>{selectedUser.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Email</h3>
                  <p>{selectedUser.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium">Course</h3>
                  <p>{selectedUser.course}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Semester</h3>
                  <p>{selectedUser.semester}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium">Status</h3>
                  <Badge variant={selectedUser.status === "active" ? "default" : "secondary"}>
                    {selectedUser.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Joined On</h3>
                  <p>{formatDate(selectedUser.joinedOn)}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-sm font-medium mb-2">Enrolled Classes</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>Mathematics 101</span>
                    <Badge variant="outline">Spring 2025</Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Computer Science 110</span>
                    <Badge variant="outline">Spring 2025</Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Physics 201</span>
                    <Badge variant="outline">Spring 2025</Badge>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewUserOpen(false)}>Close</Button>
            <Button onClick={() => {
              setViewUserOpen(false);
              handleEditUser(selectedUser);
            }}>Edit Student</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={editUserOpen} onOpenChange={setEditUserOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Student</DialogTitle>
            <DialogDescription>
              {selectedUser && `Update information for ${selectedUser.name}`}
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="py-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <Input defaultValue={selectedUser.name.split(' ')[0]} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <Input defaultValue={selectedUser.name.split(' ')[1]} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input defaultValue={selectedUser.email} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Course</label>
                  <Select defaultValue={selectedUser.course}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Physics">Physics</SelectItem>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Semester</label>
                  <Select defaultValue={selectedUser.semester.toString()}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1st Semester</SelectItem>
                      <SelectItem value="2">2nd Semester</SelectItem>
                      <SelectItem value="3">3rd Semester</SelectItem>
                      <SelectItem value="4">4th Semester</SelectItem>
                      <SelectItem value="5">5th Semester</SelectItem>
                      <SelectItem value="6">6th Semester</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select defaultValue={selectedUser.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditUserOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateUser}>Update Student</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={deleteUserOpen} onOpenChange={setDeleteUserOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Delete Student</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this student? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="py-4">
              <p className="text-center">You are about to delete <strong>{selectedUser.name}</strong>.</p>
              <p className="text-center text-muted-foreground">This will remove all their data from the system.</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteUserOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>Delete Student</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
