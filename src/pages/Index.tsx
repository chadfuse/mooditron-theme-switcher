
import { useState, useEffect } from "react";
import ThemeCard from "@/components/ThemeCard";
import TimeBasedSwitch from "@/components/TimeBasedSwitch";
import { useToast } from "@/components/ui/use-toast";

const moodThemes = [
  { name: "Happy", color: "rgb(255, 217, 61)" },
  { name: "Calm", color: "rgb(149, 225, 211)" },
  { name: "Focused", color: "rgb(168, 230, 207)" },
  { name: "Energetic", color: "rgb(255, 107, 107)" },
  { name: "Relaxed", color: "rgb(184, 198, 219)" },
];

const Index = () => {
  const [selectedTheme, setSelectedTheme] = useState("Calm");
  const [timeBasedEnabled, setTimeBasedEnabled] = useState(false);
  const { toast } = useToast();

  const handleThemeChange = (themeName: string) => {
    setSelectedTheme(themeName);
    toast({
      title: "Theme Updated",
      description: `Switched to ${themeName} theme`,
      duration: 2000,
    });
  };

  const handleTimeBasedToggle = (enabled: boolean) => {
    setTimeBasedEnabled(enabled);
    toast({
      title: enabled ? "Time-based Themes Enabled" : "Time-based Themes Disabled",
      description: enabled
        ? "Your theme will now change automatically based on time of day"
        : "You can now manually select your theme",
      duration: 2000,
    });
  };

  useEffect(() => {
    if (timeBasedEnabled) {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) {
        setSelectedTheme("Energetic"); // Morning
      } else if (hour >= 12 && hour < 17) {
        setSelectedTheme("Focused"); // Afternoon
      } else if (hour >= 17 && hour < 22) {
        setSelectedTheme("Relaxed"); // Evening
      } else {
        setSelectedTheme("Calm"); // Night
      }
    }
  }, [timeBasedEnabled]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary p-6">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-2 animate-fadeIn">
          <h1 className="text-4xl font-bold tracking-tight">Theme Switcher</h1>
          <p className="text-muted-foreground">
            Customize your browser experience based on your mood
          </p>
        </div>

        <TimeBasedSwitch
          enabled={timeBasedEnabled}
          onToggle={handleTimeBasedToggle}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-slideUp">
          {moodThemes.map((theme) => (
            <ThemeCard
              key={theme.name}
              name={theme.name}
              color={theme.color}
              isSelected={selectedTheme === theme.name}
              onClick={() => handleThemeChange(theme.name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
