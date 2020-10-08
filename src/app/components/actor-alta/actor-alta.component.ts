import { Component, OnInit } from '@angular/core';
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

  constructor(
    public actorsService: ActorsService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  getGenderValue(data) {
    this.gender = data;
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  handleDateChange(date) {}

  uploadNewActor() {
    try {
      this.actorsService.createElement(
        {
          nombre: this.firstName,
          apellido: this.lastName,
          fechaDeNacimiento: new Date(this.dateOfBirth),
          sexo: this.gender,
          foto: '',
        },
        this.fileToUpload
      );
      this.toastr.success('Actor Guardado');
      this.router.navigate(['/listado-actores']);
    } catch (error) {
      this.toastr.error('Error al guardar');
    }
  }
}
