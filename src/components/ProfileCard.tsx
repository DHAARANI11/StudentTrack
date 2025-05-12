
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRole } from "@/context/AuthContext";

interface ProfileCardProps {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    avatar?: string;
    department?: string;
    studentId?: string;
    facultyId?: string;
    joinedDate?: string;
  };
}

export function ProfileCard({ user }: ProfileCardProps) {
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getRoleBadgeClass = (role: UserRole) => {
    switch(role) {
      case 'student':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'faculty':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'admin':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const formattedRole = user.role.charAt(0).toUpperCase() + user.role.slice(1);
  const fullName = `${user.firstName} ${user.lastName}`;
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.avatar} alt={fullName} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {getInitials(user.firstName, user.lastName)}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{fullName}</CardTitle>
            <CardDescription className="mt-1 flex items-center gap-2">
              <span 
                className={`text-xs px-2 py-0.5 rounded-full ${getRoleBadgeClass(user.role)}`}
              >
                {formattedRole}
              </span>
              {user.studentId && <span className="text-xs">ID: {user.studentId}</span>}
              {user.facultyId && <span className="text-xs">ID: {user.facultyId}</span>}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Email:</span>
            <span className="font-medium">{user.email}</span>
          </div>
          {user.department && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Department:</span>
              <span className="font-medium">{user.department}</span>
            </div>
          )}
          {user.joinedDate && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Joined:</span>
              <span className="font-medium">{user.joinedDate}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
