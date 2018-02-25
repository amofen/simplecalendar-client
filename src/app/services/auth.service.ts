import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Response} from '@angular/http';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


import { HttpClient } from '@angular/common/http';
import { UriComposer } from '../shared/uricomposer.service';
import { Utilisateur } from '../model/utilisateur';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient,
    private uriComposer: UriComposer) { }

  sAuthentifier(email: string, motDePasse: string): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(this.uriComposer.getAuthForPost(), { email, motDePasse })
                    .map(res=>{console.log(res);return res;})
                    ;

  }


  private setSession(authResult) {
    //localStorage.setItem('utilisateur', authResult.);
  }

  logout() {
    localStorage.removeItem("JWT");
    localStorage.removeItem("nom");
    localStorage.removeItem("prenom");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    localStorage.removeItem("expiration");
  }

  public isLoggedIn() {
    if(localStorage.getItem("JWT")) return true;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    return Number.parseInt(localStorage.getItem("expiration"));
  }
}
