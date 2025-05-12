
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Settings, Save, Upload, Building, Calendar, Bell, Shield, Paintbrush, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdminSettings() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("general");
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your changes have been successfully saved.",
    });
  };

  const handleLogoUpload = () => {
    toast({
      title: "Logo uploaded",
      description: "Your institution logo has been updated.",
    });
  };

  const handleTestEmail = () => {
    toast({
      title: "Test email sent",
      description: "A test email has been sent to the administrator.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <h1 className="text-3xl font-bold">System Settings</h1>
        <Button onClick={handleSaveSettings}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-1 md:grid-cols-5 mb-8">
          <TabsTrigger value="general">
            <Building className="h-4 w-4 mr-2" />
            Institution
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Paintbrush className="h-4 w-4 mr-2" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="academic">
            <Calendar className="h-4 w-4 mr-2" />
            Academic
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Institution Information</CardTitle>
              <CardDescription>Manage your institution details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Institution Name</label>
                  <Input defaultValue="University of Example" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Website</label>
                  <Input defaultValue="https://example.edu" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input defaultValue="contact@example.edu" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <Input defaultValue="+1 (555) 123-4567" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Address</label>
                <Textarea defaultValue="123 University Avenue, Academic City, AC 12345" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Institution Logo</label>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 bg-muted rounded flex items-center justify-center">
                    <Building className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <Button variant="outline" onClick={handleLogoUpload}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Logo
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Institution Description</label>
                <Textarea 
                  defaultValue="A leading educational institution dedicated to excellence in teaching and research."
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Set administrator contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Admin Name</label>
                  <Input defaultValue="John Smith" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Admin Email</label>
                  <Input defaultValue="admin@example.edu" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Support Email</label>
                  <Input defaultValue="support@example.edu" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Support Phone</label>
                  <Input defaultValue="+1 (555) 987-6543" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
              <CardDescription>Customize system appearance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Dark Mode</h3>
                    <p className="text-xs text-muted-foreground">Enable dark mode interface</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">High Contrast</h3>
                    <p className="text-xs text-muted-foreground">Increase contrast for better accessibility</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Custom Logo</h3>
                    <p className="text-xs text-muted-foreground">Use institution logo</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Color Scheme</CardTitle>
              <CardDescription>Customize the system color scheme</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Primary Color</label>
                  <div className="flex gap-2">
                    <div className="h-10 w-10 rounded-md bg-blue-600"></div>
                    <div className="h-10 w-10 rounded-md bg-green-600"></div>
                    <div className="h-10 w-10 rounded-md bg-purple-600"></div>
                    <div className="h-10 w-10 rounded-md bg-red-600"></div>
                    <div className="h-10 w-10 rounded-md bg-orange-600"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Custom Color</label>
                  <Input type="color" defaultValue="#0066cc" className="h-10 w-full p-1" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Font Family</label>
                <Select defaultValue="inter">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inter">Inter</SelectItem>
                    <SelectItem value="roboto">Roboto</SelectItem>
                    <SelectItem value="opensans">Open Sans</SelectItem>
                    <SelectItem value="lato">Lato</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Login Page</CardTitle>
              <CardDescription>Customize the login page appearance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Background Image</label>
                <div className="flex items-center gap-4">
                  <div className="h-20 w-32 bg-muted rounded flex items-center justify-center overflow-hidden">
                    <div className="h-full w-full bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
                  </div>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Image
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Welcome Message</label>
                <Textarea 
                  defaultValue="Welcome to StudentTrack. Please log in to access your account."
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Show Announcements</h3>
                  <p className="text-xs text-muted-foreground">Display announcements on login page</p>
                </div>
                <Switch defaultChecked={true} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="academic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Academic Year</CardTitle>
              <CardDescription>Configure academic year settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Current Semester</label>
                  <Select defaultValue="spring2025">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spring2025">Spring 2025</SelectItem>
                      <SelectItem value="fall2024">Fall 2024</SelectItem>
                      <SelectItem value="summer2024">Summer 2024</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Start Date</label>
                  <Input type="date" defaultValue="2025-01-15" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">End Date</label>
                  <Input type="date" defaultValue="2025-05-30" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Academic Year</label>
                  <Select defaultValue="2024-2025">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2025-2026">2025-2026</SelectItem>
                      <SelectItem value="2024-2025">2024-2025</SelectItem>
                      <SelectItem value="2023-2024">2023-2024</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Registration Deadline</label>
                  <Input type="date" defaultValue="2025-01-08" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Allow Late Registration</h3>
                  <p className="text-xs text-muted-foreground">Enable registration after deadline</p>
                </div>
                <Switch defaultChecked={true} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Grading System</CardTitle>
              <CardDescription>Configure the institution grading system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Grading Scale</label>
                  <Select defaultValue="letter">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="letter">Letter Grade (A, B, C, D, F)</SelectItem>
                      <SelectItem value="percentage">Percentage (0-100%)</SelectItem>
                      <SelectItem value="gpa">GPA (0.0-4.0)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Passing Grade</label>
                  <Select defaultValue="d">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a">A (90-100%)</SelectItem>
                      <SelectItem value="b">B (80-89%)</SelectItem>
                      <SelectItem value="c">C (70-79%)</SelectItem>
                      <SelectItem value="d">D (60-69%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Show GPA</h3>
                    <p className="text-xs text-muted-foreground">Display student GPA</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Allow Grade Disputes</h3>
                    <p className="text-xs text-muted-foreground">Students can dispute grades</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Attendance Policy</CardTitle>
              <CardDescription>Configure attendance tracking settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Minimum Attendance Required</label>
                <Select defaultValue="75">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="90">90%</SelectItem>
                    <SelectItem value="85">85%</SelectItem>
                    <SelectItem value="80">80%</SelectItem>
                    <SelectItem value="75">75%</SelectItem>
                    <SelectItem value="70">70%</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Automatic Attendance Warning</h3>
                    <p className="text-xs text-muted-foreground">Send notifications when attendance falls below threshold</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Track Class Participation</h3>
                    <p className="text-xs text-muted-foreground">Enable participation tracking</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
              <CardDescription>Configure email notification settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">SMTP Server</label>
                  <Input defaultValue="smtp.example.edu" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">SMTP Port</label>
                  <Input defaultValue="587" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Username</label>
                  <Input defaultValue="notifications@example.edu" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Password</label>
                  <Input type="password" defaultValue="••••••••" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Sender Name</label>
                <Input defaultValue="StudentTrack Notifications" />
              </div>

              <div className="flex justify-end">
                <Button variant="outline" onClick={handleTestEmail}>
                  Test Email Configuration
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure system notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Email Notifications</h3>
                    <p className="text-xs text-muted-foreground">Send notifications via email</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Student Registration Alerts</h3>
                    <p className="text-xs text-muted-foreground">Notify on new student registrations</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Leave Request Notifications</h3>
                    <p className="text-xs text-muted-foreground">Notify on new leave requests</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Grade Update Notifications</h3>
                    <p className="text-xs text-muted-foreground">Notify when grades are updated</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">System Maintenance Alerts</h3>
                    <p className="text-xs text-muted-foreground">Send alerts about system maintenance</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Announcement Settings</CardTitle>
              <CardDescription>Configure system announcements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Default Audience</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="students">Students Only</SelectItem>
                    <SelectItem value="faculty">Faculty Only</SelectItem>
                    <SelectItem value="admin">Administrators Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Enable Announcements</h3>
                  <p className="text-xs text-muted-foreground">Show announcements on dashboard</p>
                </div>
                <Switch defaultChecked={true} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Allow Comments</h3>
                  <p className="text-xs text-muted-foreground">Enable comments on announcements</p>
                </div>
                <Switch defaultChecked={false} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure system security options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
                    <p className="text-xs text-muted-foreground">Require 2FA for admin accounts</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Password Policy</h3>
                    <p className="text-xs text-muted-foreground">Required symbols, numbers, uppercase</p>
                  </div>
                  <Select defaultValue="strong">
                    <SelectTrigger className="w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="strong">Strong</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="basic">Basic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Session Timeout</h3>
                    <p className="text-xs text-muted-foreground">Automatically log out after inactivity</p>
                  </div>
                  <Select defaultValue="30">
                    <SelectTrigger className="w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                      <SelectItem value="240">4 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Access Control</CardTitle>
              <CardDescription>Configure access permissions for user roles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Administrator Access</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="admin-students" defaultChecked={true} />
                      <label htmlFor="admin-students" className="text-sm">Manage Students</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="admin-faculty" defaultChecked={true} />
                      <label htmlFor="admin-faculty" className="text-sm">Manage Faculty</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="admin-classes" defaultChecked={true} />
                      <label htmlFor="admin-classes" className="text-sm">Manage Classes</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="admin-settings" defaultChecked={true} />
                      <label htmlFor="admin-settings" className="text-sm">Manage Settings</label>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Faculty Access</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="faculty-grades" defaultChecked={true} />
                      <label htmlFor="faculty-grades" className="text-sm">Manage Grades</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="faculty-attendance" defaultChecked={true} />
                      <label htmlFor="faculty-attendance" className="text-sm">Manage Attendance</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="faculty-materials" defaultChecked={true} />
                      <label htmlFor="faculty-materials" className="text-sm">Upload Materials</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="faculty-assessment" defaultChecked={true} />
                      <label htmlFor="faculty-assessment" className="text-sm">Create Assessments</label>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Student Access</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="student-materials" defaultChecked={true} />
                      <label htmlFor="student-materials" className="text-sm">Access Materials</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="student-grades" defaultChecked={true} />
                      <label htmlFor="student-grades" className="text-sm">View Grades</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="student-attendance" defaultChecked={true} />
                      <label htmlFor="student-attendance" className="text-sm">View Attendance</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="student-leave" defaultChecked={true} />
                      <label htmlFor="student-leave" className="text-sm">Request Leave</label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Backup & Privacy</CardTitle>
              <CardDescription>Configure data management settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Automatic Backups</h3>
                    <p className="text-xs text-muted-foreground">Schedule regular data backups</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Backup Frequency</h3>
                    <p className="text-xs text-muted-foreground">How often to back up data</p>
                  </div>
                  <Select defaultValue="daily">
                    <SelectTrigger className="w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Data Retention</h3>
                    <p className="text-xs text-muted-foreground">How long to keep student data</p>
                  </div>
                  <Select defaultValue="5years">
                    <SelectTrigger className="w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1year">1 Year</SelectItem>
                      <SelectItem value="3years">3 Years</SelectItem>
                      <SelectItem value="5years">5 Years</SelectItem>
                      <SelectItem value="10years">10 Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Privacy Policy</h3>
                    <p className="text-xs text-muted-foreground">Last updated</p>
                  </div>
                  <div className="text-sm">May 2, 2025</div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline">Download Backup</Button>
                <Button variant="outline">View Audit Logs</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
