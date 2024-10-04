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
    propertyType: 'HOUSE', // Default property type
    owner: {} as PropertyOwner  // Add the owner object here
  };

  loggedInOwner!: PropertyOwner;  // Holds the currently logged-in owner

  constructor(private propertyOwnerService: PropertyOwnerService) {}

  ngOnInit(): void {
    this.loadProperties();
    this.getLoggedInOwner();  // Fetch the logged-in owner's info
  }

  getLoggedInOwner(): void {
    this.propertyOwnerService.getOwnerById(1).subscribe((owner) => {
      this.loggedInOwner = owner;  // Assuming 1 is the logged-in owner's ID for now
      this.newProperty.owner = this.loggedInOwner;  // Set the owner for the new property
    });
  }

  loadProperties(): void {
    this.propertyOwnerService.getProperties().subscribe((data) => {
      this.properties = data;
    });
  }

  onSubmit(): void {
    if (this.newProperty.propertyId) {
      // Update existing property
      this.propertyOwnerService.updateProperty(this.newProperty.propertyId, this.newProperty).subscribe({
        next: (updatedProperty) => {
          const index = this.properties.findIndex(p => p.propertyId === updatedProperty.propertyId);
          if (index !== -1) {
            this.properties[index] = updatedProperty;
          }
          this.resetForm();
        },
        error: (error) => console.error('Error updating property:', error)
      });
    } else {
      // Add new property
      this.newProperty.owner = this.loggedInOwner;  // Ensure the owner is set on property
      this.propertyOwnerService.addProperty(this.newProperty).subscribe((property) => {
        this.properties.push(property);
        this.resetForm();
      });
    }
  }

  resetForm(): void {
    this.newProperty = { 
      propertyId: 0, 
      address: '', 
      yearOfConstruction: 2023, 
      propertyType: 'HOUSE',
      owner: this.loggedInOwner  // Keep owner data for future submissions
    };
  }

  editProperty(property: Property): void {
    this.newProperty = { ...property };  // Copy the selected property for editing
  }

  deleteProperty(propertyId: number): void {
    this.propertyOwnerService.deleteProperty(propertyId).subscribe({
      next: () => {
        this.properties = this.properties.filter(property => property.propertyId !== propertyId);
      },
      error: (error) => console.error('Error deleting property:', error)
    });
  }
}