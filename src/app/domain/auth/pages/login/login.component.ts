import { AfterViewInit, Component, inject, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from '../../../../core/services/loading.service';
import { AuthApi } from '../../apis/auth.api';
import { GoogleLoginRequest } from '../../interfaces/login.interface';
import { AuthService } from '../../services/auth.service';

declare let google: any;
declare let window: any;

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  providers: [AuthApi, AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements AfterViewInit {
  private service: AuthApi = inject(AuthApi);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private renderer: Renderer2 = inject(Renderer2);
  loading = inject(LoadingService).loading;

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  ngAfterViewInit(): void {
    console.log('window.onGoogleLibraryLoad: ', window.onGoogleLibraryLoad);

    google.accounts.id.initialize({
      client_id: '591385167590-dr8m92q88k6m1j1129f6p8glnsled9fo.apps.googleusercontent.com',
      callback: this.handleCredentialResponse.bind(this),
      auto_select: false,
    });

    google.accounts.id.renderButton(document.getElementById('google-login-button'), { theme: 'outline', size: 'large' });

    google.accounts.id.prompt(); // Also display the One Tap dialog
  }

  handleCredentialResponse(data: GoogleLoginRequest) {
    this.service.loginWithGoogle(data).subscribe({
      next: res => {
        console.log('GOOGLE LOGIN: ', res);
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
