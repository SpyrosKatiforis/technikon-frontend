import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms'; 
import { PropertyOwnerService, PropertyOwner } from '../services/property-owner.service';

@Component({
  selector: 'app-property-owner-home',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './property-owner-home.component.html',
  styleUrls: ['./property-owner-home.component.css'],
})
export class PropertyOwnerHomeComponent implements OnInit {
  propertyOwners: PropertyOwner[] = [];
  newOwner: PropertyOwner = {
    id: 0,
    username: '',
    email: '',
    name: '',
    surname: '',
    password: '',
    vatNumber: '',
    address: '',
    phoneNumber: '',
  };

  constructor(private propertyOwnerService: PropertyOwnerService) {}

  ngOnInit(): void {
    this.getPropertyOwners();
  }

  getPropertyOwners(): void {
    this.propertyOwnerService.getAllOwners().subscribe((data) => {
      this.propertyOwners = data;
    });
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.propertyOwnerService.createOwner(this.newOwner).subscribe((createdOwner) => {
        this.propertyOwners.push(createdOwner);
        form.reset();
      });
    }
  }
}