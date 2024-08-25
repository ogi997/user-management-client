import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Role } from '../../interfaces/role';
import { AuthService } from '../../services/auth.service';
import { RoleService } from '../../services/role.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-role-assign',
  standalone: true,
  imports: [MatIconModule, AsyncPipe, MatInputModule, MatSelectModule],
  templateUrl: './role-assign.component.html',
  styleUrl: './role-assign.component.css',
})
export class RoleAssignComponent {
  authService = inject(AuthService);
  roleService = inject(RoleService);
  matSnackBar = inject(MatSnackBar);
  users$ = this.authService.getAll();
  selectedUser: string = '';
  selectedRole: string = '';

  @Input({required: true}) roles!: Role[] | null;
  @Output() updateRoleOutput: EventEmitter<boolean> = new EventEmitter<boolean>();

  assignRole() {
    this.roleService
      .assignRole(this.selectedUser, this.selectedRole)
      .subscribe({
        next: (response) => {
          this.updateRoleOutput.emit();
          this.matSnackBar.open('Role asigned successfully', 'Close', {
            duration: 5000,
          });
        },
        error: (err: HttpErrorResponse) => {
          this.matSnackBar.open(err.message, 'Close', {
            duration: 5000,
          });
        },
      });
  }
}
