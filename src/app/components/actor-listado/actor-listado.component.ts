import { Component, OnInit } from '@angular/core';
import { ActorsService } from '../../services/actors.service';

@Component({
  selector: 'app-actor-listado',
  templateUrl: './actor-listado.component.html',
  styleUrls: ['./actor-listado.component.css'],
})
export class ActorListadoComponent implements OnInit {
  public dbActors = [];
  constructor(private actorsService: ActorsService) {}

  ngOnInit(): void {
    this.getUpdatedCollection();
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
}
