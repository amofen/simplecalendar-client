import { Injectable } from '@angular/core';
import {UriComposer} from '../shared/uricomposer.service';
import { HttpClient } from '@angular/common/http';
import {Agenda} from '../model/agenda';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AgendaService {

  constructor(private uriComposer:UriComposer,
              private http:HttpClient) { }

  getAgendasByUtilisateurId(utilisateurId:number){
    return this.http.get<Agenda[]>(this.uriComposer.getAllAgendas(utilisateurId))
    .map(res=>{console.log(res);return res;});
  }


  createNewAgenda(utilisateurId:number,agenda:Agenda){
    return this.http.post<Agenda>(this.uriComposer.getAllAgendas(utilisateurId),agenda);
  }

  modifierAgenda(utilisateurId:number,agenda:Agenda){
    return this.http.put<Agenda>(this.uriComposer.getSingleAgendaUri(utilisateurId,agenda.id),agenda);
  }

  supprimerAgenda(utilisateurId:number,agendaId:number){
    return this.http.delete(this.uriComposer.getSingleAgendaUri(utilisateurId,agendaId));
  }
}
