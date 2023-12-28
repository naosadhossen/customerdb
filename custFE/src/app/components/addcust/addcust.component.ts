import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addcust',
  templateUrl: './addcust.component.html',
  styleUrls: ['./addcust.component.css']
})
export class AddcustComponent implements OnInit {

  name: String;
  email: String;
  address: String;
  phone: String;
  country: String;

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService) { }
  ngOnInit() {
  }

  onAddCustomerSubmit(){
    const customer = {
      name: this.name,
      email: this.email,
      address: this.address,
      phone: this.phone,
      country: this.country
    }

  // Required Fields
     if(!this.validateService.validateCustomerForm(customer)) {
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }   
  //Add customer
  this.authService.addCustomer(customer).subscribe(result=>{
    if(result.success) {
      this.flashMessage.show('Customer added successfully', {cssClass: 'alert-success', timeout: 3000});
      this.router.navigate(['custinfo']);
    } else {
      this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
      this.router.navigate(['addcust']);
    }
  })
  }
}
