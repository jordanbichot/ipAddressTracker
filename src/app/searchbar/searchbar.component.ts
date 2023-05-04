import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IpAddressHandlerService } from '../data-access/ip-address-handler.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent {
  public ipOrDomainToTrack = '';
  public name = new FormControl('', [
    Validators.pattern(
      '(^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$)|(^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\\.)+[A-Za-z]{2,6}$)'
    ),
  ]);

  constructor(private ipAddressHandlerService: IpAddressHandlerService) {}

  public trackAddress() {
    if (this.name.touched && this.name.valid) {
      if ((this.name.value! as string).match(/[a-zA-Z]/g)) {
        this.ipAddressHandlerService.getDomainInfo(this.name.value!);
      } else {
        this.ipAddressHandlerService.getIpInfo(this.name.value!);
      }
    }
  }
}
