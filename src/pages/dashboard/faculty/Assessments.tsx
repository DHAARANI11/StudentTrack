
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, FileText, Plus, Eye, Calendar, Download } from "lucide-react";
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

// Mock classes data
const classesData = [
  { id: 1, name: "Mathematics 101", section: "A", students: 28 },
  { id: 2, name: "Mathematics 101", section: "B", students: 25 },
  { id: 3, name: "Engineering Mathematics", section: "A", students: 32 },
];

// Mock assessments data
const assessmentsData = [
  {
    id: 1,
    title: "Midterm Exam",
    class: "Mathematics 101 - A",
    date: "2025-05-20",
    duration: 120,
    maxScore: 100,
    status: "upcoming",
    created: "2025-05-01",
    type: "exam",
    submissions: 0
  },
  {
    id: 2,
    title: "Problem Set 3",
    class: "Mathematics 101 - A",
    date: "2025-05-15",
    duration: 0, // 0 for homework/assignments
    maxScore: 50,
    status: "active",
    created: "2025-05-02",
    type: "assignment",
    submissions: 18
  },
  {
    id: 3,
    title: "Quiz 2: Derivatives",
    class: "Mathematics 101 - B",
    date: "2025-05-16",
    duration: 30,
    maxScore: 20,
    status: "active",
    created: "2025-05-03",
    type: "quiz",
    submissions: 15
  },
  {
    id: 4,
    title: "Midterm Project",
    class: "Engineering Mathematics - A",
    date: "2025-05-25",
    duration: 0,
    maxScore: 100,
    status: "upcoming",
    created: "2025-05-05",
    type: "project",
    submissions: 0
  },
  {
    id: 5,
    title: "Quiz 1: Integrals",
    class: "Engineering Mathematics - A",
    date: "2025-04-30",
    duration: 25,
    maxScore: 20,
    status: "completed",
    created: "2025-04-20",
    type: "quiz",
    submissions: 30
  },
  {
    id: 6,
    title: "Problem Set 2",
    class: "Mathematics 101 - B",
    date: "2025-04-28",
    duration: 0,
    maxScore: 40,
    status: "completed",
    created: "2025-04-15",
    type: "assignment",
    submissions: 24
  },
];

// New assessment form schema
const assessmentSchema = z.object({
  title: z.string().min(2, "Title is required"),
  courseSection: z.string().min(1, "Course and section are required"),
  date: z.string().min(2, "Date is required"),
  duration: z.string(),
  maxScore: z.string().min(1, "Max score is required"),
  type: z.string().min(1, "Assessment type is required"),
  instructions: z.string().optional(),
});

type AssessmentValues = z.infer<typeof assessmentSchema>;

export default function FacultyAssessments() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [createAssessmentOpen, setCreateAssessmentOpen] = useState(false);
  const [viewAssessmentOpen, setViewAssessmentOpen] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState<any>(null);
  const [assessmentFile, setAssessmentFile] = useState<File | null>(null);
  
  const assessmentForm = useForm<AssessmentValues>({
    resolver: zodResolver(assessmentSchema),
    defaultValues: {
      title: "",
      courseSection: "",
      date: new Date().toISOString().split('T')[0],
      duration: "",
      maxScore: "100",
      type: "",
      instructions: "",
    },
  });

  const filteredAssessments = assessmentsData.filter(assessment => {
    const matchesSearch = 
      assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      assessment.class.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    return matchesSearch && assessment.status === activeTab;
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAssessmentFile(e.target.files[0]);
    }
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
      setAssessmentFile(null);
    }, 1500);
  };

  const viewAssessment = (assessment: any) => {
    setSelectedAssessment(assessment);
    setViewAssessmentOpen(true);
  };

  const exportAssessment = (assessmentId: number) => {
    // Simulate export
    toast({
      title: "Exporting assessment",
      description: "Your assessment data is being prepared for export",
    });

    setTimeout(() => {
      toast({
        title: "Export complete",
        description: "Assessment data has been exported to your downloads",
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Assessments</h1>
        <Button onClick={() => setCreateAssessmentOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Assessment
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assessmentsData.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {assessmentsData.filter(a => a.status === "active").length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {assessmentsData.filter(a => a.status === "upcoming").length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {assessmentsData.filter(a => a.status === "completed").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search assessments..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Tabs defaultValue="all" className="w-full sm:w-auto" onValueChange={setActiveTab} value={activeTab}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Assessments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Assessments</CardTitle>
          <CardDescription>Manage your class assessments and assignments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Max Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssessments.map((assessment) => (
                  <TableRow key={assessment.id}>
                    <TableCell className="font-medium">{assessment.title}</TableCell>
                    <TableCell className="capitalize">{assessment.type}</TableCell>
                    <TableCell>{assessment.class}</TableCell>
                    <TableCell>{formatDate(assessment.date)}</TableCell>
                    <TableCell>{assessment.duration > 0 ? `${assessment.duration} mins` : "N/A"}</TableCell>
                    <TableCell>{assessment.maxScore} pts</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          assessment.status === "active"
                            ? "default"
                            : assessment.status === "upcoming"
                            ? "outline"
                            : "secondary"
                        }
                        className={assessment.status === "active" ? "bg-success text-success-foreground" : ""}
                      >
                        {assessment.status.charAt(0).toUpperCase() + assessment.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => viewAssessment(assessment)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        {assessment.status === "completed" && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => exportAssessment(assessment.id)}
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Export
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Create Assessment Dialog */}
      <Dialog open={createAssessmentOpen} onOpenChange={setCreateAssessmentOpen}>
        <DialogContent className="sm:max-w-[700px]">
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={assessmentForm.control}
                  name="courseSection"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course & Section</FormLabel>
                      <FormControl>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a course" />
                          </SelectTrigger>
                          <SelectContent>
                            {classesData.map(cls => (
                              <SelectItem 
                                key={cls.id} 
                                value={`${cls.name} - ${cls.section}`}
                              >
                                {cls.name} - {cls.section}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={assessmentForm.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assessment Type</FormLabel>
                      <FormControl>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="exam">Exam</SelectItem>
                            <SelectItem value="quiz">Quiz</SelectItem>
                            <SelectItem value="assignment">Assignment</SelectItem>
                            <SelectItem value="project">Project</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                        <Input {...field} type="number" min="0" placeholder="Leave empty for assignments" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
              </div>
              
              <FormField
                control={assessmentForm.control}
                name="instructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instructions (Optional)</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Instructions for students" rows={3} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div>
                <FormLabel>Attachment (Optional)</FormLabel>
                <Input 
                  type="file" 
                  onChange={handleFileChange}
                  className="mt-1"
                />
                {assessmentFile && (
                  <p className="text-xs mt-1 text-muted-foreground">{assessmentFile.name}</p>
                )}
              </div>
              
              <DialogFooter className="pt-4">
                <Button variant="outline" onClick={() => setCreateAssessmentOpen(false)} type="button">
                  Cancel
                </Button>
                <Button type="submit">Create Assessment</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* View Assessment Dialog */}
      <Dialog open={viewAssessmentOpen} onOpenChange={setViewAssessmentOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Assessment Details</DialogTitle>
            <DialogDescription>
              {selectedAssessment && selectedAssessment.title}
            </DialogDescription>
          </DialogHeader>
          {selectedAssessment && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Class</h4>
                  <p>{selectedAssessment.class}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Type</h4>
                  <p className="capitalize">{selectedAssessment.type}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Date</h4>
                  <p>{formatDate(selectedAssessment.date)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Created On</h4>
                  <p>{formatDate(selectedAssessment.created)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Duration</h4>
                  <p>{selectedAssessment.duration > 0 ? `${selectedAssessment.duration} minutes` : "Not applicable"}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Maximum Score</h4>
                  <p>{selectedAssessment.maxScore} points</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Status</h4>
                <Badge
                  variant={
                    selectedAssessment.status === "active"
                      ? "default"
                      : selectedAssessment.status === "upcoming"
                      ? "outline"
                      : "secondary"
                  }
                  className={selectedAssessment.status === "active" ? "bg-success text-success-foreground" : ""}
                >
                  {selectedAssessment.status.charAt(0).toUpperCase() + selectedAssessment.status.slice(1)}
                </Badge>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Instructions</h4>
                <div className="p-3 bg-muted/50 rounded-md">
                  {selectedAssessment.instructions || "No specific instructions provided."}
                </div>
              </div>
              
              {(selectedAssessment.status === "active" || selectedAssessment.status === "completed") && (
                <div>
                  <h4 className="text-sm font-medium mb-1">Submissions</h4>
                  <div className="flex items-center space-x-2">
                    <p>{selectedAssessment.submissions} submission(s) received</p>
                    {selectedAssessment.submissions > 0 && (
                      <Button variant="outline" size="sm">
                        View Submissions
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            {selectedAssessment?.status !== "completed" && (
              <Button variant="outline" className="mr-auto">
                Edit Assessment
              </Button>
            )}
            {selectedAssessment?.status === "completed" && (
              <Button variant="outline" onClick={() => exportAssessment(selectedAssessment.id)}>
                <Download className="h-4 w-4 mr-1" />
                Export Results
              </Button>
            )}
            <Button onClick={() => setViewAssessmentOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
