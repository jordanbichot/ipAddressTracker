import { Injectable } from '@angular/core';
import { BehaviorSubject, concat, share, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Ipify } from '../models/ipify';
import { MapHandlerService } from './map-handler.service';
import { Info } from '../models/info';

@Injectable({
  providedIn: 'root',
})
export class IpAddressHandlerService {
  private UrlPrefix =
    'https://geo.ipify.org/api/v2/country,city?apiKey=at_sieR1oeYORrbruJmZlLkRpBo2g0wU';
  private UrlIpSuffix = '&ipAddress=';
  private UrlDomainSuffix = '&domain=';

  private info = new BehaviorSubject<Info>({
    ip: '192.212.174.101',
    location: 'Brooklyn, NY 10001',
    timezone: 'UTC - 05:00',
    isp: 'SpaceX Starlink',
  });
  public info$ = this.info.asObservable();

  constructor(
    private http: HttpClient,
    private mapHandlerService: MapHandlerService
  ) {}

  private getCurrentIp() {
    return this.http.get('https://api.ipify.org/?format=json').pipe(share());
  }

  private getRemainingInfo(urlCompleted: string) {
    return this.http.get<Ipify>(urlCompleted);
  }

  public setCurrentInfo() {
    return this.getCurrentIp().pipe(
      switchMap((firstResponse: any) => {
        return this.getRemainingInfo(
          this.UrlPrefix + this.UrlIpSuffix + firstResponse.ip
        ).pipe(
          tap((secondResponse) => {
            this.mapHandlerService.initialCoordenates = [
              secondResponse.location.lat,
              secondResponse.location.lng,
            ];
            this.mapHandlerService.CreateMap();

            const currentLocation = `${secondResponse.location.city},${secondResponse.location.country} ${secondResponse.location.postalCode}`;
            const currentInfo: Info = {
              ip: secondResponse.ip,
              location: currentLocation,
              timezone: secondResponse.location.timezone,
              isp: secondResponse.ip,
            };
            this.info.next(currentInfo);
          })
        );
      })
    );
  }

  public getDomainInfo(domain: string) {
    return this.getInfo(this.UrlPrefix + this.UrlDomainSuffix + domain);
  }
  public getIpInfo(ip: string) {
    return this.getInfo(this.UrlPrefix + this.UrlIpSuffix + ip);
  }
  private getInfo(urlCompleted: string) {
    return this.http.get<Ipify>(urlCompleted).pipe(
      tap((response) => {
        this.mapHandlerService.setMapViewToCoordenates(
          response.location.lat,
          response.location.lng
        );

        const currentLocation = `${response.location.city},${response.location.country} ${response.location.postalCode}`;
        const currentInfo: Info = {
          ip: response.ip,
          location: currentLocation,
          timezone: response.location.timezone,
          isp: response.ip,
        };
        this.info.next(currentInfo);
      })
    );
  }
}
