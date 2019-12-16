import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CdkTreeModule } from '@angular/cdk/tree';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';

@NgModule({
  declarations: [
    AppComponent, HelloComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    CdkTreeModule,
    ScrollingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
