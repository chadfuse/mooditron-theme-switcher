
import { Switch } from "@/components/ui/switch";
import { Clock } from "lucide-react";

interface TimeBasedSwitchProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

const TimeBasedSwitch = ({ enabled, onToggle }: TimeBasedSwitchProps) => {
  return (
    <div className="flex items-center justify-between p-4 glass rounded-lg">
      <div className="flex items-center space-x-3">
        <Clock className="w-5 h-5 text-primary" />
        <div>
          <h3 className="font-medium">Time-based themes</h3>
          <p className="text-sm text-muted-foreground">
            Automatically switch themes based on time of day
          </p>
        </div>
      </div>
      <Switch checked={enabled} onCheckedChange={onToggle} />
    </div>
  );
};

export default TimeBasedSwitch;
