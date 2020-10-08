import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pelicula } from '../../classes/pelicula';

@Component({
  selector: 'app-tabla-pelicula',
  templateUrl: './tabla-pelicula.component.html',
  styleUrls: ['./tabla-pelicula.component.css'],
})
export class TablaPeliculaComponent implements OnInit {
  @Input() moviesCollection: any[];
  @Input() showUpdateAndDeleteControls: boolean;
  @Output() deleteEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() modifyEmitter: EventEmitter<Pelicula> = new EventEmitter<
    Pelicula
  >();
  @Output() viewEmitter: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {}

  emitView(movie: Pelicula) {
    this.viewEmitter.emit(movie);
  }
  emitDelete(movie: Pelicula) {
    this.deleteEmitter.emit(movie);
  }
  emitModify(movie: Pelicula) {
    this.modifyEmitter.emit(movie);
  }
}
