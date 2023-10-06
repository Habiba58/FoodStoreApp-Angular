import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { food } from '../shared/models/food';
import { Observable, filter } from 'rxjs';
import { tags } from '../shared/models/tags';
import { userModel } from '../shared/models/user';
@Injectable({
  providedIn: 'root',
})
export class FoodManagerService {
  httpOptions;
  APILink: string = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
  }
  getAllFood(): Observable<food[]> {
    return this.httpClient.get<food[]>(`${this.APILink}/food`);
  }
  getFoodByID(foodID: number): Observable<food> {
    return this.httpClient.get<food>(`${this.APILink}/food/${foodID}`);
  }
  getFoodByFoodCategory(foodCategory: string): Observable<food[]> {
    foodCategory = foodCategory.toLowerCase();
    return this.httpClient.get<food[]>(
      `${this.APILink}/food?foodCategory=${foodCategory}`
    );
  }
  getAllTags(): Observable<tags[]> {
    return this.httpClient.get<tags[]>(`${this.APILink}/tags`);
  }
  getAllUsers(): Observable<userModel[]> {
    return this.httpClient.get<userModel[]>(`${this.APILink}/users`);
  }
  getUserByID(userID: number): Observable<userModel> {
    return this.httpClient.get<userModel>(`${this.APILink}/users/${userID}`);
  }
  addNewUser(newUser: userModel): Observable<userModel> {
    return this.httpClient.post<userModel>(
      `${this.APILink}/users`,
      JSON.stringify(newUser),
      this.httpOptions
    );
  }
  
}
