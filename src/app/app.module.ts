import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppHeaderComponent } from './app-header/app-header.component';
import { HotdogComponent } from './hotdog/hotdog.component';
import { AppAddComponent } from './app-header/app-add/app-add.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    HotdogComponent,
    AppAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    RouterModule
  ],
  entryComponents: [
    AppAddComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

