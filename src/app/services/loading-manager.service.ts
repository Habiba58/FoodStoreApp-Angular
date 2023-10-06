import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingManagerService {
  private isLoadingSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  constructor() {}
  showLoading() {
    this.isLoadingSubject.next(true);
  }
  hideLoading() {
    this.isLoadingSubject.next(false);
  }
  get isLoading() {
    return this.isLoadingSubject.asObservable();
  }
}
