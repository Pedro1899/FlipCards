import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  company =1
  public apiUrl = 'http://localhost/flipCardAPI/api'; 


  constructor(private http: HttpClient) { }
  // ulkeleri getiriyor

  

  getDeck(): Observable<any>  {
 const parameters={category:1,
                  firstLang:"es",
                  secondLang:"en" }
   
    return this.http.post(`${this.apiUrl}/category-deck.php`, parameters);
  }
}