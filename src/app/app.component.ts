import { Component } from '@angular/core';
import { IpAddressHandlerService } from './data-access/ip-address-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private ipAddressHandlerService: IpAddressHandlerService) {}

  ngAfterViewInit() {
    this.ipAddressHandlerService.setCurrentInfo();
  }
}
