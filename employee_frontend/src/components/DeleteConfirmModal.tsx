import { AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  employeeName: string;
}

export function DeleteConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  employeeName 
}: DeleteConfirmModalProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="glass-effect shadow-elegant">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center space-x-2 text-destructive">
            <AlertTriangle className="w-5 h-5" />
            <span>Confirm Deletion</span>
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <strong>{employeeName}</strong>? 
            This action cannot be undone and will permanently remove the employee 
            from the system.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button 
            variant="outline" 
            onClick={onClose}
            className="glass-effect"
          >
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            onClick={onConfirm}
            className="shadow-elegant hover:shadow-glow transition-all duration-300"
          >
            Delete Employee
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}