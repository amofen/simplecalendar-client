import { Component } from '@angular/core';
import {Utilisateur} from './model/utilisateur';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  utilisateur:Utilisateur=null;
}
