import { useState, useEffect } from 'react';
import { X, User, Building2, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter 
} from './ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from './ui/select';
import { Employee } from './EmployeeTable';

interface EmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (employee: Employee | Omit<Employee, 'id'>) => void;
  employee?: Employee | null;
}

const departments = [
  'Engineering',
  'HR',
  'Marketing',
  'Sales',
  'Finance',
  'Operations',
  'IT',
  'Physics',
  'Maths',
  'Chemistry'
];

const roles = [
  'Admin',
  'Manager',
  'Developer',
  'User',
  'Guest',
  'Analyst',
  'Designer',
  'Lead'
];

export function EmployeeModal({ isOpen, onClose, onSubmit, employee }: EmployeeModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    role: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        department: employee.department,
        role: employee.role
      });
    } else {
      setFormData({
        name: '',
        department: '',
        role: ''
      });
    }
    setErrors({});
  }, [employee, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.department) {
      newErrors.department = 'Department is required';
    }

    if (!formData.role) {
      newErrors.role = 'Role is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (employee) {
      onSubmit({ ...employee, ...formData });
    } else {
      onSubmit(formData);
    }
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-effect shadow-elegant max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <User className="w-5 h-5 text-primary" />
            <span>{employee ? 'Edit Employee' : 'Add New Employee'}</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Full Name</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter employee name"
                className={`glass-effect ${errors.name ? 'border-destructive' : ''}`}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            {/* Department Field */}
            <div className="space-y-2">
              <Label htmlFor="department" className="flex items-center space-x-2">
                <Building2 className="w-4 h-4" />
                <span>Department</span>
              </Label>
              <Select 
                value={formData.department} 
                onValueChange={(value) => handleInputChange('department', value)}
              >
                <SelectTrigger className={`glass-effect ${errors.department ? 'border-destructive' : ''}`}>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent className="glass-effect">
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.department && (
                <p className="text-sm text-destructive">{errors.department}</p>
              )}
            </div>

            {/* Role Field */}
            <div className="space-y-2">
              <Label htmlFor="role" className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Role</span>
              </Label>
              <Select 
                value={formData.role} 
                onValueChange={(value) => handleInputChange('role', value)}
              >
                <SelectTrigger className={`glass-effect ${errors.role ? 'border-destructive' : ''}`}>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="glass-effect">
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="text-sm text-destructive">{errors.role}</p>
              )}
            </div>
          </div>

          <DialogFooter className="space-x-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="glass-effect"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-gradient-primary text-primary-foreground shadow-elegant hover:shadow-glow transition-all duration-300"
            >
              {employee ? 'Update Employee' : 'Add Employee'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}