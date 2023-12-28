import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-custinfo',
  templateUrl: './custinfo.component.html',
  styleUrls: ['./custinfo.component.css']
})
export class CustinfoComponent implements OnInit {
  customers:Object;
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
    
    this.authService.getCustomer().subscribe(data => {
      this.customers=data;
      //console.log(data);
    },
     err => {
       console.log(err);
       return false;
     });
  }

}
