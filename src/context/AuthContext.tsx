
import { createContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "student" | "faculty" | "admin";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  profilePicture?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  phoneNumber?: string;
  address?: string;
  bio?: string;
  department?: string;
  position?: string;
  website?: string;
}

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signUp: (userData: any) => Promise<void>;
  updateProfile: (profileData: Partial<User>) => Promise<void>;
}

const initialAuthContext: AuthContextType = {
  user: null,
  role: null,
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
  signUp: async () => {},
  updateProfile: async () => {},
};

export const AuthContext = createContext<AuthContextType>(initialAuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check for existing session on load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setRole(parsedUser.role);
      setIsAuthenticated(true);
    }
  }, []);

  // Mock login function
  const login = async (email: string, password: string) => {
    // This would be replaced with a real API call
    if (!email || !password) {
      throw new Error("Please provide both email and password");
    }

    // Mock users
    const mockUsers: Record<string, User> = {
      "student@example.com": {
        id: "1",
        email: "student@example.com",
        firstName: "John",
        lastName: "Doe",
        role: "student",
      },
      "faculty@example.com": {
        id: "2",
        email: "faculty@example.com",
        firstName: "Jane",
        lastName: "Smith",
        role: "faculty",
      },
      "admin@example.com": {
        id: "3",
        email: "admin@example.com",
        firstName: "Admin",
        lastName: "User",
        role: "admin",
      },
    };

    // Check if user exists (mock authentication)
    const user = mockUsers[email];
    if (!user) {
      throw new Error("Invalid email or password");
    }

    // For simplicity, we're not checking passwords in this mock version
    // In a real app, you would validate the password here

    // Save to local storage
    localStorage.setItem("user", JSON.stringify(user));
    
    // Update state
    setUser(user);
    setRole(user.role);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setRole(null);
    setIsAuthenticated(false);
  };

  const signUp = async (userData: any) => {
    // This would be replaced with a real API call
    // For now, just simulate a successful sign-up
    console.log("Sign up data:", userData);
    
    // Create a mock user
    const newUser = {
      id: Date.now().toString(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: "admin" as UserRole,
    };

    // Save to local storage
    localStorage.setItem("user", JSON.stringify(newUser));
    
    // Update state
    setUser(newUser);
    setRole(newUser.role);
    setIsAuthenticated(true);
  };

  const updateProfile = async (profileData: Partial<User>) => {
    if (!user) {
      throw new Error("User is not authenticated");
    }
    
    // Update user data with new profile information
    const updatedUser = {
      ...user,
      ...profileData,
    };
    
    // Save to local storage
    localStorage.setItem("user", JSON.stringify(updatedUser));
    
    // Update state
    setUser(updatedUser);
    
    // In a real app, this would be an API call to update the user profile in the database
    return Promise.resolve();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated,
        login,
        logout,
        signUp,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
