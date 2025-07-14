import { useState } from 'react';
import { Users, Palette, Sun, Moon, Monitor, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { useTheme } from '../hooks/useTheme';

type Theme = 'default' | 'blue' | 'emerald' | 'orange';

export function Navbar() {
  const { theme, setTheme, darkMode, setDarkMode } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const themes = [
    { name: 'Purple', value: 'default', color: 'bg-gradient-to-r from-purple-500 to-purple-600' },
    { name: 'Blue', value: 'blue', color: 'bg-gradient-to-r from-blue-500 to-blue-600' },
    { name: 'Emerald', value: 'emerald', color: 'bg-gradient-to-r from-emerald-500 to-emerald-600' },
    { name: 'Orange', value: 'orange', color: 'bg-gradient-to-r from-orange-500 to-orange-600' },
  ];

  const ThemeControls = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className={`flex items-center ${isMobile ? 'flex-col space-y-4' : 'space-x-3'}`}>
      {/* Theme Selector */}
      <div className={isMobile ? 'w-full' : ''}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size={isMobile ? "default" : "sm"} 
              className={`glass-effect ${isMobile ? 'w-full justify-start' : ''}`}
            >
              <Palette className="w-4 h-4 mr-2" />
              Theme
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="glass-effect">
            {themes.map((t) => (
              <DropdownMenuItem
                key={t.value}
                onClick={() => {
                  setTheme(t.value as Theme);
                  if (isMobile) setIsMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2"
              >
                <div className={`w-4 h-4 rounded ${t.color}`} />
                <span>{t.name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Dark Mode Toggle */}
      <div className={isMobile ? 'w-full' : ''}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size={isMobile ? "default" : "sm"} 
              className={`glass-effect ${isMobile ? 'w-full justify-start' : ''}`}
            >
              {darkMode === 'dark' ? (
                <Moon className="w-4 h-4 mr-2" />
              ) : darkMode === 'light' ? (
                <Sun className="w-4 h-4 mr-2" />
              ) : (
                <Monitor className="w-4 h-4 mr-2" />
              )}
              {isMobile && (
                <span>
                  {darkMode === 'dark' ? 'Dark' : darkMode === 'light' ? 'Light' : 'System'} Mode
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="glass-effect">
            <DropdownMenuItem 
              onClick={() => {
                setDarkMode('light');
                if (isMobile) setIsMobileMenuOpen(false);
              }}
            >
              <Sun className="w-4 h-4 mr-2" />
              Light
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => {
                setDarkMode('dark');
                if (isMobile) setIsMobileMenuOpen(false);
              }}
            >
              <Moon className="w-4 h-4 mr-2" />
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => {
                setDarkMode('system');
                if (isMobile) setIsMobileMenuOpen(false);
              }}
            >
              <Monitor className="w-4 h-4 mr-2" />
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );

  return (
    <nav className="glass-effect border-b shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
              <Users className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold gradient-text">EmployeeHub</h1>
              <p className="text-xs text-muted-foreground">Management System</p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-lg font-bold gradient-text">EmployeeHub</h1>
            </div>
          </div>

          {/* Desktop Theme Controls */}
          <div className="hidden md:flex">
            <ThemeControls />
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="glass-effect"
                >
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="glass-effect shadow-elegant">
                <SheetHeader>
                  <SheetTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-primary" />
                    <span>EmployeeHub Settings</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <ThemeControls isMobile />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}