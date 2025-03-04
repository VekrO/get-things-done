import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from '../../../../core/services/loading.service';
import { AuthApi } from '../../apis/auth.api';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  providers: [AuthApi, AuthService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private service: AuthApi = inject(AuthApi);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  loading = inject(LoadingService).loading;

  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.min(5)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.min(8)]),
  });

  submit() {
    this.loading.set(true);

    this.service.login(this.form.value).subscribe({
      next: res => {
        this.loading.set(false);
        this.authService.saveToken(res.token);
        this.router.navigate(['dashboard']);
      },
      error: err => {
        console.log('ERRO: ', err);
        this.loading.set(false);
      },
    });
  }
}
