
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

interface Assessment {
  id: string;
  title: string;
  course: string;
  date: string;
  status: "upcoming" | "completed";
  score?: number;
  totalScore: number;
  portions?: string;
}

export default function StudentAssessments() {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Mock API call to fetch assessments
    const fetchAssessments = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 600));
        
        // Mock data
        const mockAssessments: Assessment[] = [
          {
            id: "1",
            title: "Midterm Exam",
            course: "CS101: Introduction to Computer Science",
            date: "2025-06-15",
            status: "upcoming",
            totalScore: 100,
            portions: "Chapters 1-5: Data Structures, Algorithms, Programming Fundamentals"
          },
          {
            id: "2",
            title: "Quiz 2",
            course: "MATH201: Advanced Calculus",
            date: "2025-06-10",
            status: "upcoming",
            totalScore: 20,
            portions: "Integration techniques, Applications of integration"
          },
          {
            id: "3",
            title: "Lab Assessment",
            course: "PHY150: Physics for Engineers",
            date: "2025-05-25",
            status: "completed",
            score: 18,
            totalScore: 20
          },
          {
            id: "4",
            title: "Essay Submission",
            course: "ENG102: Academic Writing",
            date: "2025-05-20",
            status: "completed",
            score: 87,
            totalScore: 100
          },
          {
            id: "5",
            title: "Quiz 1",
            course: "CS101: Introduction to Computer Science",
            date: "2025-05-05",
            status: "completed",
            score: 9,
            totalScore: 10
          }
        ];
        
        setAssessments(mockAssessments);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Failed to load assessments",
          description: "Please try again later",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssessments();
  }, [toast]);

  const upcomingAssessments = assessments.filter(assessment => assessment.status === "upcoming");
  const completedAssessments = assessments.filter(assessment => assessment.status === "completed");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Assessments</h2>
        <p className="text-muted-foreground">
          View your upcoming and past assessments.
        </p>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full max-w-xs grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="pt-4">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader className="pb-3">
                    <div className="h-6 bg-muted rounded w-1/3 mb-2"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-muted rounded w-2/3 mb-4"></div>
                    <div className="h-4 bg-muted rounded w-full"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : upcomingAssessments.length > 0 ? (
            <div className="space-y-4">
              {upcomingAssessments.map((assessment) => (
                <Card key={assessment.id}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between">
                      <CardTitle>{assessment.title}</CardTitle>
                      <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                        {new Date(assessment.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{assessment.course}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Portions:</span>
                        <span className="text-sm">{assessment.portions}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Total Marks:</span>
                        <span className="text-sm">{assessment.totalScore}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No upcoming assessments</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="pt-4">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader className="pb-3">
                    <div className="h-6 bg-muted rounded w-1/3 mb-2"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-muted rounded w-2/3 mb-4"></div>
                    <div className="h-4 bg-muted rounded w-full"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : completedAssessments.length > 0 ? (
            <div className="space-y-4">
              {completedAssessments.map((assessment) => (
                <Card key={assessment.id}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between">
                      <CardTitle>{assessment.title}</CardTitle>
                      <span className="text-sm font-medium bg-muted text-muted-foreground px-3 py-1 rounded-full">
                        {new Date(assessment.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{assessment.course}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Score:</span>
                      <span className="text-sm font-medium">
                        {assessment.score} / {assessment.totalScore}
                        <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                          {Math.round((assessment.score! / assessment.totalScore) * 100)}%
                        </span>
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No completed assessments</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
