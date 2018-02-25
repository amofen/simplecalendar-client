import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UriComposer } from '../shared/uricomposer.service';
import { Evenement } from '../model/evenement';

@Injectable()
export class EvenementService {

  constructor(private uriComposer: UriComposer,
    private http: HttpClient) { }

  getAllEvenements(utilisateurId: number,agendaId:number) {
    return this.http.get<Evenement[]>(this.uriComposer.getAllEvenement(utilisateurId,agendaId))
      .map(res => { return res; });
  }

  addEvenement(utilisateurId: number,agendaId:number,evenement:Evenement) {
    return this.http.post<Evenement>(this.uriComposer.getAllEvenement(utilisateurId,agendaId),evenement)
      .map(res => { return res; });
  }

  modifierEvenement(utilisateurId: number,agendaId:number,evenement:Evenement){
    return this.http.put<Evenement>(this.uriComposer.getSingleEvent(utilisateurId,agendaId,evenement.id),evenement)
      .map(res => { return res; });
  }
  supprimerEvenement(utilisateurId: number,agendaId:number,evenementId:number){
    return this.http.delete(this.uriComposer.getSingleEvent(utilisateurId,agendaId,evenementId))
      .map(res => { return res; });
  }

  

}
