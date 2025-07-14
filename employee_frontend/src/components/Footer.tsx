import { Heart, Code, Coffee } from 'lucide-react';

export function Footer() {
  return (
    <footer className="glass-effect border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col space-y-3 sm:space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <span>Built with</span>
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
              <span className="hidden xs:inline">using React, TypeScript & Tailwind CSS</span>
              <span className="xs:hidden">React & TypeScript</span>
            </div>
          </div>
          
          <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:items-center sm:space-x-4 lg:space-x-6 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Code className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Full Stack Employee Management</span>
              <span className="sm:hidden">Employee Management</span>
            </div>
            <div className="flex items-center space-x-1">
              <Coffee className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>© 2024 EmployeeHub</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}