import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRequest } from '../models/AuthRequest';
import { StorageKeys } from '../models/StorageKeys';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authRequest: AuthRequest = new AuthRequest();
  authError = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.getFromStorage(StorageKeys.JWT_TOKEN) !== null) {
      this.router.navigate(['/hotels']);
    }
  }

  submitForm(): void {
    this.authService.sign_in(this.authRequest).subscribe({
      next: res => {
        console.log('res: ', res);
        localStorage.setItem(StorageKeys.JWT_TOKEN, res.token!);
        localStorage.setItem(StorageKeys.REFRESH_TOKEN, res.refreshToken!);
        localStorage.setItem(StorageKeys.ROLE, res.role!);
        localStorage.setItem(StorageKeys.USER, JSON.stringify(res.user));
        this.router.navigate(['/hotels']);
      },
      error: err => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          this.authError = true;
        }
      }
    });
  }
}
