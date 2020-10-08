import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StringLiteral } from 'typescript';
import { MoviesService } from '../../services/movies.service';
import { movieTypesEnum, movieTypesEnumLabels } from '../../enums/movieEnum';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css'],
})
export class ModificarComponent implements OnInit {
  @Input() inputElementToModify: any;
  @Output() outputModifiedElement: EventEmitter<boolean> = new EventEmitter<
    boolean
  >();

  public movieName: string;
  public movieType: string;
  public photoUrl: string;
  public spectatorCount: number;
  public releaseDate: string;

  private fileToUpload: File;

  movieTypesEnum = movieTypesEnum;
  movieTypesLabels = movieTypesEnumLabels;
  movieTypeSelection: string;

  constructor(
    private movieService: MoviesService,
    private datepipe: DatePipe,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.movieTypeSelection = this.movieTypesEnum.SINCLASIFICACION;
  }

  ngOnChanges(): void {
    this.movieName = this.inputElementToModify?.data.nombre;
    this.movieType = movieTypesEnum[this.inputElementToModify?.data.tipo];

    this.movieTypeSelection = movieTypesEnum[this.movieType];
    this.photoUrl = this.inputElementToModify?.data.fotoDeLaPelicula;
    this.spectatorCount = this.inputElementToModify?.data.cantidadDePublico;
    this.releaseDate = this.datepipe.transform(
      this.inputElementToModify?.data.fechaDeEstreno.toDate(),
      'yyyy-MM-dd'
    );
  }

  modifyElement(inputElementToModify) {
    try {
      this.movieService.modifyElement(
        {
          id: inputElementToModify.id,
          data: {
            nombre: this.movieName,
            tipo: this.movieType,
            cantidadDePublico: this.spectatorCount,
            fechaDeEstreno: new Date(this.releaseDate),
            fotoDeLaPelicula: this.photoUrl,
          },
        },
        this.fileToUpload
      );
      this.outputModifiedElement.emit(true);
      this.inputElementToModify = undefined;
      this.toastr.success('Cambios Guardados');
    } catch (error) {
      this.toastr.error('Error al guardar los cambios');
      console.log(
        error.message || 'Error al escribir las modificaciones en la base.'
      );
    }
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  getMovieTypeValue(value) {
    this.movieType = value;
  }
}
