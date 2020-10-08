import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.css'],
})
export class BienvenidoComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit(): void {}

  newMovie() {
    this.router.navigate(['/alta-pelicula']);
  }

  movieList() {
    this.router.navigate(['/busqueda']);
  }
}
