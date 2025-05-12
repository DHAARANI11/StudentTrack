
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { BarChart, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useEffect, useState } from "react";

interface AttendanceSummary {
  totalClasses: number;
  attended: number;
  percentage: number;
}

interface CourseAttendance {
  course: string;
  code: string;
  totalClasses: number;
  attended: number;
  percentage: number;
}

export default function StudentAttendance() {
  const [summary, setSummary] = useState<AttendanceSummary | null>(null);
  const [courseAttendance, setCourseAttendance] = useState<CourseAttendance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Mock API call to fetch attendance data
    const fetchAttendance = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data
        const mockCourseAttendance: CourseAttendance[] = [
          {
            course: "Introduction to Computer Science",
            code: "CS101",
            totalClasses: 24,
            attended: 22,
            percentage: 91.67
          },
          {
            course: "Advanced Calculus",
            code: "MATH201",
            totalClasses: 18,
            attended: 16,
            percentage: 88.89
          },
          {
            course: "Physics for Engineers",
            code: "PHY150",
            totalClasses: 20,
            attended: 15,
            percentage: 75
          },
          {
            course: "Academic Writing",
            code: "ENG102",
            totalClasses: 12,
            attended: 10,
            percentage: 83.33
          }
        ];
        
        setCourseAttendance(mockCourseAttendance);
        
        // Calculate summary
        const totalClassesSum = mockCourseAttendance.reduce((sum, course) => sum + course.totalClasses, 0);
        const attendedClassesSum = mockCourseAttendance.reduce((sum, course) => sum + course.attended, 0);
        const overallPercentage = totalClassesSum > 0 
          ? (attendedClassesSum / totalClassesSum) * 100 
          : 0;
        
        setSummary({
          totalClasses: totalClassesSum,
          attended: attendedClassesSum,
          percentage: overallPercentage
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Failed to load attendance data",
          description: "Please try again later",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAttendance();
  }, [toast]);

  const chartData = courseAttendance.map(course => ({
    name: course.code,
    percentage: course.percentage
  }));

  const pieData = [
    { name: "Present", value: summary?.attended || 0 },
    { name: "Absent", value: (summary?.totalClasses || 0) - (summary?.attended || 0) }
  ];

  const COLORS = ["#4ade80", "#fb7185"];

  const getAttendanceStatus = (percentage: number) => {
    if (percentage >= 90) return "Excellent";
    if (percentage >= 75) return "Good";
    if (percentage >= 60) return "Average";
    return "Poor";
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Attendance</h2>
          <p className="text-muted-foreground">
            View your attendance records and statistics.
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-12 bg-muted rounded-full w-full"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Attendance</h2>
        <p className="text-muted-foreground">
          View your attendance records and statistics.
        </p>
      </div>
      
      {summary && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Overall Attendance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {summary.percentage.toFixed(1)}%
                <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                  {getAttendanceStatus(summary.percentage)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {summary.attended} of {summary.totalClasses} classes attended
              </p>
            </CardContent>
          </Card>
          
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Attendance Distribution</CardTitle>
              <CardDescription>
                Present vs Absent classes
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Course Attendance</CardTitle>
          <CardDescription>
            Attendance percentage by course
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="percentage" name="Attendance %" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Attendance Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <table className="w-full caption-bottom">
              <thead>
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-10 px-4 text-left align-middle font-medium">Course</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Code</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Classes Held</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Classes Attended</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Percentage</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {courseAttendance.map((course, index) => (
                  <tr 
                    key={index} 
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    <td className="p-4 align-middle">{course.course}</td>
                    <td className="p-4 align-middle">{course.code}</td>
                    <td className="p-4 align-middle">{course.totalClasses}</td>
                    <td className="p-4 align-middle">{course.attended}</td>
                    <td className="p-4 align-middle">{course.percentage.toFixed(1)}%</td>
                    <td className="p-4 align-middle">
                      <span 
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          course.percentage >= 90 ? "bg-green-100 text-green-800" :
                          course.percentage >= 75 ? "bg-blue-100 text-blue-800" :
                          course.percentage >= 60 ? "bg-yellow-100 text-yellow-800" :
                          "bg-red-100 text-red-800"
                        }`}
                      >
                        {getAttendanceStatus(course.percentage)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
