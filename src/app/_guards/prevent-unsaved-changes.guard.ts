import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileEditComponent } from '../account/profile-edit/profile-edit.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<ProfileEditComponent> {
  canDeactivate(
    component: ProfileEditComponent): boolean{
      if (component.editUserForm?.dirty) {
        return confirm("Are you sure you want to continue? Any usaved changes will be lost!");
      }
      return true;
    }
  }
  

