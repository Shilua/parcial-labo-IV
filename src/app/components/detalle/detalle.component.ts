import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
})
export class DetalleComponent implements OnInit {
  @Input() inputElementToView: any;
  @Input() inputShowDelete: boolean;
  @Output() outputDeletedElement: EventEmitter<boolean> = new EventEmitter<
    boolean
  >();
  public movieName: string;
  public movieType: string;
  public photoUrl: string;
  public spectatorCount: string;
  public releaseDate: string;
  constructor(
    public datepipe: DatePipe,
    public movieService: MoviesService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}
  ngOnChanges(): void {
    this.movieName = this.inputElementToView?.data.nombre;
    this.movieType = this.inputElementToView?.data.tipo;
    this.photoUrl = this.inputElementToView?.data.fotoDeLaPelicula;
    this.spectatorCount = this.inputElementToView?.data.cantidadDePublico;
    this.releaseDate = this.datepipe.transform(
      this.inputElementToView?.data.fechaDeEstreno.toDate(),
      'dd/MM/yyyy'
    );
  }
  limpiar(): void {
    this.inputElementToView = null;
    this.movieName = '';
    this.movieType = '';
    this.photoUrl = '';
    this.spectatorCount = '';
    this.releaseDate = '';
  }

  deleteElement(): void {
    try {
      this.movieService.deleteElement(this.inputElementToView.id);
      this.outputDeletedElement.emit(true);
      this.inputElementToView = undefined;
      this.toastr.success('Pelicula Borrada');
    } catch (error) {
      this.toastr.error('Error al Eliminar Pelicula ');
      console.log(error.message || 'Error al Eliminar.');
    }
  }
}
