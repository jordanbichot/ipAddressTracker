import { Component } from '@angular/core';
import { IpAddressHandlerService } from '../data-access/ip-address-handler.service';

@Component({
  selector: 'app-ip-info',
  templateUrl: './ip-info.component.html',
  styleUrls: ['./ip-info.component.scss'],
})
export class IpInfoComponent {
  public currentInfo$ = this.ipAddressHandlerService.info$;

  constructor(private ipAddressHandlerService: IpAddressHandlerService) {}
}
