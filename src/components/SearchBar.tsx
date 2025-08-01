import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  suggestions?: string[];
}

export const SearchBar = ({ onSearch, placeholder = "नोट्स खोजें...", suggestions = [] }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const popularTopics = [
    "Constitution की main features",
    "Mauryan Empire का history",
    "India ki rivers और geography", 
    "Freedom struggle aur national movement",
    "Indian economy ke basics",
    "General science concepts",
    "Math formulas और tricks",
    "Hindi grammar rules",
    "Geography facts aur maps",
    "Reasoning और logical thinking",
    "Ancient civilization ka overview",
    "Mughal empire ke rulers",
    "Climate change aur environment",
    "Banking system in India",
    "Political science basics"
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length > 0) {
      const filtered = popularTopics.filter(topic => 
        topic.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered.slice(0, 5));
      setShowSuggestions(filtered.length > 0);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setQuery("");
    onSearch("");
    setShowSuggestions(false);
  };

  const selectSuggestion = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="w-4 h-4 text-muted-foreground" />
      </div>
      
      <Input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        onFocus={() => query.length > 0 && setShowSuggestions(true)}
        placeholder={placeholder}
        className="pl-10 pr-10 text-hindi-lg bg-card border-border focus:border-primary"
      />
      
      {query && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="h-auto p-1 hover:bg-transparent"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </Button>
        </div>
      )}

      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
          {filteredSuggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => selectSuggestion(suggestion)}
              className="w-full text-left px-4 py-2 hover:bg-accent hover:text-accent-foreground text-sm transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};