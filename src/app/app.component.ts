import { Component } from '@angular/core';
import { UserModel } from './_models/user-model';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nomad';

  constructor(private accountService: AccountService){

  }

  ngOnInit(){
    this.setCurrentUser();
  }

  setCurrentUser(){
    const userModelString: string | null = localStorage.getItem('user');
    if(!userModelString) return;
    const user: UserModel = JSON.parse(userModelString);
    this.accountService.setCurrentUser(user);
  }
}
