
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, FileText, Search } from "lucide-react";

// Mock course materials data
const courseMaterials = [
  { 
    id: 1, 
    title: "Introduction to Calculus", 
    course: "Mathematics 101", 
    instructor: "Dr. Johnson", 
    type: "PDF", 
    size: "2.4 MB", 
    dateAdded: "2025-05-01", 
    description: "Basic concepts of calculus including limits, derivatives, and integrals."
  },
  { 
    id: 2, 
    title: "Physics Lab Manual", 
    course: "Physics 201", 
    instructor: "Prof. Miller", 
    type: "PDF", 
    size: "3.8 MB", 
    dateAdded: "2025-04-28", 
    description: "Comprehensive lab procedures and safety guidelines for Physics 201."
  },
  { 
    id: 3, 
    title: "Data Structures Reference", 
    course: "Computer Science 110", 
    instructor: "Dr. Smith", 
    type: "PDF", 
    size: "1.9 MB", 
    dateAdded: "2025-05-05", 
    description: "Reference guide for common data structures including arrays, linked lists, trees, and graphs."
  },
  { 
    id: 4, 
    title: "Literature Analysis Guidelines", 
    course: "Literature Studies", 
    instructor: "Prof. Williams", 
    type: "DOCX", 
    size: "1.2 MB", 
    dateAdded: "2025-04-20", 
    description: "Guidelines for analyzing literary works and writing analysis papers."
  },
  { 
    id: 5, 
    title: "Midterm Study Guide", 
    course: "Mathematics 101", 
    instructor: "Dr. Johnson", 
    type: "PDF", 
    size: "1.8 MB", 
    dateAdded: "2025-05-08", 
    description: "Comprehensive study guide covering all topics for the midterm examination."
  },
];

export default function LearningMaterials() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState<any>(null);
  const [materialDetailsOpen, setMaterialDetailsOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  
  // Get unique courses for filtering
  const courses = [...new Set(courseMaterials.map(material => material.course))];
  
  // Format date function
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  const downloadMaterial = (material: any) => {
    // Simulate download
    toast({
      title: "Downloading",
      description: `Downloading ${material.title}`,
    });
    
    // In a real app, this would trigger a file download
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: `${material.title} downloaded successfully`,
      });
    }, 1500);
  };
  
  const viewMaterialDetails = (material: any) => {
    setSelectedMaterial(material);
    setMaterialDetailsOpen(true);
  };
  
  // Filter materials based on search and course selection
  const filteredMaterials = courseMaterials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          material.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = selectedCourse ? material.course === selectedCourse : true;
    return matchesSearch && matchesCourse;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Learning Materials</h1>
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-muted-foreground" />
          <span className="text-muted-foreground">
            {courseMaterials.length} materials available
          </span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Course Materials</CardTitle>
          <CardDescription>
            Access study materials and resources for your enrolled courses
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters and search */}
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex gap-2">
              <select 
                className="px-3 py-2 border rounded-md"
                value={selectedCourse || ""}
                onChange={(e) => setSelectedCourse(e.target.value || null)}
              >
                <option value="">All Courses</option>
                {courses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>
            
            <div className="relative flex items-center w-full md:max-w-sm">
              <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search materials..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Materials table */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Date Added</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMaterials.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No materials found matching your search
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMaterials.map((material) => (
                    <TableRow key={material.id}>
                      <TableCell className="font-medium">{material.title}</TableCell>
                      <TableCell>{material.course}</TableCell>
                      <TableCell>{material.type}</TableCell>
                      <TableCell>{material.size}</TableCell>
                      <TableCell>{formatDate(material.dateAdded)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => viewMaterialDetails(material)}
                          >
                            Details
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => downloadMaterial(material)}
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Material details dialog */}
      <Dialog open={materialDetailsOpen} onOpenChange={setMaterialDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Material Details</DialogTitle>
            <DialogDescription>
              Detailed information about the learning material
            </DialogDescription>
          </DialogHeader>
          {selectedMaterial && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-3 gap-2">
                <p className="font-medium">Title:</p>
                <p className="col-span-2">{selectedMaterial.title}</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <p className="font-medium">Course:</p>
                <p className="col-span-2">{selectedMaterial.course}</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <p className="font-medium">Instructor:</p>
                <p className="col-span-2">{selectedMaterial.instructor}</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <p className="font-medium">Date Added:</p>
                <p className="col-span-2">{formatDate(selectedMaterial.dateAdded)}</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <p className="font-medium">Type:</p>
                <p className="col-span-2">{selectedMaterial.type}</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <p className="font-medium">Size:</p>
                <p className="col-span-2">{selectedMaterial.size}</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <p className="font-medium">Description:</p>
                <p className="col-span-2">{selectedMaterial.description}</p>
              </div>
            </div>
          )}
          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setMaterialDetailsOpen(false)}>
              Close
            </Button>
            {selectedMaterial && (
              <Button onClick={() => downloadMaterial(selectedMaterial)}>
                <FileText className="mr-2 h-4 w-4" />
                Download
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
