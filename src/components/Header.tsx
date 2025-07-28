import { Moon, Sun, Menu, Settings, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AdminPanel } from "@/components/AdminPanel";
import { useState } from "react";

interface HeaderProps {
  isDark: boolean;
  onThemeToggle: () => void;
  onMenuClick?: () => void;
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

export const Header = ({ 
  isDark, 
  onThemeToggle, 
  onMenuClick, 
  title = "PET Gyan",
  showBackButton = false,
  onBack 
}: HeaderProps) => {
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  return (
    <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          {showBackButton && onBack ? (
            <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
              ←
            </Button>
          ) : onMenuClick ? (
            <Button variant="ghost" size="sm" onClick={onMenuClick} className="p-2">
              <Menu className="w-5 h-5" />
            </Button>
          ) : null}
          
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-primary font-hindi">
              {title}
            </h1>
            <Badge variant="secondary" className="text-xs px-2 py-0.5">
              UPSSSC PET
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onThemeToggle}
            className="p-2"
          >
            {isDark ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowAdminPanel(true)}
            className="p-2"
          >
            <Shield className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {showAdminPanel && (
        <AdminPanel onClose={() => setShowAdminPanel(false)} />
      )}
    </header>
  );
};