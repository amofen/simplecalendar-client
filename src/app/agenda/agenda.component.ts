import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { SliderModule } from 'primeng/slider';
import { CalendarModule } from 'primeng/calendar';
import { Agenda } from '../model/agenda';
import { Evenement } from '../model/evenement';


import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { Utilisateur } from '../model/utilisateur';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { AuthService } from '../services/auth.service';
import { AgendaService } from '../services/agenda.service';
import { Menu, Message } from 'primeng/primeng';
import { ScheduleModule } from 'primeng/schedule';
import { GrowlModule } from 'primeng/growl';
import { EvenementService } from '../services/evenement.service';
import { ContextMenuModule } from 'primeng/contextmenu';
import { SlideMenuModule } from 'primeng/slidemenu';


@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {

  msgs: Message[] = [];
  activeAgenda: Agenda;
  activeEvenement: Evenement;
  forModifyEvenement: Boolean;
  forModifyAgenda: Boolean;
  forAddAgenda: Boolean;
  forAddEvenement: Boolean;
  eventSelected: Boolean;
  events: any[];

  evenements: Evenement[] = [];

  items: MenuItem[];
  ctxItems: MenuItem[];

  header:any;

  menuItem: MenuItem;
  utilisateurNom: string;
  utilisateurPrenom: string;
  agendas: Agenda[] = [];
  selectedAgenda: Agenda;



  constructor(private router: Router, private authService: AuthService,
    private confirmationService: ConfirmationService,
    private agendaService: AgendaService,
    private evenementService: EvenementService) {
    this.activeAgenda = new Agenda();
    this.activeEvenement = new Evenement();
  }
  ngAfterViewInit() {
    // this.input is NOW valid !!
  }

  ngOnInit() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) { }
    else { this.router.navigate(['/login']); }
    this.utilisateurNom = localStorage.getItem("nom");
    this.utilisateurPrenom = localStorage.getItem("prenom");
    this.updateAgendas();
    this.ctxItems = [
      {
        id: 'ajouter-evenement',
        label: 'Nouvel évenement',
        icon: 'fa-book',
        command: (onclick) => this.ajouterEvenement(onclick)
      }
    ];

    this.header = {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
  };
  }

  showId(e) {
    this.agendas.forEach(element => {
      if (element.id.toString() === e.item.id) this.selectedAgenda = element
    }
    );
    if (this.selectedAgenda) {
      console.log("Selected agenda is: " + this.selectedAgenda.nom);
      this.items[1] = { label: "   Agenda séléctionné: " + this.selectedAgenda.nom };
      this.items[1].items = [
        { label: "Modifier", icon: "fa-edit", id: "modifier-agenda", command: (onclick) => this.modifierAgenda(onclick) },
        { label: "Supprimer", icon: "fa-trash", id: "supprimer-agenda", command: (onclick) => this.supprimerAgenda() }

      ];
      
      this.updateEventFromServer();
      
    }

  }

  updateEventFromServer(){
    this.evenements = [];
    const utilisateurId = Number.parseInt(localStorage.getItem("id"));
    this.evenementService.getAllEvenements(utilisateurId, this.selectedAgenda.id)
        .subscribe(
          res => {
            this.evenements = res;
            console.log(this.evenements);
            this.updateScheduleEvents();

          },
          err => { }
        );
  }
  confirmerDeconnexion() {
    this.confirmationService.confirm({
      message: 'Etes-vous sûre de vouloir déconnecter ?',
      header: 'Confirmation',
      icon: 'fa fa-question-circle',
      accept: () => {
        this.authService.logout();
        this.router.navigate(['/login']);
      },
      reject: () => {

      }
    });
  }

  supprimerAgenda() {
    this.confirmationService.confirm({
      message: 'Voulez vous vraiment supprimer l\'agenda:' + this.selectedAgenda.nom,
      header: 'Confirmation suppression ',
      icon: 'fa fa-trash',
      accept: () => {
        const utilisateurId = Number.parseInt(localStorage.getItem("id"));
        this.agendaService.supprimerAgenda(utilisateurId, this.selectedAgenda.id)
          .subscribe(
            res => {
              this.showSuccess("Agenda supprimé avec succès!");
              this.selectedAgenda = undefined;
              this.updateAgendas();
            },
            err => {
              this.showError("Agenda n'a pas été supprimé !");
            }
          );

      },
      reject: () => {

      }
    });
  }

  showSuccess(message: string) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string) {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Erreur', detail: message });
  }
  ajouterAgenda(onclick) {
    if (onclick && onclick.item.id == "ajout-agenda") this.forAddAgenda = true;
    else {
      if (this.forAddAgenda) {
        const utilisateurId = Number.parseInt(localStorage.getItem("id"));
        this.agendaService.createNewAgenda(utilisateurId, this.activeAgenda)
          .subscribe(
            res => {
              this.showSuccess("Agenda: " + res.nom + " crée avec id : " + res.id);
              this.clearActiveAgenda();
              this.updateAgendas();
            },
            err => {
              this.showError("Vérifier le nom de l\'agenda");
            });
      }
      else {
        if (this.forModifyAgenda) {
          const utilisateurId = Number.parseInt(localStorage.getItem("id"));
          this.activeAgenda.id = this.selectedAgenda.id;
          this.agendaService.modifierAgenda(utilisateurId, this.activeAgenda)
            .subscribe(
              res => {
                this.showSuccess("Agenda:" + this.selectedAgenda.nom + " renomé à : " + res.nom);
                this.selectedAgenda.nom = this.activeAgenda.nom;
                this.updateAgendas();
                this.clearActiveAgenda();
                console.log("agenda selectionné apès modif" + this.selectedAgenda.nom);
              },
              err => {
                this.showError("Vérifier le nom de l\'agenda");
              });
        }
      }
    }
  }

  modifierAgenda(onclick) {
    if (onclick && onclick.item.id == "modifier-agenda") {
      this.forModifyAgenda = true;
      this.activeAgenda.nom = this.selectedAgenda.nom;
      this.activeAgenda.id = this.selectedAgenda.id;
    }
  }



  ajouterEvenement(onclick) {
    if (onclick && onclick.item.id == "ajouter-evenement") {
      this.clearActiveEvenement();
      this.eventSelected = false;
      this.forAddEvenement = true;
    }
    else {
      if (this.forAddEvenement) {
        const utilisateurId = Number.parseInt(localStorage.getItem("id"));
        this.evenementService.addEvenement(utilisateurId, this.selectedAgenda.id, this.activeEvenement)
          .subscribe(
            res => {
              this.showSuccess("Evènement avec id " + res.id + " a été ajouté avec succès");
              this.forAddEvenement = false;
              this.clearActiveEvenement();
              this.updateEventFromServer();
            },
            err => {
              this.showSuccess("Evènement n'as pas été ajouté");
            }
          );
      }
      else{
        this.modifierEvenement();
      }
    }
  }

  modifierEvenement() {
    this.forModifyEvenement = true;
    this.eventSelected = false;
    const utilisateurId = Number.parseInt(localStorage.getItem("id"));
    this.evenementService.modifierEvenement(utilisateurId, this.selectedAgenda.id, this.activeEvenement)
      .subscribe(res => {
        this.showSuccess("Evènement " + res.titre + "a été mis à jour!");
        this.forModifyEvenement = false;
        this.clearActiveEvenement();
        this.updateEventFromServer();
      },
        err => {
          this.showSuccess("l'évènement n'a pas été mis à jour!");
        });
  }

  supprimerEvenement() {
    this.confirmationService.confirm({
      message: 'Voulez vous vraiment supprimer l\'évènement:' + this.activeEvenement.titre,
      header: 'Confirmation suppression ',
      icon: 'fa fa-trash',
      accept: () => {
        const utilisateurId = Number.parseInt(localStorage.getItem("id"));
        this.evenementService.supprimerEvenement(utilisateurId, this.selectedAgenda.id,this.activeEvenement.id)
          .subscribe(
            res => {
              this.eventSelected = false;
              this.updateEventFromServer();
              this.clearActiveEvenement();
              this.showSuccess("Evènement "+this.activeEvenement.titre+" a été supprimé avec succès!");
            },
            err => {
              this.showError("L'éévènement n'a pas été supprimé !");
            }
          );

      },
      reject: () => {

      }
    });
    
  }

  clearActiveAgenda() {
    this.activeAgenda.nom = "";
    this.activeAgenda.id = 0;
    this.forModifyAgenda = false;
    this.forAddAgenda = false;
  }

  clearActiveEvenement() {
    this.activeEvenement.titre = "";
    this.activeEvenement.descriptif = "";
    this.activeEvenement.lieu = "";
    this.activeEvenement.id = 0;
    this.activeEvenement.dateDebut = new Date();
    this.activeEvenement.dateFin = new Date();
    this.forModifyEvenement = false;
    this.forAddEvenement = false;
  }

  updateAgendas() {
    const utilisateurId = Number.parseInt(localStorage.getItem("id"));
    this.agendaService.getAgendasByUtilisateurId(utilisateurId)
      .subscribe(
        data => {
          this.agendas = data;
          this.items = [];
          this.items[0] = {};
          this.items[0].label = "Agendas";
          this.items[0].items = [];
          let d = [];
          this.agendas.forEach(element =>
            d.push({ label: element.nom, id: element.id.toString(), command: (onclick) => this.showId(onclick) }));
          d.push({ label: "Nouvel agenda", icon: "fa-plus", id: "ajout-agenda", command: (onclick) => this.ajouterAgenda(onclick) })
          this.items[0].items = d;
          if (this.selectedAgenda) {
            this.items[1] = { label: "   Agenda séléctionné: " + this.selectedAgenda.nom };
            this.items[1].items = [
              { label: "Modifier", icon: "fa-edit", id: "modifier-agenda", command: (onclick) => this.modifierAgenda(onclick) },
              { label: "Supprimer", icon: "fa-remove" , command: (onclick) => this.supprimerAgenda()}

            ];
          }

        },
        err => console.log(err)
      );

  }

  updateScheduleEvents() {
    this.events = [];
    if (this.evenements) {

      this.evenements.forEach(
        element => this.events.push(this.toEvent(element))
      );
    }
  }

  toEvent(evenement: Evenement): any {
    let event = {
      id: evenement.id,
      title: evenement.titre,
      start: evenement.dateDebut,
      end: evenement.dateFin,
      color:""

    };
    if((evenement.priorite/10)>=6) event.color="blue";
    else{
      if((evenement.priorite/10)<=3) event.color="red";
      else event.color="green";
    }
    return event;
  }

  showEventDetails(e) {
    if (this.evenements) {
      this.evenements.forEach(element => {
        if (e.calEvent.id == element.id) {
          this.activeEvenement = element;
          this.eventSelected = true;
          return;
        }

      })

    }
  }


}
