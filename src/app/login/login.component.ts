import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  username = '';
  password = '';
  userType = 'admin';  
  loginError = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (this.userType === 'admin') {
      // Handle admin login logic here
      this.router.navigate(['/admin-dashboard']);
    } else {
      // Handle property owner login logic here
      this.router.navigate(['/property-owner-dashboard']);  
    }
  }
}