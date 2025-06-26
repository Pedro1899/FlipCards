import { Component, OnInit } from '@angular/core';
import {AiService} from '../../core/services/AI/ai.service'
import {HttpServiceService} from '../../core/services/http/http-service.service'
import {LocalStorageService} from '../../core/services/storage/local-storage.service'
import {Message} from '../../core/models/ai'
import {User} from '../../core/models/user'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false
})
export class DashboardPage implements OnInit {

  constructor(private aiService: AiService,
    private http: HttpServiceService,
    private storage: LocalStorageService
  ) { }
  getMessage:Message | undefined 
  ngOnInit() {
  console.log("dashboard")
 //this.aiService.getOneDeck("Parts of the body").subscribe(
 this.http.test().subscribe(
{
  next: (value) =>{
      console.log("value?", value)
  },
  error : (err)=> {
      console.log("whats the error?", err)
  },
}
  )
/**
 * 
 * this.aiService.sum(10,40).subscribe(item=>{
  console.log("whats the item?", item)
 }) 
 */



  
  }

}
