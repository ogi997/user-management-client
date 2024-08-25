import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    RouterLink,
    MatSnackBarModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  hidePassword = true;
  form: FormGroup = new FormGroup({});
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', (Validators.required, Validators.email)],
      password: ['', Validators.required],
    });
  }

  login() {
    this.authService.login(this.form.value).subscribe({
      next: (response) => {
        this.snackBarToast(response.message, 'Close');
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.snackBarToast(error.error.message, 'Close');
      },
    });
  }

  private snackBarToast(message: string, action: string) {
    this.matSnackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'center',
    });
  }
}
