import { Injectable } from '@angular/core';
import { EventEmitter } from 'protractor';
import { Agenda } from '../model/agenda';
@Injectable()
export class SharedService{
    agenda:Agenda;
    selectedAgendaChanged:EventEmitter = new EventEmitter();
    fireModifyAgenda:EventEmitter = new EventEmitter();
    fireDeleteAgenda:EventEmitter = new EventEmitter();
    fire
}