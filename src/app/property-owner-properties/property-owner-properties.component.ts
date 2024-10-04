import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common'; 
import { PropertyOwnerService, PropertyOwner, Property } from '../services/property-owner.service';

@Component({
  selector: 'app-property-owner-properties',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './property-owner-properties.component.html',
  styleUrls: ['./property-owner-properties.component.css'],
})
export class PropertyOwnerPropertiesComponent implements OnInit {
  properties: Property[] = [];
  newProperty: Property = {
    propertyId: 0,
    address: '',
    yearOfConstruction: 2023,
    propertyType: 'HOUSE',
    owner: {} as PropertyOwner
  };

  loggedInOwner!: PropertyOwner;

  constructor(private propertyOwnerService: PropertyOwnerService) {}

  ngOnInit(): void {
    this.loadProperties();
    this.getLoggedInOwner(); // Mock method to get the logged-in owner
  }

  getLoggedInOwner(): void {
    // Assuming owner ID is 1 for demo purposes
    this.propertyOwnerService.getOwnerById(1).subscribe((owner) => {
      this.loggedInOwner = owner;
      this.newProperty.owner = this.loggedInOwner;
    });
  }

  loadProperties(): void {
    this.propertyOwnerService.getProperties().subscribe((data) => {
      this.properties = data;
    });
  }

  onSubmit(): void {
    if (this.newProperty.propertyId) {
      // If propertyId is present, update the existing property
      this.propertyOwnerService.updateProperty(this.newProperty.propertyId, this.newProperty).subscribe({
        next: (updatedProperty) => {
          const index = this.properties.findIndex(p => p.propertyId === updatedProperty.propertyId);
          if (index !== -1) {
            this.properties[index] = updatedProperty; // Update the property in the list
          }
          this.resetForm();
        },
        error: (error) => console.error('Error updating property:', error)
      });
    } else {
      // If no propertyId, create a new property
      this.propertyOwnerService.addProperty(this.newProperty).subscribe((property) => {
        this.properties.push(property);
        this.resetForm();
      });
    }
  }
  

  deleteProperty(propertyId: number): void {
    if (!propertyId) {
      console.error('Property ID is undefined.');
      return;
    }

    this.propertyOwnerService.deleteProperty(propertyId).subscribe({
      next: () => {
        this.properties = this.properties.filter(property => property.propertyId !== propertyId);
        console.log('Property deleted successfully');
      },
      error: (error) => {
        console.error('Error deleting property:', error);
      }
    });
  }

  editProperty(property: Property): void {
    // Set the form fields with the selected property’s data for editing
    this.newProperty = { ...property }; // Creates a shallow copy of the property object
  }
  

  resetForm(): void {
    this.newProperty = { 
      propertyId: 0, 
      address: '', 
      yearOfConstruction: 2023, 
      propertyType: 'HOUSE',
      owner: this.loggedInOwner
    };
  }
}
