import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { IpAddressHandlerService } from './data-access/ip-address-handler.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnDestroy {
  public destroy = new Subject<void>();

  constructor(private ipAddressHandlerService: IpAddressHandlerService) {}

  ngAfterViewInit() {
    this.ipAddressHandlerService
      .setCurrentInfo()
      .pipe(takeUntil(this.destroy))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
