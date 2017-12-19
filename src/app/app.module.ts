import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule  } from '@angular/http';
import { AppComponent } from './app.component';
import { HttpClientModule  } from '@angular/common/http';
import { MyServiceService } from './my-service.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    MyServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
