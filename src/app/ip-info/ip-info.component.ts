import { Component } from '@angular/core';
import { IpAddressHandlerService } from '../data-access/ip-address-handler.service';

@Component({
  selector: 'app-ip-info',
  templateUrl: './ip-info.component.html',
  styleUrls: ['./ip-info.component.scss'],
})
export class IpInfoComponent {
  public currentIpAddress$ = this.ipAddressHandlerService.ipAddress$;
  public currentLocation$ = this.ipAddressHandlerService.location$;
  public currentTimezone$ = this.ipAddressHandlerService.timezone$;
  public currentIsp$ = this.ipAddressHandlerService.isp$;

  constructor(private ipAddressHandlerService: IpAddressHandlerService) {}
}
