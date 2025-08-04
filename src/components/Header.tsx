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
        <div className="flex items-center justify-between p-3 sm:p-2">
        <div className="flex items-center gap-3 sm:gap-2">
          {showBackButton && onBack ? (
            <Button variant="ghost" size="sm" onClick={onBack} className="p-2 h-11 w-11 sm:p-1.5 sm:h-8 sm:w-8 tap-target">
              ←
            </Button>
          ) : onMenuClick ? (
            <Button variant="ghost" size="sm" onClick={onMenuClick} className="p-2 h-11 w-11 sm:p-1.5 sm:h-8 sm:w-8 tap-target">
              <Menu className="w-5 h-5 sm:w-4 sm:h-4" />
            </Button>
          ) : null}
          
          <div className="flex items-center gap-1.5">
            <h1 className="text-base sm:text-lg font-bold text-primary font-hindi leading-tight">
              {title}
            </h1>
            <Badge variant="secondary" className="text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 hidden xs:inline-flex">
              UPSSSC PET
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={onThemeToggle}
            className="p-2 h-11 w-11 sm:p-1.5 sm:h-8 sm:w-8 tap-target"
          >
            {isDark ? (
              <Sun className="w-5 h-5 sm:w-4 sm:h-4" />
            ) : (
              <Moon className="w-5 h-5 sm:w-4 sm:h-4" />
            )}
          </Button>
          
        </div>
      </div>
      
    </header>
  );
};