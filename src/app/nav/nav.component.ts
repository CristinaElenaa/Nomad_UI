import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import {
  Collapse,
  Dropdown,
  Ripple,
  initTE,
} from "tw-elements";
import { AccountService } from '../_services/account.service';
import { UserModel } from '../_models/user-model';
import { Observable, catchError, map, of, throwError } from 'rxjs';


initTE({ Collapse, Dropdown, Ripple });
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isDropdownOpen = false;
  userId = 0;
  // currentUser$: Observable<UserModel | null> = of(null);

  constructor(public accountService: AccountService, private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {

    document.addEventListener('click', this.onDocumentClick.bind(this));

    this.getUserId().subscribe(userId => {
      console.log('User ID:', userId);
      this.userId = userId;
    });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  onDocumentClick(event: MouseEvent) {
    const dropdownElement = this.elementRef.nativeElement;
    const isOutsideDropdown = !dropdownElement.contains(event.target as Node);
  
    if (isOutsideDropdown) {
      if (this.isDropdownOpen) {
        this.toggleDropdown();
      }
    }
  }
  
  getCurrentUser(){
    this.accountService.currentUser$.subscribe({
      error: error => console.log(error)
    })
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

  logout(){
    this.accountService.logout();
  }

}
