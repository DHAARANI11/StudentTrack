
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Users, BookOpen, Calendar } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Mock classes data
const classesData = [
  {
    id: 1,
    name: "Mathematics 101",
    section: "A",
    code: "MATH101-A",
    schedule: "Mon, Wed, Fri 9:00 AM - 10:30 AM",
    room: "Science Building 301",
    students: 28,
    attendance: 92,
    pending: 6,
    semester: "Spring 2025",
    status: "active"
  },
  {
    id: 2,
    name: "Mathematics 101",
    section: "B",
    code: "MATH101-B",
    schedule: "Mon, Wed, Fri 11:00 AM - 12:30 PM",
    room: "Science Building 302",
    students: 25,
    attendance: 88,
    pending: 4,
    semester: "Spring 2025",
    status: "active"
  },
  {
    id: 3,
    name: "Engineering Mathematics",
    section: "A",
    code: "ENGR205-A",
    schedule: "Tue, Thu 1:00 PM - 3:00 PM",
    room: "Engineering Hall 105",
    students: 32,
    attendance: 94,
    pending: 9,
    semester: "Spring 2025",
    status: "active"
  },
  {
    id: 4,
    name: "Advanced Calculus",
    section: "A",
    code: "MATH301-A",
    schedule: "Tue, Thu 9:00 AM - 10:30 AM",
    room: "Science Building 405",
    students: 18,
    attendance: 96,
    pending: 2,
    semester: "Spring 2025",
    status: "active"
  },
];

export default function FacultyClasses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const filteredClasses = classesData.filter(classItem => {
    const matchesSearch = 
      classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      classItem.code.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    return matchesSearch && classItem.status === activeTab;
  });

  const handleStartAttendance = (classId: number) => {
    toast({
      title: "Starting Attendance Session",
      description: `Loading attendance page for class #${classId}`,
    });
    // Navigate to the attendance page with the class ID as a query parameter
    navigate(`/faculty/attendance?class=${classId}`);
  };

  const handleViewRoster = (classId: number) => {
    toast({
      description: `Loading roster for class #${classId}`,
    });
    // In a real app, this would open a roster view or navigate to a roster page
    navigate(`/faculty/roster?class=${classId}`);
  };

  const handleManageClass = (classId: number) => {
    toast({
      description: `Managing class #${classId}`,
    });
    // In a real app, navigate to the class management page
    navigate(`/faculty/classes/manage/${classId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Classes</h1>
        <Button>
          <Calendar className="mr-2 h-4 w-4" />
          Export Schedule
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search classes..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Tabs defaultValue="all" className="w-full sm:w-auto" onValueChange={setActiveTab} value={activeTab}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Class Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classesData.length}</div>
            <p className="text-xs text-muted-foreground">Spring 2025 semester</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {classesData.reduce((sum, cls) => sum + cls.students, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Across all classes</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {classesData.reduce((sum, cls) => sum + cls.pending, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(classesData.reduce((sum, cls) => sum + cls.attendance, 0) / classesData.length)}%
            </div>
            <p className="text-xs text-muted-foreground">All classes combined</p>
          </CardContent>
        </Card>
      </div>

      {/* Classes Table */}
      <Card>
        <CardHeader>
          <CardTitle>Classes</CardTitle>
          <CardDescription>Manage your assigned classes and sections</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Class</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Attendance</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClasses.map((classItem) => (
                  <TableRow key={classItem.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{classItem.name}</div>
                        <div className="text-sm text-muted-foreground">Section {classItem.section}</div>
                      </div>
                    </TableCell>
                    <TableCell>{classItem.code}</TableCell>
                    <TableCell>{classItem.schedule}</TableCell>
                    <TableCell>{classItem.room}</TableCell>
                    <TableCell>{classItem.students}</TableCell>
                    <TableCell>
                      <Badge variant={classItem.attendance >= 90 ? "default" : (classItem.attendance >= 80 ? "secondary" : "destructive")}>
                        {classItem.attendance}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2 flex-wrap">
                        <Button variant="outline" size="sm" onClick={() => handleViewRoster(classItem.id)}>
                          <Users className="h-4 w-4 mr-1" />
                          Roster
                        </Button>
                        <Button size="sm" onClick={() => handleManageClass(classItem.id)}>
                          <BookOpen className="h-4 w-4 mr-1" />
                          Manage
                        </Button>
                        <Button variant="secondary" size="sm" onClick={() => handleStartAttendance(classItem.id)}>
                          <Calendar className="h-4 w-4 mr-1" />
                          Attendance
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
    </div>
  );
}
