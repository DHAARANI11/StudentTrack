
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BadgeCheck, Calendar, Mail, Phone, MapPin, Github, Linkedin, Upload } from "lucide-react";

export default function FacultyProfile() {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    department: "Mathematics",
    position: "Professor",
    officeHours: "Mon, Wed: 10:00 AM - 12:00 PM",
    officeLocation: "Science Building, Room 301",
    phoneNumber: "+1 (555) 123-4567",
    bio: "Professor of Mathematics with over 15 years of teaching experience. Specializing in differential equations and numerical analysis.",
    education: [
      { degree: "Ph.D. in Mathematics", institution: "Stanford University", year: "2005" },
      { degree: "M.S. in Mathematics", institution: "MIT", year: "2001" },
      { degree: "B.S. in Mathematics", institution: "UCLA", year: "1999" }
    ],
    researchInterests: "Differential equations, numerical analysis, mathematical modeling",
    publications: "25+ peer-reviewed publications in leading mathematics journals",
    githubUrl: "https://github.com/johndoe",
    linkedinUrl: "https://linkedin.com/in/johndoe",
    website: "https://johndoe-math.edu",
    address: "123 Faculty Housing, University Campus"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const saveProfile = () => {
    // Simulate API call to update profile
    updateProfile({
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      email: profileData.email,
      phoneNumber: profileData.phoneNumber,
      address: profileData.address,
      githubUrl: profileData.githubUrl,
      linkedinUrl: profileData.linkedinUrl
    });

    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully",
    });
    
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Faculty Profile</h1>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        ) : (
          <div className="space-x-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button onClick={saveProfile}>Save Changes</Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Summary Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Your personal information</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <div className="relative mb-6">
              <Avatar className="h-32 w-32">
                <AvatarImage src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=256&h=256&q=80" />
                <AvatarFallback>{profileData.firstName[0] + profileData.lastName[0]}</AvatarFallback>
              </Avatar>
              {isEditing && (
                <div className="absolute bottom-0 right-0">
                  <label htmlFor="profile-image" className="cursor-pointer">
                    <div className="bg-primary text-primary-foreground rounded-full p-2">
                      <Upload className="h-4 w-4" />
                    </div>
                  </label>
                  <Input 
                    id="profile-image" 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleProfileImageChange}
                  />
                </div>
              )}
            </div>
            
            <h2 className="text-xl font-semibold mb-1">{profileData.firstName} {profileData.lastName}</h2>
            <p className="text-muted-foreground mb-3">{profileData.position}, {profileData.department}</p>
            
            <div className="w-full border-t pt-4 mt-2">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <BadgeCheck className="h-5 w-5 text-primary" />
                <span className="text-sm">Verified Faculty</span>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{profileData.email}</span>
                </div>
                <div className="flex items-center justify-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{profileData.phoneNumber}</span>
                </div>
                <div className="flex items-center justify-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{profileData.officeHours}</span>
                </div>
                <div className="flex items-center justify-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{profileData.officeLocation}</span>
                </div>
              </div>
              
              <div className="flex justify-center space-x-4 mt-6">
                {profileData.githubUrl && (
                  <a href={profileData.githubUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                    <Github className="h-5 w-5" />
                  </a>
                )}
                {profileData.linkedinUrl && (
                  <a href={profileData.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Manage your personal and professional information</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="personal" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="professional">Professional</TabsTrigger>
                <TabsTrigger value="social">Social</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">First Name</label>
                    {isEditing ? (
                      <Input 
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="p-2 bg-muted/50 rounded-md">{profileData.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Last Name</label>
                    {isEditing ? (
                      <Input 
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="p-2 bg-muted/50 rounded-md">{profileData.lastName}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Email</label>
                    {isEditing ? (
                      <Input 
                        name="email"
                        type="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="p-2 bg-muted/50 rounded-md">{profileData.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Phone Number</label>
                    {isEditing ? (
                      <Input 
                        name="phoneNumber"
                        value={profileData.phoneNumber}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="p-2 bg-muted/50 rounded-md">{profileData.phoneNumber}</p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium mb-1 block">Address</label>
                    {isEditing ? (
                      <Input 
                        name="address"
                        value={profileData.address}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="p-2 bg-muted/50 rounded-md">{profileData.address}</p>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="professional" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Department</label>
                    {isEditing ? (
                      <Input 
                        name="department"
                        value={profileData.department}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="p-2 bg-muted/50 rounded-md">{profileData.department}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Position</label>
                    {isEditing ? (
                      <Input 
                        name="position"
                        value={profileData.position}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="p-2 bg-muted/50 rounded-md">{profileData.position}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Office Hours</label>
                    {isEditing ? (
                      <Input 
                        name="officeHours"
                        value={profileData.officeHours}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="p-2 bg-muted/50 rounded-md">{profileData.officeHours}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Office Location</label>
                    {isEditing ? (
                      <Input 
                        name="officeLocation"
                        value={profileData.officeLocation}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="p-2 bg-muted/50 rounded-md">{profileData.officeLocation}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Bio</label>
                  {isEditing ? (
                    <Textarea 
                      name="bio"
                      value={profileData.bio}
                      onChange={handleInputChange}
                      rows={4}
                    />
                  ) : (
                    <p className="p-2 bg-muted/50 rounded-md">{profileData.bio}</p>
                  )}
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Research Interests</label>
                  {isEditing ? (
                    <Input 
                      name="researchInterests"
                      value={profileData.researchInterests}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p className="p-2 bg-muted/50 rounded-md">{profileData.researchInterests}</p>
                  )}
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Publications</label>
                  {isEditing ? (
                    <Textarea 
                      name="publications"
                      value={profileData.publications}
                      onChange={handleInputChange}
                      rows={2}
                    />
                  ) : (
                    <p className="p-2 bg-muted/50 rounded-md">{profileData.publications}</p>
                  )}
                </div>
                
                {profileData.education.map((edu, index) => (
                  <div key={index} className="p-3 bg-muted/30 rounded-md">
                    <div className="font-medium">{edu.degree}</div>
                    <div className="text-sm">{edu.institution}, {edu.year}</div>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="social" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      <Github className="h-4 w-4 inline mr-2" />
                      GitHub Profile URL
                    </label>
                    {isEditing ? (
                      <Input 
                        name="githubUrl"
                        value={profileData.githubUrl}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="p-2 bg-muted/50 rounded-md">
                        {profileData.githubUrl || "Not provided"}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      <Linkedin className="h-4 w-4 inline mr-2" />
                      LinkedIn Profile URL
                    </label>
                    {isEditing ? (
                      <Input 
                        name="linkedinUrl"
                        value={profileData.linkedinUrl}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="p-2 bg-muted/50 rounded-md">
                        {profileData.linkedinUrl || "Not provided"}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Personal/Academic Website
                    </label>
                    {isEditing ? (
                      <Input 
                        name="website"
                        value={profileData.website}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="p-2 bg-muted/50 rounded-md">
                        {profileData.website || "Not provided"}
                      </p>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
