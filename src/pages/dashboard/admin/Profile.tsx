// app/(dashboard)/admin/profile/page.tsx

"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BadgeCheck, Mail, Phone, MapPin, Github, Linkedin, Upload } from "lucide-react";

export default function AdminProfile() {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileData, setProfileData] = useState({
    firstName: "Jane",
    lastName: "Admin",
    email: "admin@example.com",
    phoneNumber: "+91 9876543210",
    address: "Admin Block, Main Campus",
    role: "System Administrator",
    bio: "Experienced system administrator managing school-wide infrastructure and user access.",
    githubUrl: "https://github.com/adminjane",
    linkedinUrl: "https://linkedin.com/in/adminjane"
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
    updateProfile(profileData);
    toast({
      title: "Profile updated",
      description: "Admin profile updated successfully.",
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Profile</h1>
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
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Admin overview</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <div className="relative mb-6">
              <Avatar className="h-32 w-32">
                <AvatarImage src="https://randomuser.me/api/portraits/women/65.jpg" />
                <AvatarFallback>{profileData.firstName[0]}{profileData.lastName[0]}</AvatarFallback>
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
            <p className="text-muted-foreground mb-3">{profileData.role}</p>
            <div className="flex items-center justify-center space-x-2 mb-2">
              <BadgeCheck className="h-5 w-5 text-primary" />
              <span className="text-sm">Verified Admin</span>
            </div>

            <div className="space-y-2 text-sm text-muted-foreground mt-4">
              <div className="flex items-center justify-center">
                <Mail className="h-4 w-4 mr-2" /> {profileData.email}
              </div>
              <div className="flex items-center justify-center">
                <Phone className="h-4 w-4 mr-2" /> {profileData.phoneNumber}
              </div>
              <div className="flex items-center justify-center">
                <MapPin className="h-4 w-4 mr-2" /> {profileData.address}
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
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Profile Details</CardTitle>
            <CardDescription>Manage admin details</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="details">
              <TabsList className="mb-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="social">Social</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">First Name</label>
                    {isEditing ? (
                      <Input name="firstName" value={profileData.firstName} onChange={handleInputChange} />
                    ) : (
                      <p className="p-2 bg-muted/50 rounded-md">{profileData.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Last Name</label>
                    {isEditing ? (
                      <Input name="lastName" value={profileData.lastName} onChange={handleInputChange} />
                    ) : (
                      <p className="p-2 bg-muted/50 rounded-md">{profileData.lastName}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Email</label>
                    {isEditing ? (
                      <Input name="email" value={profileData.email} onChange={handleInputChange} />
                    ) : (
                      <p className="p-2 bg-muted/50 rounded-md">{profileData.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Phone Number</label>
                    {isEditing ? (
                      <Input name="phoneNumber" value={profileData.phoneNumber} onChange={handleInputChange} />
                    ) : (
                      <p className="p-2 bg-muted/50 rounded-md">{profileData.phoneNumber}</p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium mb-1 block">Address</label>
                    {isEditing ? (
                      <Input name="address" value={profileData.address} onChange={handleInputChange} />
                    ) : (
                      <p className="p-2 bg-muted/50 rounded-md">{profileData.address}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Bio</label>
                  {isEditing ? (
                    <Textarea name="bio" rows={3} value={profileData.bio} onChange={handleInputChange} />
                  ) : (
                    <p className="p-2 bg-muted/50 rounded-md">{profileData.bio}</p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="social" className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">GitHub URL</label>
                  {isEditing ? (
                    <Input name="githubUrl" value={profileData.githubUrl} onChange={handleInputChange} />
                  ) : (
                    <p className="p-2 bg-muted/50 rounded-md">{profileData.githubUrl}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">LinkedIn URL</label>
                  {isEditing ? (
                    <Input name="linkedinUrl" value={profileData.linkedinUrl} onChange={handleInputChange} />
                  ) : (
                    <p className="p-2 bg-muted/50 rounded-md">{profileData.linkedinUrl}</p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
