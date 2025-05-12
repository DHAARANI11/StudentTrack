
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { UserRole } from "@/context/AuthContext";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [role, setRole] = useState<UserRole>("student");
   const [role, setRole] = useState<'student' | 'faculty' | 'admin'>('student');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
      
      // Navigate based on role
      if (role === "student") {
        navigate("/student");
      } else if (role === "faculty") {
        navigate("/faculty");
      } else {
        navigate("/admin");
      }
      
      toast({
        title: "Sign in successful!",
        description: `Welcome back, ${email}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Sign in failed",
        description: error instanceof Error ? error.message : "Invalid credentials",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // For demo purposes - populate with test accounts
  const fillTestAccount = (selectedRole: UserRole) => {
    setRole(selectedRole);
    if (selectedRole === "student") {
      setEmail("student@example.com");
    } else if (selectedRole === "faculty") {
      setEmail("faculty@example.com");
    } else {
      setEmail("admin@example.com");
    }
    setPassword("password");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-muted/30">
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="role" className="text-sm font-medium">
                  I am a
                </label>
                <Select
                  value={role}
                  onValueChange={(value) => fillTestAccount(value as UserRole)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="faculty">Faculty</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <a href="#" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
          {role === "admin" && (
          <div className="text-sm text-muted-foreground text-center">
            Don't have an account?{" "}
            <a
              onClick={() => navigate("/signup")}
              className="text-primary hover:underline cursor-pointer"
            >
              Sign up
            </a>
          </div>
        )}
            
            <div className="text-xs text-muted-foreground text-center">
              By signing in, you agree to our{" "}
              <a href="#" className="underline hover:text-foreground">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="underline hover:text-foreground">
                Privacy Policy
              </a>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
