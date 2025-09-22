import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DayNavigationProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function DayNavigation({ currentDate, onDateChange }: DayNavigationProps) {
  const goToPreviousDay = () => {
    const previousDay = new Date(currentDate);
    previousDay.setDate(currentDate.getDate() - 1);
    onDateChange(previousDay);
  };

  const goToNextDay = () => {
    const nextDay = new Date(currentDate);
    nextDay.setDate(currentDate.getDate() + 1);
    onDateChange(nextDay);
  };

  const goToToday = () => {
    onDateChange(new Date());
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <div className="flex items-center justify-between p-4 lg:p-6 bg-card border-b max-w-4xl mx-auto w-full">
      <Button variant="ghost" size="icon" onClick={goToPreviousDay}>
        <ChevronLeft className="w-5 h-5" />
      </Button>
      
      <div className="text-center">
        <button onClick={goToToday} className="flex flex-col items-center">
          <h2 className="mb-1">{days[currentDate.getDay()]}</h2>
          <p className="text-sm text-muted-foreground">
            {months[currentDate.getMonth()]} {currentDate.getDate()}
            {isToday(currentDate) && <span className="ml-2 text-primary">Today</span>}
          </p>
        </button>
      </div>
      
      <Button variant="ghost" size="icon" onClick={goToNextDay}>
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  );
}