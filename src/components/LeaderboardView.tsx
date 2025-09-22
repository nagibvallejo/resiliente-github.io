import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Trophy, Medal, Award, Target } from "lucide-react";

interface LeaderboardEntry {
  id: string;
  athleteName: string;
  result: string;
  isRx: boolean;
  rank: number;
  workoutType: 'fortime' | 'amrap' | 'strength' | 'emom';
}

interface LeaderboardViewProps {
  workoutLogs: any[];
}

export function LeaderboardView({ workoutLogs }: LeaderboardViewProps) {
  // Process actual workout logs to create leaderboard
  const processedLogs = workoutLogs.length > 0 ? workoutLogs : [];
  
  // Group logs by workout and calculate rankings
  const workoutGroups = processedLogs.reduce((groups: any, log: any) => {
    const key = log.workoutId || 'unknown';
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(log);
    return groups;
  }, {});

  // For demo purposes, show mock data when no logs exist
  const mockLeaderboard: LeaderboardEntry[] = [
    {
      id: '1',
      athleteName: 'Alex Johnson',
      result: '8:32',
      isRx: true,
      rank: 1,
      workoutType: 'fortime'
    },
    {
      id: '2',
      athleteName: 'Sarah Miller',
      result: '9:15',
      isRx: true,
      rank: 2,
      workoutType: 'fortime'
    },
    {
      id: '3',
      athleteName: 'Mike Davis',
      result: '9:48',
      isRx: true,
      rank: 3,
      workoutType: 'fortime'
    },
    {
      id: '4',
      athleteName: 'Emily Chen',
      result: '10:22',
      isRx: false,
      rank: 4,
      workoutType: 'fortime'
    },
    {
      id: '5',
      athleteName: 'Chris Wilson',
      result: '11:05',
      isRx: true,
      rank: 5,
      workoutType: 'fortime'
    }
  ];

  // Create leaderboard from actual logs or use mock data
  const createLeaderboard = () => {
    if (processedLogs.length === 0) {
      return {
        workoutName: 'CrossFit WOD - "Fran"',
        workoutDetails: '21-15-9 reps for time of: Thrusters (95/65 lbs), Pull-ups',
        entries: mockLeaderboard
      };
    }

    // Use the most recent workout for leaderboard
    const latestLog = processedLogs[processedLogs.length - 1];
    
    // Convert logs to leaderboard entries and rank them
    const entries = processedLogs
      .filter((log: any) => log.workoutId === latestLog.workoutId)
      .map((log: any) => ({
        id: log.timestamp,
        athleteName: 'You', // In real app, this would be the actual user name
        result: formatResult(log),
        isRx: log.scale === 'rx' || log.scale === 'rxplus',
        rank: 1,
        workoutType: log.workoutType
      }))
      .sort((a: any, b: any) => {
        // Sort by performance (time for fortime, rounds for amrap, weight for strength)
        if (latestLog.workoutType === 'fortime') {
          return parseTime(a.result) - parseTime(b.result);
        } else if (latestLog.workoutType === 'amrap') {
          return parseFloat(b.result) - parseFloat(a.result);
        } else if (latestLog.workoutType === 'strength') {
          return parseFloat(b.result) - parseFloat(a.result);
        }
        return 0;
      })
      .map((entry: any, index: number) => ({
        ...entry,
        rank: index + 1
      }));

    return {
      workoutName: latestLog.workoutName,
      workoutDetails: latestLog.workoutDetails,
      entries: entries.length > 0 ? entries : mockLeaderboard
    };
  };

  const formatResult = (log: any) => {
    if (log.workoutType === 'fortime') {
      return log.time || '0:00';
    } else if (log.workoutType === 'amrap') {
      return log.reps ? `${log.rounds}+${log.reps}` : `${log.rounds || 0}`;
    } else if (log.workoutType === 'strength') {
      return `${log.weight || 0} lbs`;
    }
    return 'N/A';
  };

  const parseTime = (timeStr: string) => {
    const [minutes, seconds] = timeStr.split(':').map(Number);
    return minutes * 60 + seconds;
  };

  const leaderboard = createLeaderboard();

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <Target className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getRankBadgeVariant = (rank: number) => {
    if (rank <= 3) return 'default';
    return 'secondary';
  };

  const getResultLabel = (workoutType: string) => {
    switch (workoutType) {
      case 'fortime':
        return 'Time';
      case 'amrap':
        return 'Rounds + Reps';
      case 'strength':
        return 'Weight';
      case 'emom':
        return 'Completed';
      default:
        return 'Result';
    }
  };

  return (
    <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
      <div className="text-center mb-6">
        <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
        <h2>Today's Leaderboard</h2>
        <p className="text-sm text-muted-foreground">
          {leaderboard.workoutName}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-4 lg:p-6">
              <div className="bg-muted p-3 lg:p-4 rounded-lg mb-4">
                <h3 className="mb-2">{leaderboard.workoutName}</h3>
                <p className="text-sm text-muted-foreground">
                  {leaderboard.workoutDetails}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm uppercase tracking-wide text-muted-foreground">
                    Rankings
                  </h4>
                  <span className="text-sm text-muted-foreground">
                    {getResultLabel(leaderboard.entries[0]?.workoutType || 'fortime')}
                  </span>
                </div>
                
                {leaderboard.entries.map((entry) => (
                  <div
                    key={entry.id}
                    className={`flex items-center justify-between p-3 lg:p-4 rounded-lg ${
                      entry.rank <= 3 ? 'bg-accent' : 'bg-card border'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {getRankIcon(entry.rank)}
                        <Badge variant={getRankBadgeVariant(entry.rank)} className="text-xs">
                          #{entry.rank}
                        </Badge>
                      </div>
                      <div>
                        <p className="font-medium">{entry.athleteName}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant={entry.isRx ? 'default' : 'secondary'} className="text-xs">
                            {entry.isRx ? 'Rx' : 'Scaled'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-lg">{entry.result}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="p-4 lg:p-6">
              <h4 className="mb-3">Your Progress</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Workouts Logged This Week</span>
                  <span className="font-medium">{workoutLogs.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Rx Workouts</span>
                  <span className="font-medium">
                    {workoutLogs.filter(log => log.scale === 'rx' || log.scale === 'rxplus').length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Different Workout Types</span>
                  <span className="font-medium">
                    {new Set(workoutLogs.map(log => log.workoutType)).size}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total Classes Attended</span>
                  <span className="font-medium">{workoutLogs.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}