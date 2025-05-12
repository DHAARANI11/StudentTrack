
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Upload, BookOpen, Eye, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

export default function StudentDashboard() {
  const [uploadHomeworkOpen, setUploadHomeworkOpen] = useState(false);
  const [viewHomeworkOpen, setViewHomeworkOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [homeworkFile, setHomeworkFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setHomeworkFile(e.target.files[0]);
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!homeworkFile) {
      toast({
        variant: "destructive",
        title: "Missing file",
        description: "Please select a file to upload",
      });
      return;
    }
    
    // Simulating upload
    toast({
      title: "Homework submitted",
      description: `Successfully uploaded ${homeworkFile.name}`,
    });
    setUploadHomeworkOpen(false);
    setHomeworkFile(null);
  };

  const handleViewDocument = (document: any) => {
    setSelectedDocument(document);
    setViewHomeworkOpen(true);
  };

  // Mock data
  const recentAssignments = [
    {
      id: 1, 
      title: "Problem Set 3", 
      course: "Mathematics 101", 
      dueDate: "2025-05-15",
      status: "pending",
      submitted: false
    },
    {
      id: 2, 
      title: "Research Paper", 
      course: "Literature Studies", 
      dueDate: "2025-05-20",
      status: "pending",
      submitted: false
    },
    {
      id: 3, 
      title: "Lab Report", 
      course: "Physics 201", 
      dueDate: "2025-05-12",
      status: "overdue",
      submitted: false
    },
  ];

  const courseDocuments = [
    {
      id: 1,
      title: "Lecture Notes Week 5",
      course: "Mathematics 101",
      date: "2025-05-01",
      type: "PDF",
      size: "2.3 MB"
    },
    {
      id: 2,
      title: "Tutorial Exercises",
      course: "Computer Science 110",
      date: "2025-04-28",
      type: "PDF",
      size: "1.1 MB"
    },
    {
      id: 3,
      title: "Study Guide",
      course: "Physics 201",
      date: "2025-04-25",
      type: "PDF",
      size: "3.8 MB"
    },
  ];

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <h1 className="text-3xl font-bold">Student Dashboard</h1>
        <Button onClick={() => setUploadHomeworkOpen(true)}>
          <Upload className="mr-2 h-4 w-4" />
          Upload Homework
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Assignments */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Assignments</CardTitle>
            <CardDescription>Your pending assignments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAssignments.map((assignment) => (
                <div key={assignment.id} className="flex justify-between items-center border-b pb-3 last:border-0">
                  <div>
                    <h3 className="font-medium">{assignment.title}</h3>
                    <p className="text-sm text-muted-foreground">{assignment.course}</p>
                    <p className="text-xs">Due: {formatDate(assignment.dueDate)}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <Badge variant={assignment.status === "overdue" ? "destructive" : "outline"}>
                      {assignment.status === "overdue" ? "Overdue" : "Pending"}
                    </Badge>
                    <Button 
                      variant="link" 
                      className="h-auto p-0 text-sm" 
                      onClick={() => setUploadHomeworkOpen(true)}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Course Documents */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Learning Materials</CardTitle>
              <CardDescription>Recent course documents</CardDescription>
            </div>
            <Link to="/student/materials">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {courseDocuments.map((document) => (
                <div key={document.id} className="flex justify-between items-center border-b pb-3 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="bg-muted rounded-md p-2">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium">{document.title}</h3>
                      <p className="text-sm text-muted-foreground">{document.course}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{document.type}</span>
                        <span>•</span>
                        <span>{document.size}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleViewDocument(document)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upload Homework Dialog */}
      <Dialog open={uploadHomeworkOpen} onOpenChange={setUploadHomeworkOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Upload Homework</DialogTitle>
            <DialogDescription>
              Submit your completed assignment
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUploadSubmit} className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium mb-1">Course</label>
              <select className="w-full h-10 px-3 py-2 border rounded-md">
                <option value="">Select course</option>
                <option>Mathematics 101</option>
                <option>Physics 201</option>
                <option>Computer Science 110</option>
                <option>Literature Studies</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Assignment</label>
              <select className="w-full h-10 px-3 py-2 border rounded-md">
                <option value="">Select assignment</option>
                <option>Problem Set 3</option>
                <option>Research Paper</option>
                <option>Lab Report</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <Input placeholder="Homework title or description" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Comments for instructor (optional)</label>
              <Textarea placeholder="Any questions or notes about your submission" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">File</label>
              <Input type="file" onChange={handleFileChange} />
              {homeworkFile && (
                <p className="text-xs mt-1 text-muted-foreground">{homeworkFile.name}</p>
              )}
            </div>
            <DialogFooter className="pt-4">
              <Button type="submit">Submit Homework</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Document Dialog */}
      <Dialog open={viewHomeworkOpen} onOpenChange={setViewHomeworkOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Document Viewer</DialogTitle>
            <DialogDescription>
              {selectedDocument && `${selectedDocument.title} - ${selectedDocument.course}`}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="border rounded-lg p-6 flex flex-col items-center justify-center min-h-[200px] bg-muted/10">
              <BookOpen className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground mb-2">Document preview would appear here</p>
              <Button variant="outline" size="sm">Download Document</Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewHomeworkOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Badge component for consistent styling
const Badge = ({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "destructive" | "outline" | "secondary" }) => {
  return (
    <div className={`
      inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
      ${variant === "destructive" ? "bg-destructive/10 text-destructive" : ""}
      ${variant === "outline" ? "border border-border" : ""}
      ${variant === "secondary" ? "bg-secondary text-secondary-foreground" : ""}
      ${variant === "default" ? "bg-primary text-primary-foreground" : ""}
    `}>
      {children}
    </div>
  );
};
