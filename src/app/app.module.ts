import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FestivalAPIService } from './services/festival-api.service';
import { FestivalService } from './services/festival.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
    FestivalAPIService,
    FestivalService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
