import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newheader',
  templateUrl: './newheader.component.html',
  styleUrls: ['./newheader.component.css']
})
export class NewheaderComponent {

  constructor(private auth: AuthService, private router: Router){}
  logout(){
    this.auth.logout();
    this.router.navigate(['/index'])
  }

}


