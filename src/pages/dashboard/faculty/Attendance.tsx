
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarIcon, Search, Download, FileText, Calendar, Check, X, Clock } from "lucide-react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";

// Mock data for classes
const classesData = [
  { id: 1, name: "Mathematics 101", section: "A", students: 28 },
  { id: 2, name: "Mathematics 101", section: "B", students: 25 },
  { id: 3, name: "Engineering Mathematics", section: "A", students: 32 },
];

// Mock data for attendance records
const attendanceRecordsData = [
  { 
    id: 1, 
    class: "Mathematics 101 - A", 
    date: "2025-05-10", 
    present: 26, 
    absent: 2, 
    late: 0, 
    totalStudents: 28,
    status: "completed"
  },
  { 
    id: 2, 
    class: "Mathematics 101 - B", 
    date: "2025-05-10", 
    present: 22, 
    absent: 1, 
    late: 2, 
    totalStudents: 25,
    status: "completed"
  },
  { 
    id: 3, 
    class: "Engineering Mathematics - A", 
    date: "2025-05-09", 
    present: 30, 
    absent: 1, 
    late: 1, 
    totalStudents: 32,
    status: "completed"
  },
  { 
    id: 4, 
    class: "Mathematics 101 - A", 
    date: "2025-05-08", 
    present: 25, 
    absent: 3, 
    late: 0, 
    totalStudents: 28,
    status: "completed"
  },
  { 
    id: 5, 
    class: "Engineering Mathematics - A", 
    date: "2025-05-11", 
    present: 0, 
    absent: 0, 
    late: 0, 
    totalStudents: 32,
    status: "pending"
  },
];

// Mock data for student attendance
const mockStudentsForAttendance = [
  { id: 1, name: "Alex Johnson", status: "present" },
  { id: 2, name: "Taylor Smith", status: "absent" },
  { id: 3, name: "Jordan Brown", status: "late" },
  { id: 4, name: "Casey Williams", status: "present" },
  { id: 5, name: "Jamie Davis", status: "present" },
  { id: 6, name: "Morgan Wilson", status: "present" },
  { id: 7, name: "Riley Miller", status: "absent" },
  { id: 8, name: "Quinn Thomas", status: "present" },
  { id: 9, name: "Avery Anderson", status: "present" },
  { id: 10, name: "Carter Martinez", status: "present" },
];

// Get students by class ID
const getStudentsByClassId = (classId: number) => {
  // In a real app, this would fetch students from API based on class ID
  // For now, we'll just return our mock data with a simulated delay
  return mockStudentsForAttendance;
};

export default function FacultyAttendance() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [takeAttendanceDialogOpen, setTakeAttendanceDialogOpen] = useState(false);
  const [viewAttendanceDialogOpen, setViewAttendanceDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [students, setStudents] = useState(mockStudentsForAttendance);
  
  // Check if we have a class ID from the URL query params (redirected from Classes page)
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const classId = queryParams.get('class');
    
    if (classId) {
      setSelectedClass(classId);
      handleTakeAttendance(parseInt(classId));
    }
  }, [location]);

  const filteredRecords = attendanceRecordsData.filter(record => {
    const matchesSearch = record.class.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleViewAttendance = (record: any) => {
    setSelectedRecord(record);
    setViewAttendanceDialogOpen(true);
  };

  const handleTakeAttendance = (classId?: number) => {
    if (classId) {
      const classInfo = classesData.find(c => c.id === classId);
      if (classInfo) {
        setSelectedClass(classId.toString());
        // Load students for this class
        const classStudents = getStudentsByClassId(classId);
        setStudents(classStudents.map(student => ({
          ...student,
          status: "present" // Default all to present
        })));
        setTakeAttendanceDialogOpen(true);
      }
    } else if (!selectedClass || !selectedDate) {
      toast({
        title: "Missing information",
        description: "Please select a class and date",
        variant: "destructive",
      });
      return;
    } else {
      setTakeAttendanceDialogOpen(true);
      // Reset student statuses for new attendance
      setStudents(mockStudentsForAttendance.map(student => ({
        ...student,
        status: "present" // Default all to present
      })));
    }
  };

  const updateStudentStatus = (studentId: number, newStatus: string) => {
    setStudents(students.map(student => 
      student.id === studentId ? { ...student, status: newStatus } : student
    ));
  };

  const markAllPresent = () => {
    setStudents(students.map(student => ({
      ...student,
      status: "present"
    })));
  };

  const submitAttendance = () => {
    // Count attendance
    const present = students.filter(s => s.status === "present").length;
    const absent = students.filter(s => s.status === "absent").length;
    const late = students.filter(s => s.status === "late").length;

    // In a real app, you would submit this data to an API
    toast({
      title: "Attendance Submitted",
      description: `Recorded ${present} present, ${absent} absent, and ${late} late students.`,
    });
    
    setTakeAttendanceDialogOpen(false);
  };

  const exportAttendance = (recordId: number) => {
    toast({
      title: "Export Started",
      description: "Attendance report is being generated.",
    });
    // In a real app, this would trigger a download
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Attendance Management</h1>
        <Button onClick={() => setTakeAttendanceDialogOpen(true)}>
          <Calendar className="mr-2 h-4 w-4" />
          Take Attendance
        </Button>
      </div>

      {/* Quick Actions Panel */}
      <Card className="bg-muted/40">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Class</label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {classesData.map(cls => (
                    <SelectItem key={cls.id} value={cls.id.toString()}>
                      {cls.name} - {cls.section}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="flex items-end">
              <Button 
                className="w-full"
                onClick={() => handleTakeAttendance()}
              >
                Start Attendance
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Records */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Attendance Records</CardTitle>
            <CardDescription>History of attendance for your classes</CardDescription>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search records..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Present</TableHead>
                <TableHead>Absent</TableHead>
                <TableHead>Late</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.class}</TableCell>
                  <TableCell>{formatDate(record.date)}</TableCell>
                  <TableCell>{record.present}</TableCell>
                  <TableCell>{record.absent}</TableCell>
                  <TableCell>{record.late}</TableCell>
                  <TableCell>
                    <Badge variant={record.status === "completed" ? "default" : "outline"}>
                      {record.status === "completed" ? "Completed" : "Pending"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => record.status === "completed" ? handleViewAttendance(record) : handleTakeAttendance()}
                    >
                      {record.status === "completed" ? "View" : "Take"}
                    </Button>
                    {record.status === "completed" && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => exportAttendance(record.id)}
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        Export
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Take Attendance Dialog */}
      <Dialog open={takeAttendanceDialogOpen} onOpenChange={setTakeAttendanceDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Take Attendance</DialogTitle>
            <DialogDescription>
              {selectedClass && classesData.find(c => c.id.toString() === selectedClass)?.name} - 
              {selectedClass && classesData.find(c => c.id.toString() === selectedClass)?.section} | 
              {selectedDate && format(selectedDate, " MMMM d, yyyy")}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <div className="space-x-2">
                <Badge variant="outline" className="bg-primary/10 hover:bg-primary/20">
                  Total: {students.length}
                </Badge>
                <Badge variant="outline" className="bg-success/10 text-success hover:bg-success/20">
                  Present: {students.filter(s => s.status === "present").length}
                </Badge>
                <Badge variant="outline" className="bg-destructive/10 text-destructive hover:bg-destructive/20">
                  Absent: {students.filter(s => s.status === "absent").length}
                </Badge>
                <Badge variant="outline" className="bg-warning/10 text-warning hover:bg-warning/20">
                  Late: {students.filter(s => s.status === "late").length}
                </Badge>
              </div>
              <div>
                <Button variant="outline" size="sm" onClick={markAllPresent}>Mark All Present</Button>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-1">
                          <Button
                            size="sm"
                            variant={student.status === "present" ? "default" : "outline"}
                            className={cn(
                              student.status === "present" && "bg-success hover:bg-success/80"
                            )}
                            onClick={() => updateStudentStatus(student.id, "present")}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant={student.status === "absent" ? "default" : "outline"}
                            className={cn(
                              student.status === "absent" && "bg-destructive hover:bg-destructive/80"
                            )}
                            onClick={() => updateStudentStatus(student.id, "absent")}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant={student.status === "late" ? "default" : "outline"}
                            className={cn(
                              student.status === "late" && "bg-warning hover:bg-warning/80"
                            )}
                            onClick={() => updateStudentStatus(student.id, "late")}
                          >
                            <Clock className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setTakeAttendanceDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={submitAttendance}>
              Submit Attendance
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Attendance Dialog */}
      <Dialog open={viewAttendanceDialogOpen} onOpenChange={setViewAttendanceDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Attendance Details</DialogTitle>
            <DialogDescription>
              {selectedRecord && `${selectedRecord.class} | ${formatDate(selectedRecord.date)}`}
            </DialogDescription>
          </DialogHeader>
          {selectedRecord && (
            <div className="space-y-4">
              <div className="flex justify-between">
                <div className="space-x-2">
                  <Badge variant="outline" className="bg-primary/10">
                    Total: {selectedRecord.totalStudents}
                  </Badge>
                  <Badge variant="outline" className="bg-success/10 text-success">
                    Present: {selectedRecord.present}
                  </Badge>
                  <Badge variant="outline" className="bg-destructive/10 text-destructive">
                    Absent: {selectedRecord.absent}
                  </Badge>
                  <Badge variant="outline" className="bg-warning/10 text-warning">
                    Late: {selectedRecord.late}
                  </Badge>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student Name</TableHead>
                      <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>{student.name}</TableCell>
                        <TableCell className="text-right">
                          <Badge
                            variant="outline"
                            className={cn(
                              student.status === "present" && "bg-success/10 text-success",
                              student.status === "absent" && "bg-destructive/10 text-destructive",
                              student.status === "late" && "bg-warning/10 text-warning"
                            )}
                          >
                            {student.status === "present" && "Present"}
                            {student.status === "absent" && "Absent"}
                            {student.status === "late" && "Late"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => exportAttendance(selectedRecord?.id)}>
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
            <Button onClick={() => setViewAttendanceDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
