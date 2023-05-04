import { Injectable } from '@angular/core';
import { BehaviorSubject, concat, share, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Ipify } from '../models/ipify';
import { MapHandlerService } from './map-handler.service';

@Injectable({
  providedIn: 'root',
})
export class IpAddressHandlerService {
  private UrlPrefix =
    'https://geo.ipify.org/api/v2/country,city?apiKey=at_sieR1oeYORrbruJmZlLkRpBo2g0wU';
  private UrlIpSuffix = '&ipAddress=';
  private UrlDomainSuffix = '&domain=';
  private currentIpAddress = '127.0.0.1';

  private firstCall = true;
  private urlCompleted = '';

  private ipAddress = new BehaviorSubject<string>('192.212.174.101');
  public ipAddress$ = this.ipAddress.asObservable();

  private location = new BehaviorSubject<string>('Brooklyn, NY 10001');
  public location$ = this.location.asObservable();

  private timezone = new BehaviorSubject<string>('UTC - 05:00');
  public timezone$ = this.timezone.asObservable();

  private isp = new BehaviorSubject<string>('SpaceX Starlink');
  public isp$ = this.isp.asObservable();

  constructor(
    private http: HttpClient,
    private mapHandlerService: MapHandlerService
  ) {}

  private getCurrentIp() {
    return this.http.get('http://api.ipify.org/?format=json').pipe(share());
  }

  private getRemainingInfo() {
    return this.http.get(this.urlCompleted);
  }

  public setCurrentInfo() {
    this.getCurrentIp().subscribe((response) => {
      this.currentIpAddress = (response as any).ip;
      this.urlCompleted =
        this.UrlPrefix + this.UrlIpSuffix + this.currentIpAddress;

      this.getRemainingInfo().subscribe((response) => {
        this.ipAddress.next((response as Ipify).ip);
        this.location.next(
          (response as Ipify).location.city +
            ',' +
            (response as Ipify).location.country +
            ' ' +
            (response as Ipify).location.postalCode
        );
        this.timezone.next('UTC' + (response as Ipify).location.timezone);
        this.isp.next((response as Ipify).isp);

        this.mapHandlerService.initialCoordenates = [
          (response as Ipify).location.lat,
          (response as Ipify).location.lng,
        ];
        this.mapHandlerService.CreateMap();
      });
    });
  }

  public getDomainInfo(domain: string) {
    this.urlCompleted = this.UrlPrefix + this.UrlDomainSuffix + domain;
    this.getInfo();
  }
  public getIpInfo(ip: string) {
    this.urlCompleted = this.UrlPrefix + this.UrlIpSuffix + ip;
    this.getInfo();
  }
  private getInfo() {
    this.http.get(this.urlCompleted).subscribe((response) => {
      this.ipAddress.next((response as Ipify).ip);
      this.location.next(
        (response as Ipify).location.city +
          ',' +
          (response as Ipify).location.country +
          ' ' +
          (response as Ipify).location.postalCode
      );
      this.timezone.next('UTC' + (response as Ipify).location.timezone);
      this.isp.next((response as Ipify).isp);

      this.mapHandlerService.setMapViewToCoordenates(
        (response as Ipify).location.lat,
        (response as Ipify).location.lng
      );
    });
  }
}
