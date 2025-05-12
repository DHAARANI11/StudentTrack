
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

interface Course {
  id: string;
  code: string;
  name: string;
  instructor: string;
  credits: number;
  schedule: string;
  status: "active" | "upcoming" | "completed";
}

export default function StudentCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Mock API call to fetch courses
    const fetchCourses = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock data
        const mockCourses: Course[] = [
          {
            id: "1",
            code: "CS101",
            name: "Introduction to Computer Science",
            instructor: "Dr. Jane Smith",
            credits: 4,
            schedule: "Mon, Wed 10:00-11:30",
            status: "active"
          },
          {
            id: "2",
            code: "MATH201",
            name: "Advanced Calculus",
            instructor: "Prof. Michael Johnson",
            credits: 3,
            schedule: "Tue, Thu 13:00-14:30",
            status: "active"
          },
          {
            id: "3",
            code: "PHY150",
            name: "Physics for Engineers",
            instructor: "Dr. Robert Chen",
            credits: 4,
            schedule: "Mon, Fri 14:00-15:30",
            status: "active"
          },
          {
            id: "4",
            code: "ENG102",
            name: "Academic Writing",
            instructor: "Prof. Sarah Williams",
            credits: 2,
            schedule: "Wed 15:00-17:00",
            status: "active"
          }
        ];
        
        setCourses(mockCourses);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Failed to load courses",
          description: "Please try again later",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [toast]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">My Courses</h2>
        <p className="text-muted-foreground">
          View all your enrolled courses for the current semester.
        </p>
      </div>

      {isLoading ? (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="bg-muted/40 h-32" />
              <CardContent className="p-6">
                <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-muted rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-muted rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Card key={course.id} className="overflow-hidden">
              <CardHeader className="bg-primary/10">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {course.code}
                      <Badge variant={course.status === "active" ? "default" : course.status === "upcoming" ? "secondary" : "outline"}>
                        {course.status}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="text-lg font-medium mt-1 text-foreground">
                      {course.name}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Instructor:</span>
                    <span className="text-sm font-medium">{course.instructor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Credits:</span>
                    <span className="text-sm font-medium">{course.credits}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Schedule:</span>
                    <span className="text-sm font-medium">{course.schedule}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
