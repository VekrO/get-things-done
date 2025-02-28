import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from '../../../../core/services/loading.service';
import { AuthApi } from '../../apis/auth.api';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  providers: [AuthApi, AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private service: AuthApi = inject(AuthApi);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  loading = inject(LoadingService).loading;

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
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
