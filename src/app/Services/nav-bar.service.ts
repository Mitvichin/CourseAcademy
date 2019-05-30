import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {
  private isVisible = false;
  private shuoldDisplayRegForm = new Subject<boolean>();
  shouldDisplayRegFormObservable = this.shuoldDisplayRegForm.asObservable();

  constructor() { }

  showHideRegForm() {
    this.isVisible = !this.isVisible
    this.shuoldDisplayRegForm.next(this.isVisible);
  }
}
