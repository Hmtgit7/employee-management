import { useState, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Users
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { EmployeeModal } from './EmployeeModal';
import { DeleteConfirmModal } from './DeleteConfirmModal';

export interface Employee {
  id: number;
  name: string;
  department: string;
  role: string;
}

// Sample data for demonstration
const initialEmployees: Employee[] = [
  { id: 1, name: 'Kiran', department: 'Physics', role: 'User' },
  { id: 2, name: 'David', department: 'Maths', role: 'Manager' },
  { id: 4, name: 'Robert', department: 'Maths', role: 'User' },
  { id: 6, name: 'Sachin', department: 'Chemistry', role: 'Guest' },
  { id: 7, name: 'Sarah', department: 'Engineering', role: 'Admin' },
  { id: 8, name: 'Michael', department: 'HR', role: 'Manager' },
  { id: 9, name: 'Emma', department: 'Marketing', role: 'User' },
  { id: 10, name: 'John', department: 'IT', role: 'Developer' },
];

type SortField = keyof Employee;
type SortDirection = 'asc' | 'desc' | null;

export function EmployeeTable() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>('id');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [deletingEmployee, setDeleteingEmployee] = useState<Employee | null>(null);
  
  const itemsPerPage = 5;

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : sortDirection === 'desc' ? null : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedEmployees = useMemo(() => {
    let filtered = employees.filter(employee =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortDirection && sortField) {
      filtered.sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortDirection === 'asc' 
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        
        return sortDirection === 'asc' 
          ? (aValue as number) - (bValue as number)
          : (bValue as number) - (aValue as number);
      });
    }

    return filtered;
  }, [employees, searchTerm, sortField, sortDirection]);

  const totalPages = Math.ceil(filteredAndSortedEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEmployees = filteredAndSortedEmployees.slice(startIndex, startIndex + itemsPerPage);

  const handleAddEmployee = (employee: Omit<Employee, 'id'>) => {
    const newId = Math.max(...employees.map(e => e.id)) + 1;
    setEmployees([...employees, { ...employee, id: newId }]);
  };

  const handleEditEmployee = (updatedEmployee: Employee) => {
    setEmployees(employees.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp));
  };

  const handleDeleteEmployee = (id: number) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'default';
      case 'manager':
        return 'secondary';
      case 'developer':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="w-4 h-4" />;
    if (sortDirection === 'asc') return <ArrowUp className="w-4 h-4" />;
    if (sortDirection === 'desc') return <ArrowDown className="w-4 h-4" />;
    return <ArrowUpDown className="w-4 h-4" />;
  };

  return (
    <div className="container mx-auto max-w-7xl p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold gradient-text">Employee Management</h1>
            <p className="text-muted-foreground text-sm sm:text-base">Manage your team members and their information</p>
          </div>
          <Button 
            onClick={() => {
              setEditingEmployee(null);
              setIsModalOpen(true);
            }}
            className="bg-gradient-primary text-primary-foreground shadow-elegant hover:shadow-glow transition-all duration-300 w-full sm:w-auto"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Employee
          </Button>
        </div>

        {/* Search and Stats */}
        <div className="space-y-4">
          {/* Search Bar - Left aligned on mobile, centered on larger screens */}
          <div className="flex justify-start lg:justify-center">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 glass-effect"
              />
            </div>
          </div>
          
          {/* Stats Cards - Left aligned on mobile, centered on larger screens */}
          <div className="flex justify-start lg:justify-center">
            <div className="flex flex-col xs:flex-row gap-3 w-full max-w-sm lg:max-w-none lg:w-auto">
              <Card className="glass-effect shadow-soft flex-1 lg:min-w-[140px] lg:flex-none">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Total</p>
                      <p className="text-lg sm:text-xl font-bold">{employees.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="glass-effect shadow-soft flex-1 lg:min-w-[140px] lg:flex-none">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-primary rounded-full"></div>
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Filtered</p>
                      <p className="text-lg sm:text-xl font-bold">{filteredAndSortedEmployees.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <Card className="glass-effect shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Employee Directory</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-muted/50">
                <tr>
                  {[
                    { key: 'id' as SortField, label: 'ID' },
                    { key: 'name' as SortField, label: 'Name' },
                    { key: 'department' as SortField, label: 'Department' },
                    { key: 'role' as SortField, label: 'Role' },
                  ].map(({ key, label }) => (
                    <th key={key} className="text-left p-4">
                      <Button
                        variant="ghost"
                        onClick={() => handleSort(key)}
                        className="font-semibold hover:bg-transparent"
                      >
                        {label}
                        {getSortIcon(key)}
                      </Button>
                    </th>
                  ))}
                  <th className="text-left p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedEmployees.map((employee, index) => (
                  <tr 
                    key={employee.id} 
                    className={`border-b hover:bg-muted/30 transition-colors ${
                      index % 2 === 0 ? 'bg-background/50' : 'bg-muted/20'
                    }`}
                  >
                    <td className="p-4 font-mono text-sm">{employee.id}</td>
                    <td className="p-4 font-medium">{employee.name}</td>
                    <td className="p-4">{employee.department}</td>
                    <td className="p-4">
                      <Badge variant={getRoleBadgeVariant(employee.role)}>
                        {employee.role}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingEmployee(employee);
                            setIsModalOpen(true);
                          }}
                          className="hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setDeleteingEmployee(employee);
                            setIsDeleteModalOpen(true);
                          }}
                          className="hover:bg-destructive hover:text-destructive-foreground transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between p-4 border-t bg-muted/20">
              <p className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredAndSortedEmployees.length)} of{' '}
                {filteredAndSortedEmployees.length} results
              </p>
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                <span className="text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modals */}
      <EmployeeModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingEmployee(null);
        }}
        onSubmit={editingEmployee ? handleEditEmployee : handleAddEmployee}
        employee={editingEmployee}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeleteingEmployee(null);
        }}
        onConfirm={() => {
          if (deletingEmployee) {
            handleDeleteEmployee(deletingEmployee.id);
            setIsDeleteModalOpen(false);
            setDeleteingEmployee(null);
          }
        }}
        employeeName={deletingEmployee?.name || ''}
      />
    </div>
  );
}