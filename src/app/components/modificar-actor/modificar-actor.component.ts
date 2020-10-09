import { DatePipe } from '@angular/common';
import { Component, OnInit, Input,Output, } from '@angular/core';
import { EventEmitter } from 'events';
import { ToastrService } from 'ngx-toastr';
import { ActorsService } from 'src/app/services/actors.service';


@Component({
  selector: 'app-modificar-actor',
  templateUrl: './modificar-actor.component.html',
  styleUrls: ['./modificar-actor.component.css']
})
export class ModificarActorComponent implements OnInit {

  @Input() actorToModify: any;
  public firstName: string;
  public lastName: string;
  public sex: string;
  public date: string;
  public nationality : string;
  private fileToUpload: File;
  constructor(
    private actorService: ActorsService,
    private datepipe: DatePipe,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    
  }

  ngOnChanges(): void {
    this.firstName = this.actorToModify?.data.nombre;
    this.lastName = this.actorToModify?.data.apellido;
    this.sex = this.actorToModify?.data.sexo;
    this.date = this.datepipe.transform(
      this.actorToModify?.data.fechaDeNacimiento.toDate(),
      'dd/MM/yyyy'
    );
    this.nationality = this.actorToModify?.data.nacionalidad;
  }
  

  modifyElement(inputElementToModify: any) {
    try {
      this.actorService.modifyElement(
        {
          id: inputElementToModify.id,
          data: {
            nombre: this.firstName,
            apellido: this.lastName,
            fechaDeNacimiento: new Date(this.date),
            sexo: this.sex,
            foto: '',
            nacionalidad : this.nationality
          },
        },
        this.fileToUpload
      );
      this.actorToModify = undefined;
      this.toastr.success('Cambios Guardados');
    } catch (error) {
      this.toastr.error('Error al guardar los cambios');
      console.log(
        error.message || 'Error al escribir las modificaciones en la base.'
      );
    }
  }

}
