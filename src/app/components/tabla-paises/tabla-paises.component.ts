import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { PaisesService } from 'src/app/services/paises.service';

@Component({
  selector: 'app-tabla-paises',
  templateUrl: './tabla-paises.component.html',
  styleUrls: ['./tabla-paises.component.css']
})
export class TablaPaisesComponent implements OnInit {
  paises:any;
  
  @Output() selectedNationality: EventEmitter<any> = new EventEmitter<any>();
  constructor(private paisService : PaisesService) {
    this.paisService.getData().subscribe((data : any) =>{
      this.paises =data;
    });
   }
 
  ngOnInit(): void {
  }
  
  selectNationality(nationaility:any){
    this.selectedNationality.emit(nationaility.name);
  }
}
