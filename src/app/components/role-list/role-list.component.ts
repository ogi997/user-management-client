import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Role } from '../../interfaces/role';
import { MatIconModule } from '@angular/material/icon';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.css',
})
export class RoleListComponent {
  @Input({ required: true }) roles!: Role[] | null;
  roleService = inject(RoleService);
  roles$ = this.roleService.getRoles();
  @Output() deleteRoleOutput: EventEmitter<string> = new EventEmitter<string>();

  deleteRole(id: string): void {
    this.deleteRoleOutput.emit(id);
  }
}
