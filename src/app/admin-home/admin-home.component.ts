import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms'; 
import { AdminService, Admin } from '../services/admin.service';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit {
  admins: Admin[] = [];
  newAdmin: Admin = { id: 0, username: '', email: '', password: '' };

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getAdmins();
  }

  getAdmins(): void {
    this.adminService.getAllAdmins().subscribe((data) => {
      this.admins = data;
    });
  }

  
  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.adminService.createAdmin(this.newAdmin).subscribe((createdAdmin) => {
        this.admins.push(createdAdmin);
        form.reset();
      });
    }
  }
}