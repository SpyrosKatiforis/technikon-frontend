import { Component, OnInit } from '@angular/core';
import { AdminService, Admin } from '../services/admin.service';
import { PropertyOwnerService, PropertyOwner } from '../services/property-owner.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  admins: Admin[] = [];
  propertyOwners: PropertyOwner[] = [];

  constructor(
    private adminService: AdminService,
    private propertyOwnerService: PropertyOwnerService
  ) {}

  ngOnInit(): void {
    this.getAdmins();
    this.getPropertyOwners();
  }

  // Fetch all admins
  getAdmins(): void {
    this.adminService.getAllAdmins().subscribe((data) => {
      this.admins = data;
    });
  }

  // Fetch all property owners
  getPropertyOwners(): void {
    this.propertyOwnerService.getAllOwners().subscribe((data) => {
      this.propertyOwners = data;
    });
  }

  // Delete an admin by ID
  deleteAdmin(id: number): void {
    this.adminService.deleteAdmin(id).subscribe({
      next: () => {
        this.admins = this.admins.filter(admin => admin.id !== id);
      },
      error: (error) => console.error('Error deleting admin:', error)
    });
  }

  // Delete a property owner by ID
  deleteOwner(id: number): void {
    this.propertyOwnerService.deleteOwner(id).subscribe({
      next: () => {
        this.propertyOwners = this.propertyOwners.filter(owner => owner.id !== id);
      },
      error: (error) => console.error('Error deleting property owner:', error)
    });
  }
}
