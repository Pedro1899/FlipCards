import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  public apiUrl = 'http://localhost/flipCardAPI/api'; 


  constructor(private http: HttpClient) { }
  

  getDeck(): Observable<any>  {
 const parameters={category:1,
                  firstLang:"es",
                  secondLang:"en" }
   
    return this.http.post(`${this.apiUrl}/category-deck.php`, parameters);
  }

  getRickMorty(): Observable<any>{
    return this.http.get('https://rickandmortyapi.com/api/character/2')
  }

  register(parameters: {
    name: string;
    surname: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post('http://localhost:8080/api/auth/register', parameters);
  }

  login(parameters:{
    email:string,
    password:string
  }):Observable<any>{
    return   this.http.post('http://localhost:8080/api/auth/login', parameters,
      { withCredentials: true });
  }

  

  test():Observable<any>{
    return   this.http.get('http://localhost:8080/helloWorld');
  }


}