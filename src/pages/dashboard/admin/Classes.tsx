
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, Plus, Trash2, FileEdit, Eye, Users } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

// Mock data
const classesData = [
  {
    id: 1,
    name: "Mathematics 101",
    code: "MATH101",
    sections: 2,
    faculty: "Dr. James Wilson",
    students: 53,
    semester: "Spring 2025",
    status: "active"
  },
  {
    id: 2,
    name: "Physics 201",
    code: "PHYS201",
    sections: 2,
    faculty: "Dr. Michael Johnson",
    students: 48,
    semester: "Spring 2025",
    status: "active"
  },
  {
    id: 3,
    name: "Computer Science 110",
    code: "CS110",
    sections: 3,
    faculty: "Prof. Sarah Lee",
    students: 72,
    semester: "Spring 2025",
    status: "active"
  },
  {
    id: 4,
    name: "Literature Studies",
    code: "LIT202",
    sections: 1,
    faculty: "Prof. Emily Adams",
    students: 35,
    semester: "Spring 2025",
    status: "inactive"
  },
  {
    id: 5,
    name: "Engineering Mathematics",
    code: "ENGR205",
    sections: 2,
    faculty: "Dr. Robert Chen",
    students: 64,
    semester: "Spring 2025",
    status: "active"
  },
];

const facultyOptions = [
  { name: "Dr. James Wilson", department: "Mathematics" },
  { name: "Dr. Michael Johnson", department: "Physics" },
  { name: "Prof. Sarah Lee", department: "Computer Science" },
  { name: "Prof. Emily Adams", department: "Literature" },
  { name: "Dr. Robert Chen", department: "Engineering" }
];

export default function AdminClasses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [addClassOpen, setAddClassOpen] = useState(false);
  const [viewClassOpen, setViewClassOpen] = useState(false);
  const [editClassOpen, setEditClassOpen] = useState(false);
  const [deleteClassOpen, setDeleteClassOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [viewStudentsOpen, setViewStudentsOpen] = useState(false);
  const { toast } = useToast();

  const filteredClasses = classesData.filter(classItem => 
    (classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     classItem.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
     classItem.faculty.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (activeTab === "all" || 
     (activeTab === "active" && classItem.status === "active") ||
     (activeTab === "inactive" && classItem.status === "inactive"))
  );

  const handleAddClass = () => {
    toast({
      title: "Class creation initiated",
      description: "Please fill out the form to create a new class.",
    });
    setAddClassOpen(true);
  };

  const handleViewClass = (classItem: any) => {
    setSelectedClass(classItem);
    setViewClassOpen(true);
  };

  const handleEditClass = (classItem: any) => {
    setSelectedClass(classItem);
    setEditClassOpen(true);
  };

  const handleDeleteClass = (classItem: any) => {
    setSelectedClass(classItem);
    setDeleteClassOpen(true);
  };

  const handleViewStudents = (classItem: any) => {
    setSelectedClass(classItem);
    setViewStudentsOpen(true);
  };

  const handleSaveClass = () => {
    toast({
      title: "Class created successfully",
      description: "The new class has been added to the system.",
    });
    setAddClassOpen(false);
  };

  const handleUpdateClass = () => {
    toast({
      title: "Class updated successfully",
      description: "The class information has been updated.",
    });
    setEditClassOpen(false);
  };

  const handleConfirmDelete = () => {
    toast({
      title: "Class deleted",
      description: "The class has been removed from the system.",
    });
    setDeleteClassOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <h1 className="text-3xl font-bold">Class Management</h1>
        <Button onClick={handleAddClass}>
          <Plus className="mr-2 h-4 w-4" />
          Add Class
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search classes..."
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
            <SelectItem value="all">All Classes</SelectItem>
            <SelectItem value="active">Active Only</SelectItem>
            <SelectItem value="inactive">Inactive Only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classesData.length}</div>
            <p className="text-xs text-muted-foreground">All classes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {classesData.filter(c => c.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Sections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {classesData.reduce((sum, c) => sum + c.sections, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Across all classes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {classesData.reduce((sum, c) => sum + c.students, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Enrolled in classes</p>
          </CardContent>
        </Card>
      </div>

      {/* Classes Table */}
      <Card>
        <CardHeader>
          <CardTitle>Classes</CardTitle>
          <CardDescription>Manage all classes and faculty assignments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Class Name</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Sections</TableHead>
                  <TableHead>Assigned Faculty</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClasses.map((classItem) => (
                  <TableRow key={classItem.id}>
                    <TableCell className="font-medium">{classItem.name}</TableCell>
                    <TableCell>{classItem.code}</TableCell>
                    <TableCell>{classItem.sections}</TableCell>
                    <TableCell>{classItem.faculty}</TableCell>
                    <TableCell>{classItem.students}</TableCell>
                    <TableCell>
                      <Badge variant={classItem.status === "active" ? "default" : "secondary"}>
                        {classItem.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewStudents(classItem)}
                        >
                          <Users className="h-4 w-4 mr-1" />
                          Students
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewClass(classItem)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditClass(classItem)}
                        >
                          <FileEdit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-destructive"
                          onClick={() => handleDeleteClass(classItem)}
                        >
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

      {/* Add Class Dialog */}
      <Dialog open={addClassOpen} onOpenChange={setAddClassOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Class</DialogTitle>
            <DialogDescription>
              Enter the details to create a new class.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Class Name</label>
              <Input placeholder="e.g. Mathematics 101" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Class Code</label>
              <Input placeholder="e.g. MATH101" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Department</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="math">Mathematics</SelectItem>
                    <SelectItem value="cs">Computer Science</SelectItem>
                    <SelectItem value="phys">Physics</SelectItem>
                    <SelectItem value="eng">Engineering</SelectItem>
                    <SelectItem value="lit">Literature</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Semester</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spring2025">Spring 2025</SelectItem>
                    <SelectItem value="fall2024">Fall 2024</SelectItem>
                    <SelectItem value="summer2024">Summer 2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Sections</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Number of sections" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
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
            <div className="space-y-2">
              <label className="text-sm font-medium">Assign Faculty</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select faculty member" />
                </SelectTrigger>
                <SelectContent>
                  {facultyOptions.map((faculty, index) => (
                    <SelectItem key={index} value={faculty.name}>
                      {faculty.name} - {faculty.department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddClassOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveClass}>Create Class</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Class Dialog */}
      <Dialog open={viewClassOpen} onOpenChange={setViewClassOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Class Details</DialogTitle>
            <DialogDescription>
              {selectedClass && `Information for ${selectedClass.name}`}
            </DialogDescription>
          </DialogHeader>
          {selectedClass && (
            <div className="py-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium">Class Name</h3>
                  <p>{selectedClass.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Class Code</h3>
                  <p>{selectedClass.code}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium">Semester</h3>
                  <p>{selectedClass.semester}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Status</h3>
                  <Badge variant={selectedClass.status === "active" ? "default" : "secondary"}>
                    {selectedClass.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium">Sections</h3>
                  <p>{selectedClass.sections}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Students</h3>
                  <p>{selectedClass.students}</p>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium">Assigned Faculty</h3>
                <p>{selectedClass.faculty}</p>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-sm font-medium mb-2">Schedule</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Section 1:</span>
                    <span>Mon, Wed, Fri 9:00 AM - 10:30 AM</span>
                  </div>
                  {selectedClass.sections > 1 && (
                    <div className="flex justify-between text-sm">
                      <span>Section 2:</span>
                      <span>Mon, Wed, Fri 11:00 AM - 12:30 PM</span>
                    </div>
                  )}
                  {selectedClass.sections > 2 && (
                    <div className="flex justify-between text-sm">
                      <span>Section 3:</span>
                      <span>Tue, Thu 2:00 PM - 4:00 PM</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewClassOpen(false)}>Close</Button>
            <Button onClick={() => {
              setViewClassOpen(false);
              handleEditClass(selectedClass);
            }}>Edit Class</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Class Dialog */}
      <Dialog open={editClassOpen} onOpenChange={setEditClassOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Class</DialogTitle>
            <DialogDescription>
              {selectedClass && `Update information for ${selectedClass.name}`}
            </DialogDescription>
          </DialogHeader>
          {selectedClass && (
            <div className="py-4 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Class Name</label>
                <Input defaultValue={selectedClass.name} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Class Code</label>
                <Input defaultValue={selectedClass.code} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Department</label>
                  <Select defaultValue={selectedClass.code.slice(0, 4).toLowerCase()}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="math">Mathematics</SelectItem>
                      <SelectItem value="cs">Computer Science</SelectItem>
                      <SelectItem value="phys">Physics</SelectItem>
                      <SelectItem value="engr">Engineering</SelectItem>
                      <SelectItem value="lit">Literature</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Semester</label>
                  <Select defaultValue={selectedClass.semester.toLowerCase().replace(" ", "")}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spring2025">Spring 2025</SelectItem>
                      <SelectItem value="fall2024">Fall 2024</SelectItem>
                      <SelectItem value="summer2024">Summer 2024</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sections</label>
                  <Select defaultValue={selectedClass.sections.toString()}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select defaultValue={selectedClass.status}>
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
              <div className="space-y-2">
                <label className="text-sm font-medium">Assign Faculty</label>
                <Select defaultValue={selectedClass.faculty}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {facultyOptions.map((faculty, index) => (
                      <SelectItem key={index} value={faculty.name}>
                        {faculty.name} - {faculty.department}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditClassOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateClass}>Update Class</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Class Dialog */}
      <Dialog open={deleteClassOpen} onOpenChange={setDeleteClassOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Delete Class</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this class? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedClass && (
            <div className="py-4">
              <p className="text-center">You are about to delete <strong>{selectedClass.name}</strong> ({selectedClass.code}).</p>
              <p className="text-center text-muted-foreground">This will remove all class data from the system.</p>
              {selectedClass.students > 0 && (
                <p className="text-center mt-2 text-destructive">Warning: This class has {selectedClass.students} enrolled students.</p>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteClassOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>Delete Class</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Students Dialog */}
      <Dialog open={viewStudentsOpen} onOpenChange={setViewStudentsOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Class Students</DialogTitle>
            <DialogDescription>
              {selectedClass && `Students enrolled in ${selectedClass.name}`}
            </DialogDescription>
          </DialogHeader>
          {selectedClass && (
            <div className="py-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Section</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Alex Johnson</TableCell>
                      <TableCell>alex.j@example.edu</TableCell>
                      <TableCell>Section 1</TableCell>
                      <TableCell>
                        <Badge variant="default">Active</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Maria Garcia</TableCell>
                      <TableCell>m.garcia@example.edu</TableCell>
                      <TableCell>Section 1</TableCell>
                      <TableCell>
                        <Badge variant="default">Active</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>James Wilson</TableCell>
                      <TableCell>j.wilson@example.edu</TableCell>
                      <TableCell>Section 2</TableCell>
                      <TableCell>
                        <Badge variant="default">Active</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Sophia Lee</TableCell>
                      <TableCell>s.lee@example.edu</TableCell>
                      <TableCell>Section 2</TableCell>
                      <TableCell>
                        <Badge variant="default">Active</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Showing 4 of {selectedClass.students} students
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Previous</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewStudentsOpen(false)}>Close</Button>
            <Button>Add Students</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
