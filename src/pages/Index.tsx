
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

  useEffect(() => {
    // Load saved preferences
    if (chrome?.storage?.local) {
      chrome.storage.local.get(['selectedTheme', 'timeBasedEnabled'], (result) => {
        if (result.selectedTheme) {
          setSelectedTheme(result.selectedTheme);
        }
        if (result.timeBasedEnabled !== undefined) {
          setTimeBasedEnabled(result.timeBasedEnabled);
        }
      });
    }
  }, []);

  const handleThemeChange = (themeName: string) => {
    setSelectedTheme(themeName);
    
    // Save theme preference
    if (chrome?.storage?.local) {
      chrome.storage.local.set({ selectedTheme: themeName });
    }
    
    // Send message to background script to update theme
    if (chrome?.runtime?.sendMessage) {
      chrome.runtime.sendMessage(
        { type: 'SET_THEME', themeName },
        (response) => {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            return;
          }
          
          toast({
            title: "Theme Updated",
            description: `Switched to ${themeName} theme`,
            duration: 2000,
          });
        }
      );
    }
  };

  const handleTimeBasedToggle = (enabled: boolean) => {
    setTimeBasedEnabled(enabled);
    
    // Save preference
    if (chrome?.storage?.local) {
      chrome.storage.local.set({ timeBasedEnabled: enabled });
    }
    
    toast({
      title: enabled ? "Time-based Themes Enabled" : "Time-based Themes Disabled",
      description: enabled
        ? "Your theme will now change automatically based on time of day"
        : "You can now manually select your theme",
      duration: 2000,
    });
  };

  return (
    <div className="w-[400px] h-[600px] bg-gradient-to-br from-background to-secondary p-6 overflow-y-auto">
      <div className="space-y-6">
        <div className="text-center space-y-2 animate-fadeIn">
          <h1 className="text-2xl font-bold tracking-tight">Theme Switcher</h1>
          <p className="text-sm text-muted-foreground">
            Customize your browser experience based on your mood
          </p>
        </div>

        <TimeBasedSwitch
          enabled={timeBasedEnabled}
          onToggle={handleTimeBasedToggle}
        />

        <div className="grid grid-cols-1 gap-4 animate-slideUp">
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
