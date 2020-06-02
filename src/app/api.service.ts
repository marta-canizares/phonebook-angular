import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {tap, catchError} from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Person } from './person';
import { environment} from '../environments/environment';

interface User{
  user: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiURL = environment.API_URL;
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient) { }

  getPersons$() {

    return this.http.get(`${this.apiURL}/api/persons`);
  }

  getPerson$(id: string) {
    return this.http.get<Person>(`${this.apiURL}/api/persons/${id}`);
  }

  addPerson$(person:Person) {

    return this.http.post<Person>(`${this.apiURL}/api/persons`, person)
      .pipe(tap((person: Person) => console.log(`added person: id=${person.id}`)),
            catchError(error => {console.log(error);
                                 return throwError(error); }));
  }

  deletePerson$(id: string) {

    return this.http.delete(`${this.apiURL}/api/persons/${id}`);
  }

  editPerson$(person:Person) {

    return this.http.put<Person>(`${this.apiURL}/api/persons/`, person)
      .pipe(tap((person: Person) => console.log(`edited person: id=${person.id}`)),
            catchError(error => {console.log(error);
                                 return throwError(error); }));
  }

  loginUser$(user: string, password: string): Observable<any> {
     return this.http
      .post<User>(
        `${this.apiURL}/login`,
        { user, password },
        { headers: this.headers }
      )
      .pipe(tap(data => {
        return data;}),
      catchError(error => {console.log(error);
                           return throwError(error); }));
  }
  logoutUser$(){
    return this.http.get(`${this.apiURL}/logout`);
  }

}
