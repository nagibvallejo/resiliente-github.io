import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Clock, MapPin, User, Users } from "lucide-react";

interface ClassCardProps {
  id: string;
  time: string;
  endTime: string;
  className: string;
  instructor: string;
  location: string;
  type: 'crossfit' | 'opengym';
  color: string;
  capacity: number;
  booked: number;
  isBooked: boolean;
  workoutDescription?: string;
  onBook: (id: string) => void;
  onCancel: (id: string) => void;
}

const typeLabels = {
  crossfit: 'CrossFit',
  opengym: 'Open Gym'
};

export function ClassCard({ 
  id, 
  time, 
  endTime, 
  className, 
  instructor, 
  location, 
  type, 
  color, 
  capacity, 
  booked, 
  isBooked, 
  workoutDescription,
  onBook, 
  onCancel 
}: ClassCardProps) {
  const availableSpots = capacity - booked;
  const isFull = availableSpots === 0;
  const fewSpotsLeft = availableSpots <= 3 && availableSpots > 0;

  const getBookingStatus = () => {
    if (isBooked) return { text: 'Booked', variant: 'default' as const };
    if (isFull) return { text: 'Full', variant: 'secondary' as const };
    if (fewSpotsLeft) return { text: `${availableSpots} left`, variant: 'destructive' as const };
    return { text: `${availableSpots} spots`, variant: 'secondary' as const };
  };

  const bookingStatus = getBookingStatus();

  return (
    <Card className="mb-3 border-l-4" style={{ borderLeftColor: color }}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{time} - {endTime}</span>
          </div>
          <Badge variant="secondary" className="text-xs">
            {typeLabels[type]}
          </Badge>
        </div>
        
        <h3 className="mb-3">{className}</h3>
        
        {workoutDescription && (
          <div className="mb-3 p-3 bg-muted rounded-lg border">
            <p className="text-sm text-muted-foreground mb-1">Today's Workout:</p>
            <p className="text-sm">{workoutDescription}</p>
          </div>
        )}
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="w-4 h-4" />
            <span>{instructor}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{booked}/{capacity} booked</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Badge variant={bookingStatus.variant} className="text-xs">
            {bookingStatus.text}
          </Badge>
          
          {isBooked ? (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onCancel(id)}
              className="text-xs"
            >
              Cancel
            </Button>
          ) : (
            <Button 
              size="sm" 
              onClick={() => onBook(id)}
              disabled={isFull}
              className="text-xs"
            >
              {isFull ? 'Full' : 'Book'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}