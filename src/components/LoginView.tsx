import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { LogIn, Shield, GraduationCap, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { Logo } from "./Logo";

type LoginType = 'student' | 'admin';

interface LoginViewProps {
  onLogin?: (email: string, role: 'admin' | 'member') => void;
}

export function LoginView({ onLogin }: LoginViewProps) {
  const [studentData, setStudentData] = useState({
    email: '',
    password: '',
    showPassword: false
  });
  
  const [adminData, setAdminData] = useState({
    email: '',
    password: '',
    showPassword: false
  });

  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentData.email || !studentData.password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    // Mock login logic
    toast.success("Student login successful!");
    onLogin?.(studentData.email, 'member');
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminData.email || !adminData.password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    // Mock login logic
    toast.success("Administrator login successful!");
    onLogin?.(adminData.email, 'admin');
  };

  const togglePasswordVisibility = (type: LoginType) => {
    if (type === 'student') {
      setStudentData(prev => ({ ...prev, showPassword: !prev.showPassword }));
    } else {
      setAdminData(prev => ({ ...prev, showPassword: !prev.showPassword }));
    }
  };

  return (
    <div className="p-4 lg:p-6 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          <Logo size="lg" showText={false} />
        </div>
        <h1>Sign In</h1>
        <p className="text-sm text-muted-foreground">
          Access your Resiliente account
        </p>
      </div>

      <Tabs defaultValue="student" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="student" className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            Student
          </TabsTrigger>
          <TabsTrigger value="admin" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Administrator
          </TabsTrigger>
        </TabsList>

        {/* Student Login */}
        <TabsContent value="student">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-primary" />
                Student Login
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleStudentLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="student-email">Email</Label>
                  <Input
                    id="student-email"
                    type="email"
                    placeholder="student@example.com"
                    value={studentData.email}
                    onChange={(e) => setStudentData(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="student-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="student-password"
                      type={studentData.showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={studentData.password}
                      onChange={(e) => setStudentData(prev => ({ ...prev, password: e.target.value }))}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                      onClick={() => togglePasswordVisibility('student')}
                    >
                      {studentData.showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Sign In as Student
                </Button>
                
                <div className="text-center">
                  <Button variant="link" size="sm" className="text-xs">
                    Forgot password?
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Admin Login */}
        <TabsContent value="admin">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Administrator Login
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Admin Email</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="admin@fitbox.com"
                    value={adminData.email}
                    onChange={(e) => setAdminData(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="admin-password">Admin Password</Label>
                  <div className="relative">
                    <Input
                      id="admin-password"
                      type={adminData.showPassword ? "text" : "password"}
                      placeholder="Enter admin password"
                      value={adminData.password}
                      onChange={(e) => setAdminData(prev => ({ ...prev, password: e.target.value }))}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                      onClick={() => togglePasswordVisibility('admin')}
                    >
                      {adminData.showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <p className="text-xs text-amber-800">
                    <Shield className="w-3 h-3 inline mr-1" />
                    Administrator access provides full system control
                  </p>
                </div>

                <Button type="submit" className="w-full">
                  Sign In as Administrator
                </Button>
                
                <div className="text-center">
                  <Button variant="link" size="sm" className="text-xs">
                    Contact IT support
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Demo Credentials */}
      <Card className="mt-6">
        <CardContent className="p-4">
          <h4 className="mb-2 text-sm">Demo Credentials</h4>
          <div className="space-y-2 text-xs text-muted-foreground">
            <div>
              <strong>Student:</strong> student@demo.com / password123
            </div>
            <div>
              <strong>Admin:</strong> admin@demo.com / admin123
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}