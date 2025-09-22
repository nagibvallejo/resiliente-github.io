import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Trophy, Clock, User, MapPin } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface WorkoutLogProps {
  availableWorkouts: {
    id: string;
    className: string;
    instructor: string;
    location: string;
    time: string;
    workoutType: 'fortime' | 'amrap' | 'strength' | 'emom';
    workoutDetails: string;
  }[];
  onSubmit: (logData: any) => void;
}

type WorkoutScale = 'scaled' | 'rx' | 'rxplus';

export function WorkoutLogForm({ availableWorkouts, onSubmit }: WorkoutLogProps) {
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string>('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [rounds, setRounds] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [workoutScale, setWorkoutScale] = useState<WorkoutScale>('rx');
  const [notes, setNotes] = useState('');

  const selectedWorkout = availableWorkouts.find(w => w.id === selectedWorkoutId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedWorkout) {
      toast.error("Please select a workout to log");
      return;
    }

    // Validate based on workout type
    if (selectedWorkout.workoutType === 'fortime' && !minutes && !seconds) {
      toast.error("Please enter a time for this timed workout");
      return;
    }

    if (selectedWorkout.workoutType === 'amrap' && !rounds) {
      toast.error("Please enter the number of rounds completed");
      return;
    }

    if (selectedWorkout.workoutType === 'strength' && !weight) {
      toast.error("Please enter the weight lifted");
      return;
    }

    const logData = {
      workoutId: selectedWorkout.id,
      workoutName: selectedWorkout.className,
      workoutDetails: selectedWorkout.workoutDetails,
      instructor: selectedWorkout.instructor,
      time: selectedWorkout.workoutType === 'fortime' ? 
        `${minutes || '0'}:${seconds?.padStart(2, '0') || '00'}` : undefined,
      rounds: selectedWorkout.workoutType === 'amrap' ? parseInt(rounds) : undefined,
      reps: reps ? parseInt(reps) : undefined,
      weight: weight ? parseFloat(weight) : undefined,
      scale: workoutScale,
      notes,
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString(),
      workoutType: selectedWorkout.workoutType
    };

    onSubmit(logData);
    
    // Reset form
    setSelectedWorkoutId('');
    setMinutes('');
    setSeconds('');
    setRounds('');
    setReps('');
    setWeight('');
    setWorkoutScale('rx');
    setNotes('');

    toast.success("Workout logged successfully!");
  };

  const scaleOptions = [
    { value: 'scaled' as const, label: 'Scaled' },
    { value: 'rx' as const, label: 'Rx' },
    { value: 'rxplus' as const, label: 'Rx+' }
  ];

  if (availableWorkouts.length === 0) {
    return (
      <div className="p-4 lg:p-6">
        <div className="text-center py-8 lg:py-16">
          <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="mb-2">No Workouts Available</h2>
          <p className="text-sm text-muted-foreground mb-4">
            You need to book a class first to log a workout.
          </p>
          <p className="text-sm text-muted-foreground">
            Go to the Classes tab to book today's sessions!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
        <h1>Log Your Workout</h1>
        <p className="text-sm text-muted-foreground">
          Track your performance for today's classes
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Workout Selection */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Select Workout</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Choose from your booked classes</Label>
              <Select value={selectedWorkoutId} onValueChange={setSelectedWorkoutId}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select a workout to log" />
                </SelectTrigger>
                <SelectContent>
                  {availableWorkouts.map((workout) => (
                    <SelectItem key={workout.id} value={workout.id}>
                      <div className="text-left">
                        <div className="font-medium">{workout.className}</div>
                        <div className="text-sm text-muted-foreground">
                          {workout.time} • {workout.instructor}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Show selected workout details */}
            {selectedWorkout && (
              <div className="mt-4 p-3 bg-muted rounded-lg border">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{selectedWorkout.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="w-4 h-4" />
                    <span>{selectedWorkout.instructor}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedWorkout.location}</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t">
                  <p className="text-sm text-muted-foreground mb-1">Workout Details:</p>
                  <p className="text-sm">{selectedWorkout.workoutDetails}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Performance Input - Show based on workout type */}
        {selectedWorkout && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Your Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Time input for timed workouts */}
              {selectedWorkout.workoutType === 'fortime' && (
                <div>
                  <Label>Time to Complete</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1">
                      <Input
                        type="number"
                        placeholder="0"
                        value={minutes}
                        onChange={(e) => setMinutes(e.target.value)}
                        min="0"
                        max="99"
                      />
                      <Label className="text-sm text-muted-foreground mt-1">Minutes</Label>
                    </div>
                    <div className="text-2xl text-muted-foreground">:</div>
                    <div className="flex-1">
                      <Input
                        type="number"
                        placeholder="00"
                        value={seconds}
                        onChange={(e) => setSeconds(e.target.value)}
                        min="0"
                        max="59"
                      />
                      <Label className="text-sm text-muted-foreground mt-1">Seconds</Label>
                    </div>
                  </div>
                </div>
              )}

              {/* Rounds for AMRAP */}
              {selectedWorkout.workoutType === 'amrap' && (
                <div>
                  <Label htmlFor="rounds">Rounds Completed</Label>
                  <Input
                    id="rounds"
                    type="number"
                    placeholder="0"
                    value={rounds}
                    onChange={(e) => setRounds(e.target.value)}
                    min="0"
                    className="mt-2"
                  />
                </div>
              )}

              {/* Additional reps for AMRAP */}
              {selectedWorkout.workoutType === 'amrap' && (
                <div>
                  <Label htmlFor="reps">Additional Reps (optional)</Label>
                  <Input
                    id="reps"
                    type="number"
                    placeholder="0"
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                    min="0"
                    className="mt-2"
                  />
                </div>
              )}

              {/* Weight for strength workouts */}
              {selectedWorkout.workoutType === 'strength' && (
                <div>
                  <Label htmlFor="weight">Weight (lbs)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="0"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    min="0"
                    step="0.5"
                    className="mt-2"
                  />
                </div>
              )}

              {/* Workout Scale */}
              <div>
                <Label>Workout Scale</Label>
                <div className="flex gap-2 mt-3">
                  {scaleOptions.map((option) => (
                    <Button
                      key={option.value}
                      type="button"
                      variant={workoutScale === option.value ? "default" : "outline"}
                      className="flex-1"
                      onClick={() => setWorkoutScale(option.value)}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Notes */}
        {selectedWorkout && (
          <Card>
            <CardContent className="p-4">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="How did it feel? Any modifications? Personal records?"
                className="mt-2"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
              />
            </CardContent>
          </Card>
        )}

        {/* Submit Button */}
        {selectedWorkout && (
          <Button type="submit" className="w-full" size="lg">
            Log Workout
          </Button>
        )}
      </form>
    </div>
  );
}