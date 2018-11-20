import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { EOF } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private sub = new Subject<any>();
  public emitter = this.sub.asObservable();
  display(display, message) {
    this.sub.next({ display, message });
  }
}
