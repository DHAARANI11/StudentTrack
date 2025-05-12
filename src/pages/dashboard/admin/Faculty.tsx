
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data
const facultyData = [
  {
    id: 1,
    name: "Dr. James Wilson",
    email: "j.wilson@example.edu",
    department: "Mathematics",
    position: "Professor",
    classes: 3,
    status: "active",
    joinedOn: "2022-08-15",
    image: null
  },
  {
    id: 2,
    name: "Prof. Sarah Lee",
    email: "s.lee@example.edu",
    department: "Computer Science",
    position: "Associate Professor",
    classes: 2,
    status: "active",
    joinedOn: "2021-06-20",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: 3,
    name: "Dr. Robert Chen",
    email: "r.chen@example.edu",
    department: "Engineering",
    position: "Assistant Professor",
    classes: 3,
    status: "active",
    joinedOn: "2023-01-05",
    image: null
  },
  {
    id: 4,
    name: "Prof. Emily Adams",
    email: "e.adams@example.edu",
    department: "Literature",
    position: "Professor",
    classes: 1,
    status: "on leave",
    joinedOn: "2020-09-10",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: 5,
    name: "Dr. Michael Johnson",
    email: "m.johnson@example.edu",
    department: "Physics",
    position: "Associate Professor",
    classes: 2,
    status: "active",
    joinedOn: "2022-03-15",
    image: null
  },
];

export default function AdminFaculty() {
  const [searchTerm, setSearchTerm] = useState("");
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [viewUserOpen, setViewUserOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [deleteUserOpen, setDeleteUserOpen] = useState(false);
  const [assignClassOpen, setAssignClassOpen] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();

  const filteredFaculty = facultyData.filter(faculty => 
    (faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    faculty.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faculty.department.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (activeTab === "all" || 
     (activeTab === "active" && faculty.status === "active") ||
     (activeTab === "on leave" && faculty.status === "on leave"))
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
      title: "Faculty addition initiated",
      description: "Please fill out the form to add a new faculty member.",
    });
    setAddUserOpen(true);
  };

  const handleViewUser = (faculty: any) => {
    setSelectedFaculty(faculty);
    setViewUserOpen(true);
  };

  const handleEditUser = (faculty: any) => {
    setSelectedFaculty(faculty);
    setEditUserOpen(true);
  };

  const handleDeleteUser = (faculty: any) => {
    setSelectedFaculty(faculty);
    setDeleteUserOpen(true);
  };

  const handleAssignClass = (faculty: any) => {
    setSelectedFaculty(faculty);
    setAssignClassOpen(true);
  };

  const handleSaveUser = () => {
    toast({
      title: "Faculty member added successfully",
      description: "The new faculty member has been added to the system.",
    });
    setAddUserOpen(false);
  };

  const handleUpdateUser = () => {
    toast({
      title: "Faculty member updated successfully",
      description: "The faculty information has been updated.",
    });
    setEditUserOpen(false);
  };

  const handleConfirmDelete = () => {
    toast({
      title: "Faculty member deleted",
      description: "The faculty member has been removed from the system.",
    });
    setDeleteUserOpen(false);
  };

  const handleToggleStatus = (faculty: any) => {
    const newStatus = faculty.status === "active" ? "on leave" : "active";
    toast({
      title: `Faculty status updated`,
      description: `${faculty.name} is now ${newStatus}.`,
    });
  };

  const handleSaveClassAssignment = () => {
    toast({
      title: "Classes assigned successfully",
      description: `Classes have been assigned to ${selectedFaculty?.name}.`,
    });
    setAssignClassOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <h1 className="text-3xl font-bold">Faculty Management</h1>
        <Button onClick={handleAddUser}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Faculty
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search faculty..."
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
            <SelectItem value="all">All Faculty</SelectItem>
            <SelectItem value="active">Active Only</SelectItem>
            <SelectItem value="on leave">On Leave Only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Faculty</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{facultyData.length}</div>
            <p className="text-xs text-muted-foreground">All faculty members</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Faculty</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {facultyData.filter(f => f.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">Currently teaching</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Active departments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Classes Taught</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {facultyData.reduce((sum, f) => sum + f.classes, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Total classes</p>
          </CardContent>
        </Card>
      </div>

      {/* Faculty Table */}
      <Card>
        <CardHeader>
          <CardTitle>Faculty Members</CardTitle>
          <CardDescription>Manage faculty accounts and course assignments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Classes</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFaculty.map((faculty) => (
                  <TableRow key={faculty.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          {faculty.image && <AvatarImage src={faculty.image} />}
                          <AvatarFallback>
                            {faculty.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {faculty.name}
                      </div>
                    </TableCell>
                    <TableCell>{faculty.email}</TableCell>
                    <TableCell>{faculty.department}</TableCell>
                    <TableCell>{faculty.position}</TableCell>
                    <TableCell>{faculty.classes}</TableCell>
                    <TableCell>
                      <Badge variant={faculty.status === "active" ? "default" : "secondary"}>
                        {faculty.status === "active" ? "Active" : "On Leave"}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(faculty.joinedOn)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleViewUser(faculty)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleEditUser(faculty)}>
                          <FileEdit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleToggleStatus(faculty)}>
                          {faculty.status === "active" ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                        </Button>
                        <Button variant="outline" size="sm" className="text-destructive" onClick={() => handleDeleteUser(faculty)}>
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
            <DialogTitle>Add New Faculty Member</DialogTitle>
            <DialogDescription>
              Enter the details to create a new faculty account.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">Title</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select title" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dr">Dr.</SelectItem>
                    <SelectItem value="prof">Prof.</SelectItem>
                    <SelectItem value="mr">Mr.</SelectItem>
                    <SelectItem value="mrs">Mrs.</SelectItem>
                    <SelectItem value="ms">Ms.</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="position" className="text-sm font-medium">Position</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professor">Professor</SelectItem>
                    <SelectItem value="associate">Associate Professor</SelectItem>
                    <SelectItem value="assistant">Assistant Professor</SelectItem>
                    <SelectItem value="adjunct">Adjunct Professor</SelectItem>
                    <SelectItem value="lecturer">Lecturer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
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
              <Input id="email" type="email" placeholder="faculty@example.edu" />
            </div>
            <div className="space-y-2">
              <label htmlFor="department" className="text-sm font-medium">Department</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="math">Mathematics</SelectItem>
                  <SelectItem value="cs">Computer Science</SelectItem>
                  <SelectItem value="eng">Engineering</SelectItem>
                  <SelectItem value="phys">Physics</SelectItem>
                  <SelectItem value="lit">Literature</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="specialization" className="text-sm font-medium">Specialization</label>
              <Input id="specialization" placeholder="Area of specialization" />
            </div>
            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium">Status</label>
              <Select defaultValue="active">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="on leave">On Leave</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddUserOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveUser}>Save Faculty</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View User Dialog */}
      <Dialog open={viewUserOpen} onOpenChange={setViewUserOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Faculty Information</DialogTitle>
            <DialogDescription>
              {selectedFaculty && `Details for ${selectedFaculty.name}`}
            </DialogDescription>
          </DialogHeader>
          {selectedFaculty && (
            <div className="py-4 space-y-4">
              <div className="flex justify-center">
                <Avatar className="h-20 w-20">
                  {selectedFaculty.image && <AvatarImage src={selectedFaculty.image} />}
                  <AvatarFallback className="text-lg">
                    {selectedFaculty.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium">Name</h3>
                  <p>{selectedFaculty.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Email</h3>
                  <p>{selectedFaculty.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium">Department</h3>
                  <p>{selectedFaculty.department}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Position</h3>
                  <p>{selectedFaculty.position}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium">Status</h3>
                  <Badge variant={selectedFaculty.status === "active" ? "default" : "secondary"}>
                    {selectedFaculty.status === "active" ? "Active" : "On Leave"}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Joined On</h3>
                  <p>{formatDate(selectedFaculty.joinedOn)}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-sm font-medium mb-2">Assigned Classes</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>Mathematics 101</span>
                    <Badge variant="outline">2 Sections</Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Mathematics 202</span>
                    <Badge variant="outline">1 Section</Badge>
                  </div>
                </div>
                <div className="flex justify-end mt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setViewUserOpen(false);
                      handleAssignClass(selectedFaculty);
                    }}
                  >
                    Manage Classes
                  </Button>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewUserOpen(false)}>Close</Button>
            <Button onClick={() => {
              setViewUserOpen(false);
              handleEditUser(selectedFaculty);
            }}>Edit Faculty</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={editUserOpen} onOpenChange={setEditUserOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Faculty Member</DialogTitle>
            <DialogDescription>
              {selectedFaculty && `Update information for ${selectedFaculty.name}`}
            </DialogDescription>
          </DialogHeader>
          {selectedFaculty && (
            <div className="py-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <Select defaultValue="dr">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dr">Dr.</SelectItem>
                      <SelectItem value="prof">Prof.</SelectItem>
                      <SelectItem value="mr">Mr.</SelectItem>
                      <SelectItem value="mrs">Mrs.</SelectItem>
                      <SelectItem value="ms">Ms.</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Position</label>
                  <Select defaultValue={selectedFaculty.position.toLowerCase().replace(" ", "-")}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professor">Professor</SelectItem>
                      <SelectItem value="associate-professor">Associate Professor</SelectItem>
                      <SelectItem value="assistant-professor">Assistant Professor</SelectItem>
                      <SelectItem value="adjunct-professor">Adjunct Professor</SelectItem>
                      <SelectItem value="lecturer">Lecturer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <Input defaultValue={selectedFaculty.name.split('.')[1]?.trim().split(' ')[0] || ''} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <Input defaultValue={selectedFaculty.name.split('.')[1]?.trim().split(' ')[1] || ''} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input defaultValue={selectedFaculty.email} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Department</label>
                <Select defaultValue={selectedFaculty.department.toLowerCase()}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="computer science">Computer Science</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="literature">Literature</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Specialization</label>
                <Input placeholder="Area of specialization" defaultValue="Applied Mathematics" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select defaultValue={selectedFaculty.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="on leave">On Leave</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditUserOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateUser}>Update Faculty</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={deleteUserOpen} onOpenChange={setDeleteUserOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Delete Faculty Member</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this faculty member? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedFaculty && (
            <div className="py-4">
              <p className="text-center">You are about to delete <strong>{selectedFaculty.name}</strong>.</p>
              <p className="text-center text-muted-foreground">This will remove all their data from the system.</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteUserOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>Delete Faculty</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign Classes Dialog */}
      <Dialog open={assignClassOpen} onOpenChange={setAssignClassOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Manage Class Assignments</DialogTitle>
            <DialogDescription>
              {selectedFaculty && `Assign classes to ${selectedFaculty.name}`}
            </DialogDescription>
          </DialogHeader>
          {selectedFaculty && (
            <div className="py-4 space-y-4">
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-2">Current Classes</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex-grow">
                      <p className="font-medium">Mathematics 101</p>
                      <p className="text-sm text-muted-foreground">Spring 2025 • 2 Sections</p>
                    </div>
                    <Button variant="outline" size="sm">Remove</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-grow">
                      <p className="font-medium">Mathematics 202</p>
                      <p className="text-sm text-muted-foreground">Spring 2025 • 1 Section</p>
                    </div>
                    <Button variant="outline" size="sm">Remove</Button>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Add New Class</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Class</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="math301">Mathematics 301</SelectItem>
                          <SelectItem value="math401">Mathematics 401</SelectItem>
                          <SelectItem value="mathstat201">Mathematical Statistics 201</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Number of Sections</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select sections" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Section</SelectItem>
                          <SelectItem value="2">2 Sections</SelectItem>
                          <SelectItem value="3">3 Sections</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button className="w-full">Add Class</Button>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setAssignClassOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveClassAssignment}>Save Assignments</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
