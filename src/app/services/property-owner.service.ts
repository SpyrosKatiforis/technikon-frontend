import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PropertyOwner {
  id: number;
  username: string;
  email: string;
  name: string;
  surname: string;
  vatNumber: string;
  address: string;
  phoneNumber: string;
  password: string;
}

export interface Property {
  propertyId: number;
  address: string;
  yearOfConstruction: number;
  propertyType: string;
  owner?: PropertyOwner; 
}

@Injectable({
  providedIn: 'root',
})
export class PropertyOwnerService {
  private apiUrl = 'http://localhost:8080/TechnikonWebApp-1.0-SNAPSHOT/api/owners';
  private propertyApiUrl = 'http://localhost:8080/TechnikonWebApp-1.0-SNAPSHOT/api/properties';

  constructor(private http: HttpClient) {}

  // Fetch all property owners
  getAllOwners(): Observable<PropertyOwner[]> {
    return this.http.get<PropertyOwner[]>(`${this.apiUrl}`);
  }

  // Fetch a property owner by ID
  getOwnerById(id: number): Observable<PropertyOwner> {
    return this.http.get<PropertyOwner>(`${this.apiUrl}/${id}`);
  }

  // Create a new property owner
  createOwner(owner: PropertyOwner): Observable<PropertyOwner> {
    return this.http.post<PropertyOwner>(`${this.apiUrl}`, owner);
  }

  // Update an existing property owner
  updateOwner(id: number, owner: PropertyOwner): Observable<PropertyOwner> {
    return this.http.put<PropertyOwner>(`${this.apiUrl}/${id}`, owner);
  }

  // Delete a property owner
  deleteOwner(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Login
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  // Fetch all properties of the logged-in owner
  getProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.propertyApiUrl}`);
  }

  // Add a new property
  addProperty(property: Property): Observable<Property> {
    return this.http.post<Property>(`${this.propertyApiUrl}`, property);
  }

  // Update a property
  updateProperty(propertyId: number, property: Property): Observable<Property> {
    return this.http.put<Property>(`${this.propertyApiUrl}/${propertyId}`, property);
  }

  // Delete a property
  deleteProperty(propertyId: number): Observable<void> {
    return this.http.delete<void>(`${this.propertyApiUrl}/${propertyId}`);
  }
}