import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AgendaComponent } from './agenda/agenda.component';



import { AuthService } from './services/auth.service';
import { ConfigService } from './shared/config.service';
import { UriComposer } from './shared/uricomposer.service';
import { AgendaService } from './services/agenda.service';
import { AuthInterceptor } from './shared/authinterceptor.service';
import {EvenementService} from './services/evenement.service';

import {
  InputTextModule, ButtonModule, SharedModule
  , MessagesModule, MessageModule, MenubarModule
} from 'primeng/primeng';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import {DataListModule} from 'primeng/datalist';
import {SelectButtonModule} from 'primeng/selectbutton';
import { SharedService } from './shared/shared.service';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {CheckboxModule} from 'primeng/checkbox';
import {SliderModule} from 'primeng/slider';
import {CalendarModule} from 'primeng/calendar';
import {ScheduleModule} from 'primeng/schedule';
import {GrowlModule} from 'primeng/growl';
import {ContextMenuModule} from 'primeng/contextmenu';
import {SlideMenuModule} from 'primeng/slidemenu';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AgendaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InputTextModule,
    ButtonModule,
    SharedModule,
    MessagesModule,
    MessageModule,
    MenubarModule,
    ConfirmDialogModule,
    DataListModule,
    SelectButtonModule,
    InputTextareaModule,
    CheckboxModule,
    SliderModule,
    CalendarModule,
    GrowlModule,
    ScheduleModule,
    ContextMenuModule,
    SlideMenuModule
  ],
  providers: [AuthService, ConfigService, UriComposer, ConfirmationService, AgendaService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    EvenementService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
