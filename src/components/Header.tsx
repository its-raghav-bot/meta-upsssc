import { Moon, Sun, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
  return (
    <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between p-2">
        <div className="flex items-center gap-2">
          {showBackButton && onBack ? (
            <Button variant="ghost" size="sm" onClick={onBack} className="p-1.5 h-7 w-7">
              ←
            </Button>
          ) : onMenuClick ? (
            <Button variant="ghost" size="sm" onClick={onMenuClick} className="p-1.5 h-7 w-7">
              <Menu className="w-4 h-4" />
            </Button>
          ) : null}
          
          <div className="flex items-center gap-1.5">
            <h1 className="text-lg font-bold text-primary font-hindi">
              {title}
            </h1>
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0.5">
              UPSSSC PET
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={onThemeToggle}
            className="p-1.5 h-7 w-7"
          >
            {isDark ? (
              <Sun className="w-3.5 h-3.5" />
            ) : (
              <Moon className="w-3.5 h-3.5" />
            )}
          </Button>
          
        </div>
      </div>
      
    </header>
  );
};