
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
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import * as z from "zod";
import { Calendar, Upload, FileText, Book } from "lucide-react";

// Mock data
const classesData = [
  {
    id: 1,
    name: "Mathematics 101",
    students: 28,
    attendance: 92,
    section: "A",
    pending: 6,
  },
  {
    id: 2,
    name: "Mathematics 101",
    students: 25,
    attendance: 88,
    section: "B",
    pending: 4,
  },
  {
    id: 3,
    name: "Engineering Mathematics",
    students: 32,
    attendance: 94,
    section: "A",
    pending: 9,
  },
];

const homeworkData = [
  {
    id: 1,
    student: {
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=150&h=150&q=80",
    },
    class: "Mathematics 101 - A",
    assignment: "Problem Set 3",
    submitted: "2025-05-08T15:30:00",
    status: "pending",
    document: "/sample-homework.pdf",
  },
  {
    id: 2,
    student: {
      name: "Maria Garcia",
      avatar: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=150&h=150&q=80",
    },
    class: "Mathematics 101 - B",
    assignment: "Problem Set 3",
    submitted: "2025-05-08T14:15:00",
    status: "pending",
    document: "/sample-homework.pdf",
  },
  {
    id: 3,
    student: {
      name: "James Wilson",
      avatar: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=150&h=150&q=80",
    },
    class: "Engineering Mathematics - A",
    assignment: "Case Study",
    submitted: "2025-05-07T23:45:00",
    status: "pending",
    document: "/sample-homework.pdf",
  },
  {
    id: 4,
    student: {
      name: "Sophia Lee",
      avatar: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=150&h=150&q=80",
    },
    class: "Mathematics 101 - A",
    assignment: "Problem Set 2",
    submitted: "2025-05-02T10:20:00",
    status: "graded",
    document: "/sample-homework.pdf",
  },
  {
    id: 5,
    student: {
      name: "Daniel Brown",
      avatar: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=150&h=150&q=80",
    },
    class: "Engineering Mathematics - A",
    assignment: "Midterm Project",
    submitted: "2025-05-01T16:30:00",
    status: "graded",
    document: "/sample-homework.pdf",
  },
];

const attendanceChartData = [
  { name: "Present", value: 85, fill: "hsl(var(--success))" },
  { name: "Absent", value: 8, fill: "hsl(var(--destructive))" },
  { name: "Late", value: 7, fill: "hsl(var(--warning))" },
];

// New form schema for material upload
const materialUploadSchema = z.object({
  title: z.string().min(2, "Title is required"),
  courseSection: z.string().min(2, "Course and section are required"),
  description: z.string().optional(),
});

// New form schema for assessment creation
const assessmentSchema = z.object({
  title: z.string().min(2, "Title is required"),
  courseSection: z.string().min(2, "Course and section are required"),
  date: z.string().min(2, "Date is required"),
  duration: z.string().min(1, "Duration is required"),
  maxScore: z.string().min(1, "Max score is required"),
  instructions: z.string().optional(),
});

// Grade submission schema
const gradeSchema = z.object({
  grade: z.string().min(1, "Grade is required"),
  feedback: z.string().optional(),
});

// Attendance schema
const attendanceSchema = z.object({
  classId: z.string().min(1, "Class selection is required"),
  date: z.string().min(10, "Date is required"),
});

type MaterialUploadValues = z.infer<typeof materialUploadSchema>;
type AssessmentValues = z.infer<typeof assessmentSchema>;
type GradeValues = z.infer<typeof gradeSchema>;
type AttendanceValues = z.infer<typeof attendanceSchema>;

export default function FacultyDashboard() {
  const { toast } = useToast();
  const [uploadMaterialOpen, setUploadMaterialOpen] = useState(false);
  const [createAssessmentOpen, setCreateAssessmentOpen] = useState(false);
  const [viewHomeworkOpen, setViewHomeworkOpen] = useState(false);
  const [selectedHomework, setSelectedHomework] = useState<any>(null);
  const [gradeSubmissionOpen, setGradeSubmissionOpen] = useState(false);
  const [takeAttendanceOpen, setTakeAttendanceOpen] = useState(false);
  const [leaveRequestsOpen, setLeaveRequestsOpen] = useState(false);
  const [materialFile, setMaterialFile] = useState<File | null>(null);
  
  // Format date function
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  const materialForm = useForm<MaterialUploadValues>({
    resolver: zodResolver(materialUploadSchema),
    defaultValues: {
      title: "",
      courseSection: "",
      description: "",
    },
  });

  const assessmentForm = useForm<AssessmentValues>({
    resolver: zodResolver(assessmentSchema),
    defaultValues: {
      title: "",
      courseSection: "",
      date: new Date().toISOString().split('T')[0],
      duration: "",
      maxScore: "100",
      instructions: "",
    },
  });

  const gradeForm = useForm<GradeValues>({
    resolver: zodResolver(gradeSchema),
    defaultValues: {
      grade: "",
      feedback: "",
    },
  });

  const attendanceForm = useForm<AttendanceValues>({
    resolver: zodResolver(attendanceSchema),
    defaultValues: {
      classId: "",
      date: new Date().toISOString().split('T')[0],
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMaterialFile(e.target.files[0]);
    }
  };

  const onMaterialUploadSubmit = (values: MaterialUploadValues) => {
    if (!materialFile) {
      toast({
        title: "Missing file",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    // Simulate uploading
    toast({
      title: "Uploading material",
      description: "Your learning material is being uploaded",
    });

    setTimeout(() => {
      toast({
        title: "Material uploaded",
        description: `Successfully uploaded ${materialFile.name} for ${values.courseSection}`,
      });
      setUploadMaterialOpen(false);
      materialForm.reset();
      setMaterialFile(null);
    }, 1500);
  };

  const onCreateAssessmentSubmit = (values: AssessmentValues) => {
    // Simulate API call
    toast({
      title: "Creating assessment",
      description: "Your assessment is being created",
    });

    setTimeout(() => {
      toast({
        title: "Assessment created",
        description: `Successfully created ${values.title} for ${values.courseSection}`,
      });
      setCreateAssessmentOpen(false);
      assessmentForm.reset();
    }, 1500);
  };

  const onGradeSubmit = (values: GradeValues) => {
    if (!selectedHomework) return;

    // Simulate API call
    toast({
      title: "Submitting grade",
      description: "The grade is being submitted",
    });

    setTimeout(() => {
      toast({
        title: "Grade submitted",
        description: `Grade ${values.grade} submitted for ${selectedHomework.student.name}'s assignment`,
      });
      setGradeSubmissionOpen(false);
      gradeForm.reset();
      
      // Update the status in the mock data
      const updatedHomeworkData = homeworkData.map(hw => 
        hw.id === selectedHomework.id ? { ...hw, status: 'graded' } : hw
      );
      // In a real app, you would update state here
    }, 1500);
  };

  const onAttendanceSubmit = (values: AttendanceValues) => {
    // Simulate API call
    toast({
      title: "Taking attendance",
      description: "Attendance is being recorded",
    });

    setTimeout(() => {
      toast({
        title: "Attendance recorded",
        description: `Attendance for ${values.date} has been recorded`,
      });
      setTakeAttendanceOpen(false);
      attendanceForm.reset();
    }, 1500);
  };

  const viewHomework = (homework: any) => {
    setSelectedHomework(homework);
    setViewHomeworkOpen(true);
  };

  const gradeHomework = (homework: any) => {
    setSelectedHomework(homework);
    setGradeSubmissionOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <h1 className="text-3xl font-bold">Faculty Dashboard</h1>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => setUploadMaterialOpen(true)}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Material
          </Button>
          <Button size="sm" onClick={() => setCreateAssessmentOpen(true)}>
            <FileText className="mr-2 h-4 w-4" />
            Create Assessment
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Across 2 courses</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85</div>
            <p className="text-xs text-muted-foreground">Enrolled in your classes</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">19</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">91%</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Classes and Attendance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>My Classes</CardTitle>
            <CardDescription>Overview of your assigned classes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Class</TableHead>
                    <TableHead>Section</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Pending</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {classesData.map((classItem) => (
                    <TableRow key={classItem.id}>
                      <TableCell className="font-medium">{classItem.name}</TableCell>
                      <TableCell>{classItem.section}</TableCell>
                      <TableCell>{classItem.students}</TableCell>
                      <TableCell>{classItem.attendance}%</TableCell>
                      <TableCell>{classItem.pending}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attendance Overview</CardTitle>
            <CardDescription>All classes combined</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attendanceChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {attendanceChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Homework Submissions */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Recent Homework Submissions</CardTitle>
            <CardDescription>
              Recently submitted assignments requiring review
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" className="mt-4 sm:mt-0">
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Assignment</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {homeworkData.map((homework) => (
                  <TableRow key={homework.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={homework.student.avatar} />
                          <AvatarFallback>
                            {homework.student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span>{homework.student.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{homework.class}</TableCell>
                    <TableCell>{homework.assignment}</TableCell>
                    <TableCell>{formatDate(homework.submitted)}</TableCell>
                    <TableCell>
                      <div
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          homework.status === "pending"
                            ? "bg-warning/10 text-warning"
                            : "bg-success/10 text-success"
                        }`}
                      >
                        {homework.status === "pending" ? "Pending" : "Graded"}
                      </div>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => viewHomework(homework)}
                      >
                        View
                      </Button>
                      {homework.status === "pending" && (
                        <Button 
                          variant="default" 
                          size="sm"
                          onClick={() => gradeHomework(homework)}
                        >
                          Grade
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Mark Attendance</CardTitle>
            <CardDescription>Record today's class attendance</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pb-6">
            <Button onClick={() => setTakeAttendanceOpen(true)}>
              <Calendar className="mr-2 h-4 w-4" />
              Start Attendance
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Schedule Assessment</CardTitle>
            <CardDescription>Plan your next class assessment</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pb-6">
            <Button onClick={() => setCreateAssessmentOpen(true)}>
              <FileText className="mr-2 h-4 w-4" />
              Create New
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Leave Requests</CardTitle>
            <CardDescription>Review student leave applications</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pb-6">
            <Button variant="outline" onClick={() => setLeaveRequestsOpen(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
              View Requests (4)
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Upload Material Dialog */}
      <Dialog open={uploadMaterialOpen} onOpenChange={setUploadMaterialOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Upload Learning Material</DialogTitle>
            <DialogDescription>
              Upload study materials, lecture notes, or resources for your students.
            </DialogDescription>
          </DialogHeader>
          <Form {...materialForm}>
            <form onSubmit={materialForm.handleSubmit(onMaterialUploadSubmit)} className="space-y-4">
              <FormField
                control={materialForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., Lecture Notes - Week 5" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={materialForm.control}
                name="courseSection"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course & Section</FormLabel>
                    <FormControl>
                      <select 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        {...field}
                      >
                        <option value="">Select a course</option>
                        {classesData.map(c => (
                          <option key={c.id} value={`${c.name} - ${c.section}`}>{c.name} - {c.section}</option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={materialForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Brief description of the material" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <FormLabel>File</FormLabel>
                <Input 
                  type="file" 
                  onChange={handleFileChange} 
                  className="mt-1"
                />
                {materialFile && (
                  <p className="text-xs mt-1 text-muted-foreground">{materialFile.name}</p>
                )}
              </div>
              <DialogFooter className="pt-4">
                <Button type="submit">Upload Material</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Create Assessment Dialog */}
      <Dialog open={createAssessmentOpen} onOpenChange={setCreateAssessmentOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Assessment</DialogTitle>
            <DialogDescription>
              Set up a new exam, quiz, or assignment for your class.
            </DialogDescription>
          </DialogHeader>
          <Form {...assessmentForm}>
            <form onSubmit={assessmentForm.handleSubmit(onCreateAssessmentSubmit)} className="space-y-4">
              <FormField
                control={assessmentForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., Midterm Exam" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={assessmentForm.control}
                name="courseSection"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course & Section</FormLabel>
                    <FormControl>
                      <select 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        {...field}
                      >
                        <option value="">Select a course</option>
                        {classesData.map(c => (
                          <option key={c.id} value={`${c.name} - ${c.section}`}>{c.name} - {c.section}</option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={assessmentForm.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={assessmentForm.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (minutes)</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" min="1" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={assessmentForm.control}
                name="maxScore"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Score</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" min="1" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={assessmentForm.control}
                name="instructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instructions (Optional)</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Instructions for students" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="pt-4">
                <Button type="submit">Create Assessment</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* View Homework Dialog */}
      <Dialog open={viewHomeworkOpen} onOpenChange={setViewHomeworkOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Homework Submission</DialogTitle>
            <DialogDescription>
              {selectedHomework && `${selectedHomework.student.name}'s submission for ${selectedHomework.assignment}`}
            </DialogDescription>
          </DialogHeader>
          {selectedHomework && (
            <div className="space-y-4">
              <div className="border rounded-lg p-4 bg-muted/30">
                <div className="grid grid-cols-3 gap-2">
                  <p className="font-medium">Student:</p>
                  <p className="col-span-2">{selectedHomework.student.name}</p>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <p className="font-medium">Class:</p>
                  <p className="col-span-2">{selectedHomework.class}</p>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <p className="font-medium">Assignment:</p>
                  <p className="col-span-2">{selectedHomework.assignment}</p>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <p className="font-medium">Submitted:</p>
                  <p className="col-span-2">{formatDate(selectedHomework.submitted)}</p>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <p className="font-medium">Status:</p>
                  <p className="col-span-2 capitalize">{selectedHomework.status}</p>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 flex flex-col items-center justify-center min-h-[200px] bg-muted/10">
                <Book className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground mb-2">Document preview would appear here</p>
                <Button variant="outline" size="sm">Download Document</Button>
              </div>
            </div>
          )}
          <DialogFooter className="space-x-2">
            <Button variant="outline" onClick={() => setViewHomeworkOpen(false)}>Close</Button>
            {selectedHomework && selectedHomework.status === "pending" && (
              <Button onClick={() => {
                setViewHomeworkOpen(false);
                setGradeSubmissionOpen(true);
              }}>
                Grade Submission
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Grade Submission Dialog */}
      <Dialog open={gradeSubmissionOpen} onOpenChange={setGradeSubmissionOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Grade Submission</DialogTitle>
            <DialogDescription>
              {selectedHomework && `Provide a grade for ${selectedHomework.student.name}'s ${selectedHomework.assignment}`}
            </DialogDescription>
          </DialogHeader>
          {selectedHomework && (
            <Form {...gradeForm}>
              <form onSubmit={gradeForm.handleSubmit(onGradeSubmit)} className="space-y-4">
                <FormField
                  control={gradeForm.control}
                  name="grade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Grade</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g., 85/100 or A-" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={gradeForm.control}
                  name="feedback"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Feedback (Optional)</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Provide feedback to the student" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter className="pt-4">
                  <Button type="submit">Submit Grade</Button>
                </DialogFooter>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>

      {/* Take Attendance Dialog */}
      <Dialog open={takeAttendanceOpen} onOpenChange={setTakeAttendanceOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Mark Attendance</DialogTitle>
            <DialogDescription>
              Record attendance for your class.
            </DialogDescription>
          </DialogHeader>
          <Form {...attendanceForm}>
            <form onSubmit={attendanceForm.handleSubmit(onAttendanceSubmit)} className="space-y-4">
              <FormField
                control={attendanceForm.control}
                name="classId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class</FormLabel>
                    <FormControl>
                      <select 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        {...field}
                      >
                        <option value="">Select a class</option>
                        {classesData.map(c => (
                          <option key={c.id} value={c.id.toString()}>{c.name} - {c.section}</option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={attendanceForm.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="pt-4">
                <Button type="submit">Start Marking Attendance</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
