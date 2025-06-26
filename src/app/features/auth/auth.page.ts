

import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpServiceService } from '../../core/services/http/http-service.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: false
})


export class AuthPage implements OnInit {
  currentRoute: any;

  constructor(
    private http: HttpServiceService,
    private router: Router
  ) { }

  ngOnInit() {

  }





}

