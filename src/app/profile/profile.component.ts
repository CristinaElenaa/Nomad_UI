import { Component, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UserService } from '../_services/user.service';
import { UserModel } from '../_models/user-model';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewModel } from '../_models/review-model';
import { ReviewService } from '../_services/review.service';
import { Observable, catchError, map, throwError } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnChanges {
  user = new UserModel();
  userReviews : ReviewModel[] = [];
  routeSubscription = new Subscription();
  isReviewed = false;
  loggedUserId= 0;
  
  constructor(private userService: UserService, private route: ActivatedRoute,
              private router: Router, private accountService: AccountService) { 
    
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.user.id = params['id'];
    });

    this.getUserId().subscribe(userId => {
      console.log('User ID:', userId);
      console.log(this.user.id);
      this.loggedUserId = userId;
    });


    this.displayUser(this.user.id).subscribe((result: UserModel) =>
    {
      this.user = result
      console.log(this.user.firstName);
    });
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id'] && changes['id'].currentValue) {
      this.displayUser(changes['id'].currentValue);
    }
  }

  isLoggedIn(): boolean{
    if(this.user.id === this.loggedUserId){
      return true;
    }
    return false;
  }

  public getUserId(): Observable<number> {
    return this.accountService.getCurrentUserId().pipe(
      map(user => {
        if (user) {
          return user.id;
        } else {
          return -1;
        }
      }),
      catchError(error => {
        console.error('An error occurred:', error);
        return throwError(error);
      })
    );
  }

  public displayUser(id: number): Observable<UserModel> {
    return this.userService.getUserById(id)
      .pipe(
        map((result: UserModel) => {
          this.user = result;
          return result;
        })
      );
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
  
  reloadComponent(): void {
    this.router.navigateByUrl('/profile/' + this.user.id);
  }


}
