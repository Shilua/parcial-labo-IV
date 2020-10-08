import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-borrar',
  templateUrl: './borrar.component.html',
  styleUrls: ['./borrar.component.css'],
})
export class BorrarComponent implements OnInit {
  @Input() inputElementToDelete: any;
  @Output() outputDeletedElement: EventEmitter<boolean> = new EventEmitter<
    boolean
  >();

  constructor(
    private movieService: MoviesService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  deleteElement(): void {
    try {
      this.movieService.deleteElement(this.inputElementToDelete.id);
      this.outputDeletedElement.emit(true);
      this.inputElementToDelete = undefined;
      this.toastr.success('Pelicula Borrada');
    } catch (error) {
      this.toastr.error('Error al Eliminar Pelicula ');
      console.log(error.message || 'Error al Eliminar.');
    }
  }
}
