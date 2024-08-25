import { Component, inject } from '@angular/core';
import { RoleFormComponent } from '../../components/role-form/role-form.component';
import { RoleService } from '../../services/role.service';
import { RoleCreateRequest } from '../../interfaces/role-create-request';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { RoleListComponent } from '../../components/role-list/role-list.component';
import { AsyncPipe } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { RoleAssignComponent } from '../../components/role-assign/role-assign.component';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [
    RoleFormComponent,
    MatSnackBarModule,
    RoleListComponent,
    RoleAssignComponent,
    AsyncPipe,
    MatSelectModule,
    MatInputModule,
  ],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css',
})
export class RoleComponent {
  roleService = inject(RoleService);
  errorMessage = '';
  role: RoleCreateRequest = {} as RoleCreateRequest;
  matSnackBar = inject(MatSnackBar);
  roles$ = this.roleService.getRoles();

  createRole(role: RoleCreateRequest) {
    this.roleService.createRole(role).subscribe({
      next: (response: { message: string }) => {
        this.roles$ = this.roleService.getRoles(); //TODO
        this.matSnackBar.open('Role created successfully', 'Ok', {
          duration: 3000,
        });
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 400) {
          this.errorMessage = error.error;
        }
      },
    });
  }

  updateRole(): void {
    this.roles$ = this.roleService.getRoles();
  }

  deleteRole(id: string): void {
    this.roleService.deleteRole(id).subscribe({
      next: (response: { message: string }) => {
        this.roles$ = this.roleService.getRoles(); //TODO
        this.matSnackBar.open('Role deleted successfully', 'Close', {
          duration: 5000,
        });
      },
      error: (err: HttpErrorResponse) => {
        if (err.status == 400) {
          this.errorMessage = err.error;
        }
        this.matSnackBar.open(err.message, 'Close', {
          duration: 5000,
        });
      },
    });
  }
}
