import { Component, OnInit } from '@angular/core';
import { ActorsService } from '../../services/actors.service';

@Component({
  selector: 'app-actor-listado',
  templateUrl: './actor-listado.component.html',
  styleUrls: ['./actor-listado.component.css'],
})
export class ActorListadoComponent implements OnInit {
  public actorsList = [];
  public actorToSend: any;
  constructor(private actorsService: ActorsService) {}

  ngOnInit(): void {
    this.getActorList();
  }

  handleViewActor(actor: any){
    this.actorToSend = actor;
  }
  handleEditActor(actor: any){
    this.actorToSend = actor;
  }
  getActorList() {
    this.actorsService
      .getElements()
      .get()
      .then((snapshot) => {
        this.actorsList = [];
        snapshot.docs.map((element: any) => {
          this.actorsService.getActorPhoto(element.data().foto).then((url) => {
            this.actorsList.push({
              id: element.id,
              data: element.data(),
              foto: url,
            });
          });
        });
      });
  }
}
