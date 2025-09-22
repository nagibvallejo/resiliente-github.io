import { Button } from "./ui/button";
import { CalendarDays, Trophy, BarChart3, LogIn, Settings } from "lucide-react";

interface BottomNavigationProps {
  activeTab: 'schedule' | 'log' | 'leaderboard' | 'login' | 'admin';
  onTabChange: (tab: 'schedule' | 'log' | 'leaderboard' | 'login' | 'admin') => void;
  currentUser?: { role: string } | null;
  onLogout?: () => void;
}

export function BottomNavigation({ activeTab, onTabChange, currentUser, onLogout }: BottomNavigationProps) {
  const tabs = [
    // Only show these tabs if user is logged in
    ...(currentUser ? [
      {
        id: 'schedule' as const,
        label: 'Classes',
        icon: CalendarDays
      },
      {
        id: 'log' as const,
        label: 'Log Workout',
        icon: Trophy
      },
      {
        id: 'leaderboard' as const,
        label: 'Leaderboard',
        icon: BarChart3
      },
      ...(currentUser.role === 'admin' ? [{
        id: 'admin' as const,
        label: 'Admin',
        icon: Settings
      }] : [])
    ] : []),
    {
      id: 'login' as const,
      label: currentUser ? 'Logout' : 'Login',
      icon: LogIn
    }
  ];

  return (
    <div className="border-t bg-card px-4 py-2">
      <div className="flex justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <Button
              key={tab.id}
              variant="ghost"
              size="sm"
              onClick={() => {
                if (tab.id === 'login' && currentUser) {
                  onLogout?.();
                } else {
                  onTabChange(tab.id);
                }
              }}
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs">{tab.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}