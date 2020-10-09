import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActorsService } from 'src/app/services/actors.service';

@Component({
  selector: 'app-detalle-actor',
  templateUrl: './detalle-actor.component.html',
  styleUrls: ['./detalle-actor.component.css']
})
export class DetalleActorComponent implements OnInit {
  @Input()
  actor: any;
  public firstName: string;
  public lastName: string;
  public sex: string;
  public date: string;
  public nationality : string;
  constructor(public datepipe: DatePipe, public actorService : ActorsService) { }

  ngOnChanges() : void {
    this.firstName = this.actor?.data.nombre;
    this.lastName = this.actor?.data.apellido;
    this.sex = this.actor?.data.sexo;
    this.date = this.datepipe.transform(
      this.actor?.data.fechaDeNacimiento.toDate(),
      'dd/MM/yyyy'
    );
    this.nationality = this.actor?.data.nacionalidad;
  }
  limpiar(): void {
    this.firstName = '';
    this.lastName = '';
    this.sex = '';
    this.date = '';
    this.nationality = '';
  }
  ngOnInit(): void {
  }

}
