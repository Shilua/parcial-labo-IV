import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActorsService } from '../../services/actors.service';

@Component({
  selector: 'app-actor-alta',
  templateUrl: './actor-alta.component.html',
  styleUrls: ['./actor-alta.component.css'],
})
export class ActorAltaComponent implements OnInit {
  private fileToUpload: File;
  public firstName: string;
  public lastName: string;
  public gender: string;
  public photoUrl: string;
  public dateOfBirth: Date = new Date();
  @Input() nationality: string;
  public form: any;

  constructor(
    public actorsService: ActorsService,
    private toastr: ToastrService,
    private router: Router
  ) {
  }

  ngOnInit(): void {}

  traerGenero(data: any) {
    this.gender = data;
  }

  handleImagen(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  handleFecha(date: any) {}
  handleSelectNationality(nationality: string){
    this.nationality = nationality;
    console.log(this.nationality);
  }
  cargarActor() {
    try {
      this.actorsService.createElement(
        {
          nombre: this.firstName,
          apellido: this.lastName,
          fechaDeNacimiento: new Date(this.dateOfBirth),
          sexo: this.gender,
          foto: '',
          nacionalidad : this.nationality
        },
        this.fileToUpload
      );
      this.toastr.success('Actor Guardado');
      this.router.navigate(['/listado-actores']);
    } catch (error) {
      this.toastr.error('Error al guardar ');
    }
  }

  onSubmit(f: any){

  }
}
