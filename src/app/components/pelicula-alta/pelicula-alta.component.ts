import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActorsService } from '../../services/actors.service';
import { MoviesService } from '../../services/movies.service';
import { movieTypesEnum, movieTypesEnumLabels } from '../../enums/movieEnum';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pelicula-alta',
  templateUrl: './pelicula-alta.component.html',
  styleUrls: ['./pelicula-alta.component.css'],
})
export class PeliculaAltaComponent implements OnInit {
  public movieName: string;
  public movieType: string;
  public photoUrl: string;
  public spectatorCount: number;
  public releaseDate: Date = new Date();
  public reparto = new Array();

  fileToUpload: File = null;
  public dbActors = [];

  movieTypesEnum = movieTypesEnum;
  movieTypesLabels = movieTypesEnumLabels;

  constructor(
    public actorsService: ActorsService,
    public moviesService: MoviesService,
    private datepipe: DatePipe,
    public toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUpdatedCollection();
  }

  cargarPelicula(): void {
    try {
      this.moviesService.createElement(
        {
          nombre: this.movieName,
          tipo: this.movieType,
          fechaDeEstreno: new Date(this.releaseDate),
          cantidadDePublico: this.spectatorCount,
          fotoDeLaPelicula: '',
          reparto: this.reparto,
        },
        this.fileToUpload
      );
      this.toastr.success('Pelicula Guardada.');
      this.router.navigate(['/busqueda']);
    } catch (error) {
      this.toastr.error('Error al guardar pelicula');
    }
  }

  getUpdatedCollection() {
    this.actorsService
      .getElements()
      .get()
      .then((snapshot) => {
        this.dbActors = [];
        snapshot.docs.map((element: any) => {
          this.actorsService.getActorPhoto(element.data().foto).then((url) => {
            this.dbActors.push({
              id: element.id,
              data: element.data(),
              foto: url,
            });
          });
        });
      });
  }

  handleImagen(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  handleFecha(date) {}

  getMovieTypeValue(value) {
    console.log(value);
    this.movieType = value;
  }

  handleActores(actor :any) {
    if (!this.reparto.includes(actor.id)) {
      this.toastr.success('Actor registrado en el reparto');
      this.reparto.push(actor.id);
    } else {
      this.toastr.error('Actor ya seleccionado');
    }
  }
}
