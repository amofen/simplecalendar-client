import { Injectable } from '@angular/core';
@Injectable()
export class UriComposer {
    apiUri:string;

    constructor(){
        this.apiUri="../simplecalendar/resources/";
    }

    //Uri vers l'api d'authentification
    getAuthForPost():string{
        return this.apiUri+"auth/";
    }

    getAllAgendas(utilisateurId:number):string{
        return this.apiUri+"utilisateur/"+utilisateurId+"/agenda/";
    }

    getSingleAgendaUri(utilisateurId:number,agendaId:number):string{
        return this.getAllAgendas(utilisateurId)+agendaId;
    }

    
    getAllEvenement(utilisateurId:number,agendaId:number):string{
        return this.getAllAgendas(utilisateurId)+agendaId+"/evenement/";
    }

    getSingleEvent(utilisateurId:number,agendaId:number,evenementId:number){
        return this.getAllEvenement(utilisateurId,agendaId)+evenementId;
    }
}