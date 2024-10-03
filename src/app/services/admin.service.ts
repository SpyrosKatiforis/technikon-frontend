import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Admin {
  id: number;
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/TechnikonWebApp-1.0-SNAPSHOT/api/admins'; 

  constructor(private http: HttpClient) {}

  // Fetch all admins
  getAllAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(`${this.apiUrl}`);
  }

  // Fetch a single admin by ID
  getAdminById(id: number): Observable<Admin> {
    return this.http.get<Admin>(`${this.apiUrl}/${id}`);
  }

  // Create a new admin
  createAdmin(admin: Admin): Observable<Admin> {
    return this.http.post<Admin>(`${this.apiUrl}`, admin);
  }

  // Update an existing admin
  updateAdmin(id: number, admin: Admin): Observable<Admin> {
    return this.http.put<Admin>(`${this.apiUrl}/${id}`, admin);
  }

  // Delete an admin
  deleteAdmin(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}