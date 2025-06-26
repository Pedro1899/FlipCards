
import { Inject, Injectable } from '@angular/core';
import { map, Observable, from, of } from 'rxjs';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { API_CONFIG, ApiConfig} from '../../config/api.config'
import {ChatCompletionRequest, Message, Choice, getApiResponse} from '../../models/ai'

@Injectable({
  providedIn: 'root'
})


export class AiService {
  constructor( @Inject(API_CONFIG) private config: ApiConfig, private http: HttpClient) { }


  callChatCompletion(content: string): Observable<Message> {
    const endpoint = 'v1/chat/completions';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.config.aiApiKey}`
    });

    const payload: ChatCompletionRequest = {
      model: this.config.aiModel,
      messages: [
        {
          role: 'user',
          content: content
        }
      ]
    };
    return this.http.post<getApiResponse>(`${this.config.aiApiBaseUrl}/${endpoint}`, payload, { headers })
    .pipe(
      map(item=> item.choices[0].message)
    )
      
  }


  getOneDeck(message:string):Observable<string>{
const endpoint ="/deepseek"
const params = new HttpParams().set('message', message);
    return  this.http.get<string>(`${this.config.appApiBaseUrl}${endpoint}`,{params});
  }

  sum(a:number, b:number):Observable<any>{
const endpoint ="/sum"
const params = new HttpParams()
.set('a', a)
.set('b', b);
    return  this.http.get(`${this.config.appApiBaseUrl}${endpoint}`,{params});
  }
}
