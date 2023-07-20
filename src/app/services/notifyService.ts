import { EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  invokeFirstComponentFunction = new EventEmitter();
  subsVar: Subscription;

  constructor() { }

  // onFirstComponentButtonClick() {
  //   this.invokeFirstComponentFunction.emit();
  // }
  private emitChangeSource = new Subject<any>();
  clientId$ = this.emitChangeSource.asObservable();
  emitChange(change: any) {
    this.emitChangeSource.next(change);
  }
  clientName$ = this.emitChangeSource.asObservable();
  emitChange2(change: any) {
    this.emitChangeSource.next(change);
  }
  languageTpe$ = this.emitChangeSource.asObservable();
  emitChange3(change: any) {
    this.emitChangeSource.next(change);
  }
  regionId$ = this.emitChangeSource.asObservable();
  emitChange4(change: any) {
    this.emitChangeSource.next(change);
  }

}
