import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Actor } from '../../classes/actor';
import { ActorsService } from '../../services/actors.service';

@Component({
  selector: 'app-tabla-actor',
  templateUrl: './tabla-actor.component.html',
  styleUrls: ['./tabla-actor.component.css'],
})
export class TablaActorComponent implements OnInit {
  @Input() actorsCollection: any[];
  @Output() selectedActor: EventEmitter<Actor> = new EventEmitter<Actor>();
  @Output() sendViewActor: EventEmitter<Actor> = new EventEmitter<Actor>();
  @Output() sendModifyActor: EventEmitter<Actor> = new EventEmitter<Actor>();
  @Output() sendDeleteActor: EventEmitter<Actor> = new EventEmitter<Actor>();

  constructor(public actorsService: ActorsService, public datepipe: DatePipe) {}

  ngOnInit(): void {}

  selectActor(actor: Actor) {
    this.selectedActor.emit(actor);
  }

  deleteActor(actor: any){
    this.sendDeleteActor.emit(actor);
  }
  viewDetails(actor: any){
    this.sendViewActor.emit(actor);
  }
  editActor(actor: any){
    this.sendDeleteActor.emit(actor);
  }
}
