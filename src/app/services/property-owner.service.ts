import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PropertyOwner {
  id: number;
  vatNumber: string;
  username: string;
  email: string;
  name: string;
  surname: string;
  address: string;
  phoneNumber: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class PropertyOwnerService {
  private apiUrl = 'http://localhost:8080/TechnikonWebApp-1.0-SNAPSHOT/api/owners'; 

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
}