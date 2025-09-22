import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Settings, UserPlus, Calendar, Trash2, Edit } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

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

interface AdminPanelProps {
  coaches: Coach[];
  members: Member[];
  workoutTemplates: WorkoutTemplate[];
  onAddCoach: (coach: Omit<Coach, 'id'>) => void;
  onAddMember: (member: Omit<Member, 'id'>) => void;
  onAddWorkoutTemplate: (template: Omit<WorkoutTemplate, 'id'>) => void;
  onDeleteCoach: (id: string) => void;
  onDeleteMember: (id: string) => void;
  onScheduleClass: (classData: any) => void;
}

export function AdminPanel({ 
  coaches, 
  members, 
  workoutTemplates,
  onAddCoach,
  onAddMember,
  onAddWorkoutTemplate,
  onDeleteCoach,
  onDeleteMember,
  onScheduleClass
}: AdminPanelProps) {
  const [newCoach, setNewCoach] = useState({
    name: '',
    email: '',
    specialties: '',
    bio: ''
  });

  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    membershipType: 'standard'
  });

  const [newWorkout, setNewWorkout] = useState({
    name: '',
    type: 'crossfit' as const,
    description: '',
    duration: 60,
    color: '#1e73be'
  });

  const [newClass, setNewClass] = useState({
    templateId: '',
    coachId: '',
    date: '',
    time: '',
    location: 'CrossFit Box',
    capacity: 20
  });

  const handleAddCoach = () => {
    if (!newCoach.name || !newCoach.email) {
      toast.error('Please fill in name and email');
      return;
    }
    
    onAddCoach({
      ...newCoach,
      specialties: newCoach.specialties.split(',').map(s => s.trim()).filter(Boolean)
    });
    
    setNewCoach({ name: '', email: '', specialties: '', bio: '' });
    toast.success('Coach added successfully');
  };

  const handleAddMember = () => {
    if (!newMember.name || !newMember.email) {
      toast.error('Please fill in name and email');
      return;
    }
    
    onAddMember({
      ...newMember,
      joinDate: new Date().toISOString().split('T')[0]
    });
    
    setNewMember({ name: '', email: '', membershipType: 'standard' });
    toast.success('Member added successfully');
  };

  const handleAddWorkout = () => {
    if (!newWorkout.name || !newWorkout.description) {
      toast.error('Please fill in workout name and description');
      return;
    }
    
    onAddWorkoutTemplate(newWorkout);
    setNewWorkout({
      name: '',
      type: 'crossfit',
      description: '',
      duration: 60,
      color: '#1e73be'
    });
    toast.success('Workout template created');
  };

  const handleScheduleClass = () => {
    if (!newClass.templateId || !newClass.coachId || !newClass.date || !newClass.time) {
      toast.error('Please fill in all required fields');
      return;
    }

    const template = workoutTemplates.find(t => t.id === newClass.templateId);
    const coach = coaches.find(c => c.id === newClass.coachId);
    
    if (!template || !coach) {
      toast.error('Invalid template or coach selection');
      return;
    }

    onScheduleClass({
      ...newClass,
      className: template.name,
      instructor: coach.name,
      type: template.type,
      color: template.color,
      endTime: String(parseInt(newClass.time.split(':')[0]) + Math.floor(template.duration / 60)).padStart(2, '0') + ':' + newClass.time.split(':')[1]
    });

    setNewClass({
      templateId: '',
      coachId: '',
      date: '',
      time: '',
      location: 'CrossFit Box',
      capacity: 20
    });
    toast.success('Class scheduled successfully');
  };

  return (
    <div className="p-4 lg:p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Settings className="w-6 h-6 text-primary" />
          <h1>Administration Panel</h1>
        </div>
        <p className="text-muted-foreground">Manage workouts, coaches, and member accounts</p>
      </div>

      <Tabs defaultValue="schedule" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="schedule">Schedule Classes</TabsTrigger>
          <TabsTrigger value="workouts">Workout Templates</TabsTrigger>
          <TabsTrigger value="coaches">Coaches</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Schedule New Class</CardTitle>
              <CardDescription>Create a new class session from your workout templates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="template">Workout Template</Label>
                  <Select value={newClass.templateId} onValueChange={(value) => setNewClass(prev => ({ ...prev, templateId: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select workout template" />
                    </SelectTrigger>
                    <SelectContent>
                      {workoutTemplates.map(template => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name} ({template.type})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="coach">Coach</Label>
                  <Select value={newClass.coachId} onValueChange={(value) => setNewClass(prev => ({ ...prev, coachId: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select coach" />
                    </SelectTrigger>
                    <SelectContent>
                      {coaches.map(coach => (
                        <SelectItem key={coach.id} value={coach.id}>
                          {coach.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input 
                    type="date" 
                    value={newClass.date}
                    onChange={(e) => setNewClass(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input 
                    type="time" 
                    value={newClass.time}
                    onChange={(e) => setNewClass(prev => ({ ...prev, time: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Select value={newClass.location} onValueChange={(value) => setNewClass(prev => ({ ...prev, location: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CrossFit Box">CrossFit Box</SelectItem>
                      <SelectItem value="Main Gym">Main Gym</SelectItem>
                      <SelectItem value="Gym Floor">Gym Floor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input 
                    type="number" 
                    value={newClass.capacity}
                    onChange={(e) => setNewClass(prev => ({ ...prev, capacity: parseInt(e.target.value) }))}
                    min="1"
                    max="50"
                  />
                </div>
              </div>
              <Button onClick={handleScheduleClass} className="w-full">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Class
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workouts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create Workout Template</CardTitle>
              <CardDescription>Define reusable workout templates for scheduling classes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="workout-name">Workout Name</Label>
                  <Input 
                    id="workout-name"
                    value={newWorkout.name}
                    onChange={(e) => setNewWorkout(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., CrossFit WOD, Open Gym"
                  />
                </div>
                <div>
                  <Label htmlFor="workout-type">Type</Label>
                  <Select value={newWorkout.type} onValueChange={(value: 'crossfit' | 'opengym') => setNewWorkout(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="crossfit">CrossFit</SelectItem>
                      <SelectItem value="opengym">Open Gym</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input 
                    id="duration"
                    type="number"
                    value={newWorkout.duration}
                    onChange={(e) => setNewWorkout(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                    min="15"
                    max="120"
                  />
                </div>
                <div>
                  <Label htmlFor="color">Color</Label>
                  <Input 
                    id="color"
                    type="color"
                    value={newWorkout.color}
                    onChange={(e) => setNewWorkout(prev => ({ ...prev, color: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Workout Description</Label>
                <Textarea 
                  id="description"
                  value={newWorkout.description}
                  onChange={(e) => setNewWorkout(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the workout (e.g., 21-15-9 reps for time of: Thrusters, Pull-ups)"
                  rows={3}
                />
              </div>
              <Button onClick={handleAddWorkout} className="w-full">
                Create Workout Template
              </Button>
            </CardContent>
          </Card>

          {/* Existing Templates */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {workoutTemplates.map(template => (
              <Card key={template.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: template.color }}
                      />
                      <Badge variant="secondary">{template.type}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">{template.description}</p>
                  <p className="text-sm">Duration: {template.duration} minutes</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="coaches" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New Coach</CardTitle>
              <CardDescription>Register a new coach account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="coach-name">Full Name</Label>
                  <Input 
                    id="coach-name"
                    value={newCoach.name}
                    onChange={(e) => setNewCoach(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="John Coach"
                  />
                </div>
                <div>
                  <Label htmlFor="coach-email">Email</Label>
                  <Input 
                    id="coach-email"
                    type="email"
                    value={newCoach.email}
                    onChange={(e) => setNewCoach(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="john@resiliente.com"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="specialties">Specialties (comma separated)</Label>
                <Input 
                  id="specialties"
                  value={newCoach.specialties}
                  onChange={(e) => setNewCoach(prev => ({ ...prev, specialties: e.target.value }))}
                  placeholder="CrossFit, Olympic Lifting, Gymnastics"
                />
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio"
                  value={newCoach.bio}
                  onChange={(e) => setNewCoach(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Brief bio about the coach..."
                  rows={3}
                />
              </div>
              <Button onClick={handleAddCoach} className="w-full">
                <UserPlus className="w-4 h-4 mr-2" />
                Add Coach
              </Button>
            </CardContent>
          </Card>

          {/* Existing Coaches */}
          <div className="grid gap-4 md:grid-cols-2">
            {coaches.map(coach => (
              <Card key={coach.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-lg">{coach.name}</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onDeleteCoach(coach.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">{coach.email}</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {coach.specialties.map(specialty => (
                      <Badge key={specialty} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm">{coach.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="members" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New Member</CardTitle>
              <CardDescription>Register a new member account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="member-name">Full Name</Label>
                  <Input 
                    id="member-name"
                    value={newMember.name}
                    onChange={(e) => setNewMember(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <Label htmlFor="member-email">Email</Label>
                  <Input 
                    id="member-email"
                    type="email"
                    value={newMember.email}
                    onChange={(e) => setNewMember(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="jane@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="membership-type">Membership Type</Label>
                  <Select value={newMember.membershipType} onValueChange={(value) => setNewMember(prev => ({ ...prev, membershipType: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={handleAddMember} className="w-full">
                <UserPlus className="w-4 h-4 mr-2" />
                Add Member
              </Button>
            </CardContent>
          </Card>

          {/* Existing Members */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {members.map(member => (
              <Card key={member.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onDeleteMember(member.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-1">{member.email}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant={member.membershipType === 'premium' ? 'default' : 'secondary'}>
                      {member.membershipType}
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      Joined: {new Date(member.joinDate).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}