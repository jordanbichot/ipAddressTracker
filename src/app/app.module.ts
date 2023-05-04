import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IpInfoComponent } from './ip-info/ip-info.component';
@NgModule({
  declarations: [AppComponent, SearchbarComponent, IpInfoComponent],
  imports: [BrowserModule, ReactiveFormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
