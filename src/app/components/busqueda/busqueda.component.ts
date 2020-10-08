import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css'],
})
export class BusquedaComponent implements OnInit {
  constructor(private moviesService: MoviesService) {}
  public elementos = [];
  public imagesPictures;

  public elementToDelete: any;
  public elementToModify: any;
  public elementToView: any;
  public deletedElement: boolean;
  public isSearch = false;
  public isFullControls = true;
  ngOnInit(): void {
    this.getUpdatedCollection();
  }

  handleCambiarVista() {}
  handleSelectElementForEdit(event) {
    this.elementToModify = event;
  }
  handleSelectElementForView(event) {
    this.elementToView = event;
  }
  handleSelectElementForDelete(event) {
    this.elementToDelete = event;
  }

  getUpdatedCollection() {
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
