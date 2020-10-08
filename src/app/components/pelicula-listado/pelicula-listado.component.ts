import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-pelicula-listado',
  templateUrl: './pelicula-listado.component.html',
  styleUrls: ['./pelicula-listado.component.css'],
})
export class PeliculaListadoComponent implements OnInit {
  public elementos = [];
  public elementToView: any;
  @Input() inputElementToView: any;
  constructor(public moviesService: MoviesService) {}
  public isSearch = true;
  ngOnInit(): void {
    this.getPeliculas();
  }

  handleSelectElementForDelete(pelicula) {}
  handleSelectElementForView(pelicula) {
    this.elementToView = pelicula;
  }

  getPeliculas() {
    this.moviesService
      .getElements()
      .where('isActive', '==', true)
      .get()
      .then((snapshot) => {
        this.elementos = [];
        snapshot.docs.map((element: any) => {
          const rl = this.moviesService
            .getMoviePhoto(element.data().fotoDeLaPelicula)
            .then((url) => {
              this.elementos.push({
                id: element.id,
                data: element.data(),
                movieUrl: url,
              });
            });
        });
      });
  }
}
