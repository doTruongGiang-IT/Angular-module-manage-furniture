import { Furniture } from './../../models/furniture.class';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FurnitureService {

  private URL: string = "http://localhost:8080/api/v1/furnitures";

  constructor(private http: HttpClient) { };

  getAllFurniture(): Observable<Furniture[]> {
    return this.http.get<Furniture[]>(this.URL);
  };

  async getAllFurnitureV2() {
    let result = await this.http.get<Furniture[]>(this.URL).toPromise();
    return result;
  }; 

  getFurnitureByID(id: number): Observable<Furniture> {
    return this.http.get<Furniture>(`${this.URL}/${id}`);
  };

  async getFurnitureByIDV2(id: number) {
    let result = this.http.get<Furniture>(`${this.URL}/${id}`).toPromise();
    return result;
  };

  createFurniture(furniture: Furniture): Observable<Furniture> {
    return this.http.post<Furniture>(this.URL, furniture);
  };

  async createFurnitureV2(furniture: Furniture) {
    let result = await this.http.post<Furniture>(this.URL, furniture).toPromise();
    return result;
  };

  updateFurniture(id: number, furniture: Furniture): Observable<Furniture> {
    return this.http.put<Furniture>(`${this.URL}/${id}`, furniture);
  };

  async updateFurnitureV2(id: number, furniture: Furniture) {
    let result = await this.http.put<Furniture>(`${this.URL}/${id}`, furniture).toPromise();
    return result;
  };

  deleteFurniture(id: number): Observable<Furniture> {
    return this.http.delete<Furniture>(`${this.URL}/${id}`);
  };

  async deleteFurnitureV2(id: number) {
    let result = await this.http.delete<Furniture>(`${this.URL}/${id}`).toPromise();
    return result;
  };

}
