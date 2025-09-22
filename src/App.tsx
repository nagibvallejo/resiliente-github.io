import { useState } from 'react';
import { ClassCard } from './components/ClassCard';
import { DayNavigation } from './components/DayNavigation';
import { WorkoutLogForm } from './components/WorkoutLogForm';
import { LeaderboardView } from './components/LeaderboardView';
import { LoginView } from './components/LoginView';
import { AdminPanel } from './components/AdminPanel';
import { Logo } from './components/Logo';
import { BottomNavigation } from './components/BottomNavigation';
import { ScrollArea } from './components/ui/scroll-area';
import { CalendarDays, Trophy, BarChart3, LogIn, Settings } from 'lucide-react';
import { Toaster } from './components/ui/sonner';

// Mock fitness class data
const scheduleData = {
  0: [], // Sunday
  1: [ // Monday
    {
      id: 'mon-1',
      time: '07:00',
      endTime: '08:00',
      className: 'CrossFit WOD',
      instructor: 'Sarah Coach',
      location: 'CrossFit Box',
      type: 'crossfit' as const,
      color: '#1e73be',
      capacity: 20,
      booked: 15,
      workoutDescription: '21-15-9 reps for time of: Thrusters (95/65 lbs), Pull-ups'
    },
    {
      id: 'mon-2',
      time: '12:00',
      endTime: '13:00',
      className: 'Open Gym',
      instructor: 'Mike Coach',
      location: 'Gym Floor',
      type: 'opengym' as const,
      color: '#ef4444',
      capacity: 15,
      booked: 12,
      workoutDescription: 'Free access to all gym equipment and space for personal training'
    },
    {
      id: 'mon-3',
      time: '18:00',
      endTime: '19:00',
      className: 'CrossFit Strength',
      instructor: 'Alex Coach',
      location: 'CrossFit Box',
      type: 'crossfit' as const,
      color: '#8b5cf6',
      capacity: 12,
      booked: 8,
      workoutDescription: 'Work up to a 1RM Back Squat, then 3x8 Front Squats at 75%'
    }
  ],
  2: [ // Tuesday
    {
      id: 'tue-1',
      time: '06:30',
      endTime: '07:30',
      className: 'CrossFit WOD',
      instructor: 'Emma Coach',
      location: 'CrossFit Box',
      type: 'crossfit' as const,
      color: '#f59e0b',
      capacity: 16,
      booked: 16,
      workoutDescription: 'For time: 400m Run, 21 KB Swings (24/16kg), 12 Pull-ups, 400m Run'
    },
    {
      id: 'tue-2',
      time: '10:00',
      endTime: '11:00',
      className: 'Open Gym',
      instructor: 'James Coach',
      location: 'Main Gym',
      type: 'opengym' as const,
      color: '#ef4444',
      capacity: 18,
      booked: 14,
      workoutDescription: 'Open access to all equipment - perfect for personal training sessions'
    },
    {
      id: 'tue-3',
      time: '17:30',
      endTime: '18:30',
      className: 'CrossFit Metcon',
      instructor: 'Lisa Coach',
      location: 'CrossFit Box',
      type: 'crossfit' as const,
      color: '#4a9eff',
      capacity: 25,
      booked: 22,
      workoutDescription: '5 Rounds: 200m Run, 10 Burpees, 15 Box Jumps (24/20)'
    }
  ],
  3: [ // Wednesday
    {
      id: 'wed-1',
      time: '07:00',
      endTime: '08:00',
      className: 'CrossFit WOD',
      instructor: 'Sarah Coach',
      location: 'CrossFit Box',
      type: 'crossfit' as const,
      color: '#1e73be',
      capacity: 20,
      booked: 11,
      workoutDescription: '12 Min AMRAP: 9 Deadlifts (155/105 lbs), 12 Push-ups, 15 Air Squats'
    },
    {
      id: 'wed-2',
      time: '19:00',
      endTime: '20:00',
      className: 'Open Gym',
      instructor: 'Alex Coach',
      location: 'Main Gym',
      type: 'opengym' as const,
      color: '#8b5cf6',
      capacity: 12,
      booked: 9,
      workoutDescription: 'Evening open gym session - bring your own workout or ask for coaching tips'
    }
  ],
  4: [ // Thursday
    {
      id: 'thu-1',
      time: '06:00',
      endTime: '07:00',
      className: 'CrossFit AMRAP',
      instructor: 'Robert Coach',
      location: 'CrossFit Box',
      type: 'crossfit' as const,
      color: '#f97316',
      capacity: 20,
      booked: 18,
      workoutDescription: '20 Min AMRAP: 5 Pull-ups, 10 Push-ups, 15 Air Squats'
    },
    {
      id: 'thu-2',
      time: '12:30',
      endTime: '13:30',
      className: 'Open Gym',
      instructor: 'Emma Coach',
      location: 'Main Gym',
      type: 'opengym' as const,
      color: '#ef4444',
      capacity: 15,
      booked: 13,
      workoutDescription: 'Lunch break workout - perfect for quick training sessions'
    },
    {
      id: 'thu-3',
      time: '18:00',
      endTime: '19:00',
      className: 'CrossFit Open',
      instructor: 'Mike Coach',
      location: 'CrossFit Box',
      type: 'crossfit' as const,
      color: '#f59e0b',
      capacity: 16,
      booked: 10,
      workoutDescription: 'CrossFit Open 24.1: 21-18-15-12-9-6-3 reps: Burpees over Box, Box Jump Overs (24/20)'
    }
  ],
  5: [ // Friday
    {
      id: 'fri-1',
      time: '07:30',
      endTime: '08:30',
      className: 'CrossFit WOD',
      instructor: 'Sarah Coach',
      location: 'CrossFit Box',
      type: 'crossfit' as const,
      color: '#1e73be',
      capacity: 20,
      booked: 16,
      workoutDescription: 'Friday Team WOD: Partner up! 100 Wall Balls, 80 KB Swings, 60 Burpees, 40 Pull-ups'
    },
    {
      id: 'fri-2',
      time: '17:00',
      endTime: '18:00',
      className: 'Open Gym',
      instructor: 'Alex Coach',
      location: 'Main Gym',
      type: 'opengym' as const,
      color: '#ef4444',
      capacity: 15,
      booked: 12,
      workoutDescription: 'Friday wind-down session - lighter workouts and recovery focus'
    }
  ],
  6: [] // Saturday
};

// Authentication and user management
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'coach' | 'member';
}

interface Coach {
  id: string;
  name: string;
  email: string;
  specialties: string[];
  bio: string;
}

interface Member {
  id: string;
  name: string;
  email: string;
  membershipType: string;
  joinDate: string;
}

interface WorkoutTemplate {
  id: string;
  name: string;
  type: 'crossfit' | 'opengym';
  description: string;
  duration: number;
  color: string;
}

export default function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookedClasses, setBookedClasses] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<'schedule' | 'log' | 'leaderboard' | 'login' | 'admin'>('schedule');
  const [workoutLogs, setWorkoutLogs] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // Admin data
  const [coaches, setCoaches] = useState<Coach[]>([
    {
      id: 'coach-1',
      name: 'Sarah Coach',
      email: 'sarah@resiliente.com',
      specialties: ['CrossFit', 'Olympic Lifting'],
      bio: 'Certified CrossFit L2 trainer with 5+ years experience'
    },
    {
      id: 'coach-2',
      name: 'Mike Coach',
      email: 'mike@resiliente.com',
      specialties: ['Strength Training', 'Powerlifting'],
      bio: 'Former competitive powerlifter, specializes in strength development'
    },
    {
      id: 'coach-3',
      name: 'Alex Coach',
      email: 'alex@resiliente.com',
      specialties: ['CrossFit', 'Gymnastics'],
      bio: 'Movement specialist with gymnastics background'
    }
  ]);
  
  const [members, setMembers] = useState<Member[]>([
    {
      id: 'member-1',
      name: 'John Doe',
      email: 'john@example.com',
      membershipType: 'premium',
      joinDate: '2024-01-15'
    },
    {
      id: 'member-2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      membershipType: 'standard',
      joinDate: '2024-02-20'
    }
  ]);
  
  const [workoutTemplates, setWorkoutTemplates] = useState<WorkoutTemplate[]>([
    {
      id: 'template-1',
      name: 'CrossFit WOD',
      type: 'crossfit',
      description: '21-15-9 reps for time of: Thrusters (95/65 lbs), Pull-ups',
      duration: 60,
      color: '#1e73be'
    },
    {
      id: 'template-2',
      name: 'CrossFit AMRAP',
      type: 'crossfit',
      description: '20 minute AMRAP: 5 Pull-ups, 10 Push-ups, 15 Air Squats',
      duration: 60,
      color: '#f97316'
    },
    {
      id: 'template-3',
      name: 'Open Gym',
      type: 'opengym',
      description: 'Free access to all gym equipment and space',
      duration: 60,
      color: '#ef4444'
    }
  ]);
  
  const dayOfWeek = currentDate.getDay();
  const todaysClasses = scheduleData[dayOfWeek as keyof typeof scheduleData] || [];

  const handleBookClass = (classId: string) => {
    setBookedClasses(prev => new Set(prev).add(classId));
  };

  const handleCancelClass = (classId: string) => {
    setBookedClasses(prev => {
      const newSet = new Set(prev);
      newSet.delete(classId);
      return newSet;
    });
  };

  const handleWorkoutLog = (logData: any) => {
    setWorkoutLogs(prev => [...prev, logData]);
  };

  // Authentication handlers
  const handleLogin = (email: string, role: 'admin' | 'member') => {
    // Mock login - in real app this would validate credentials
    setCurrentUser({
      id: `user-${Date.now()}`,
      name: role === 'admin' ? 'Admin User' : 'Test User',
      email,
      role
    });
    setActiveTab('schedule');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('login');
  };

  // Admin handlers
  const handleAddCoach = (coachData: Omit<Coach, 'id'>) => {
    const newCoach = {
      ...coachData,
      id: `coach-${Date.now()}`
    };
    setCoaches(prev => [...prev, newCoach]);
  };

  const handleDeleteCoach = (id: string) => {
    setCoaches(prev => prev.filter(coach => coach.id !== id));
  };

  const handleAddMember = (memberData: Omit<Member, 'id'>) => {
    const newMember = {
      ...memberData,
      id: `member-${Date.now()}`
    };
    setMembers(prev => [...prev, newMember]);
  };

  const handleDeleteMember = (id: string) => {
    setMembers(prev => prev.filter(member => member.id !== id));
  };

  const handleAddWorkoutTemplate = (templateData: Omit<WorkoutTemplate, 'id'>) => {
    const newTemplate = {
      ...templateData,
      id: `template-${Date.now()}`
    };
    setWorkoutTemplates(prev => [...prev, newTemplate]);
  };

  const handleScheduleClass = (classData: any) => {
    // Find the template to get the workout description
    const template = workoutTemplates.find(t => t.id === classData.templateId);
    
    // In a real app, this would add the class to the schedule database
    // For demo purposes, we'll add it to the appropriate day in scheduleData
    const classWithDescription = {
      ...classData,
      workoutDescription: template?.description || 'Workout description not available'
    };
    
    console.log('Scheduling class:', classWithDescription);
  };

  const myBookedClassesToday = todaysClasses.filter(cls => bookedClasses.has(cls.id));

  // Create available workouts for logging (booked classes with workout details from admin)
  const availableWorkouts = myBookedClassesToday.map(cls => {
    // Determine workout type based on class name and description
    let workoutType: 'fortime' | 'amrap' | 'strength' | 'emom' = 'fortime';
    
    if (cls.className.includes('AMRAP') || cls.workoutDescription?.toLowerCase().includes('amrap')) {
      workoutType = 'amrap';
    } else if (cls.className.includes('Strength') || cls.workoutDescription?.toLowerCase().includes('strength') || cls.workoutDescription?.toLowerCase().includes('1rm')) {
      workoutType = 'strength';
    } else if (cls.workoutDescription?.toLowerCase().includes('emom')) {
      workoutType = 'emom';
    }
    
    return {
      id: cls.id,
      className: cls.className,
      instructor: cls.instructor,
      location: cls.location,
      time: cls.time,
      workoutType,
      workoutDetails: cls.workoutDescription || 'Workout details not available'
    };
  });

  const renderContent = () => {
    switch (activeTab) {
      case 'schedule':
        return (
          <>
            {/* Header */}
            <div className="bg-primary text-primary-foreground p-4 lg:p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CalendarDays className="w-6 h-6" />
                <div>
                  <h1>Book Classes</h1>
                  {myBookedClassesToday.length > 0 && (
                    <p className="text-sm opacity-90">
                      {myBookedClassesToday.length} booked today
                    </p>
                  )}
                </div>
              </div>
              <div className="lg:hidden">
                <Logo size="sm" showText={false} />
              </div>
            </div>

            {/* Day Navigation */}
            <DayNavigation currentDate={currentDate} onDateChange={setCurrentDate} />

            {/* Classes List */}
            <ScrollArea className="flex-1">
              <div className="p-4 lg:p-6 max-w-4xl mx-auto">
                {todaysClasses.length > 0 ? (
                  <div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {todaysClasses.length} {todaysClasses.length === 1 ? 'class' : 'classes'} available
                    </p>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {todaysClasses.map((classItem) => (
                        <ClassCard
                          key={classItem.id}
                          id={classItem.id}
                          time={classItem.time}
                          endTime={classItem.endTime}
                          className={classItem.className}
                          instructor={classItem.instructor}
                          location={classItem.location}
                          type={classItem.type}
                          color={classItem.color}
                          capacity={classItem.capacity}
                          booked={classItem.booked}
                          isBooked={bookedClasses.has(classItem.id)}
                          workoutDescription={classItem.workoutDescription}
                          onBook={handleBookClass}
                          onCancel={handleCancelClass}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 lg:py-16">
                    <CalendarDays className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-muted-foreground mb-2">No classes available</h3>
                    <p className="text-sm text-muted-foreground">
                      Check back tomorrow for new classes!
                    </p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </>
        );

      case 'log':
        return (
          <ScrollArea className="flex-1">
            <div className="max-w-2xl mx-auto">
              <WorkoutLogForm 
                availableWorkouts={availableWorkouts}
                onSubmit={handleWorkoutLog}
              />
            </div>
          </ScrollArea>
        );

      case 'leaderboard':
        return (
          <ScrollArea className="flex-1">
            <div className="max-w-4xl mx-auto">
              <LeaderboardView workoutLogs={workoutLogs} />
            </div>
          </ScrollArea>
        );

      case 'login':
        return (
          <ScrollArea className="flex-1">
            <LoginView onLogin={handleLogin} />
          </ScrollArea>
        );

      case 'admin':
        if (currentUser?.role !== 'admin') {
          return (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Settings className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-muted-foreground mb-2">Access Denied</h3>
                <p className="text-sm text-muted-foreground">
                  Administrator privileges required
                </p>
              </div>
            </div>
          );
        }
        return (
          <ScrollArea className="flex-1">
            <AdminPanel 
              coaches={coaches}
              members={members}
              workoutTemplates={workoutTemplates}
              onAddCoach={handleAddCoach}
              onAddMember={handleAddMember}
              onAddWorkoutTemplate={handleAddWorkoutTemplate}
              onDeleteCoach={handleDeleteCoach}
              onDeleteMember={handleDeleteMember}
              onScheduleClass={handleScheduleClass}
            />
          </ScrollArea>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      {/* Desktop Sidebar Navigation */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:bg-card lg:border-r lg:border-border">
        <div className="p-6 border-b border-border">
          <Logo size="md" />
        </div>
        
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {[
              // Only show these tabs if user is logged in
              ...(currentUser ? [
                { id: 'schedule' as const, label: 'Book Classes', icon: CalendarDays },
                { id: 'log' as const, label: 'Log Workout', icon: Trophy },
                { id: 'leaderboard' as const, label: 'Leaderboard', icon: BarChart3 },
                ...(currentUser.role === 'admin' ? [{ id: 'admin' as const, label: 'Admin Panel', icon: Settings }] : [])
              ] : []),
              { id: 'login' as const, label: currentUser ? 'Logout' : 'Login', icon: LogIn }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    if (tab.id === 'login' && currentUser) {
                      handleLogout();
                    } else {
                      setActiveTab(tab.id);
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:min-h-screen">
        {renderContent()}
        
        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden">
          <BottomNavigation 
            activeTab={activeTab} 
            onTabChange={setActiveTab}
            currentUser={currentUser}
            onLogout={handleLogout}
          />
        </div>
      </div>
      
      <Toaster />
    </div>
  );
}