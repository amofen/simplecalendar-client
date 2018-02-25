import { Component, OnInit } from '@angular/core';
import { CoordonneesUtilisateur } from '../model/coordonneesutilisateur';
import { AuthService } from '../services/auth.service';
import {Utilisateur} from '../model/utilisateur';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';

import { InputTextModule, Message } from 'primeng/primeng';
import { ButtonModule ,SharedModule,MessagesModule,MessageModule} from 'primeng/primeng';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  ressayerPlusTard: boolean=false;
  result: string = "Rien";
  compte: CoordonneesUtilisateur;
  nonAutorise:boolean = false;

  utilisateur:Utilisateur;
  constructor(
              private authService: AuthService,
              private router:Router
            ) {
    this.compte = new CoordonneesUtilisateur();
    this.compte.email = "amine@gmail.com";
    this.compte.motDePasse = "aminepwd";
  }

  sAuthentifier(): void {
    if (true) {//Vérifier les entrées de l'utilisateur

      this.authService.sAuthentifier(this.compte.email,this.compte.motDePasse)
                      .subscribe(
                        data=>{
                          this.nonAutorise=false;
                          this.utilisateur=data;
                          localStorage.setItem("jwt",this.utilisateur.jwt);
                          localStorage.setItem("id",this.utilisateur.id.toString());
                          localStorage.setItem("email",this.utilisateur.email);
                          localStorage.setItem("nom",this.utilisateur.nom);
                          localStorage.setItem("prenom",this.utilisateur.prenom);
                          localStorage.setItem("expiration",this.utilisateur.expiration.toString());
                          this.router.navigate(['/agenda']);
                        },
                        err=> {
                          if(err.status==401){//Non Autorisé
                            this.nonAutorise=true;
                          }else{
                            this.ressayerPlusTard=true;
                          }
                        }

                      );      
    }
  }

  ngOnInit() {
  }

}
