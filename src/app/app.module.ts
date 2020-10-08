import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TablaPeliculaComponent } from './components/tabla-pelicula/tabla-pelicula.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BusquedaComponent } from './components/busqueda/busqueda.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MoviesService } from './services/movies.service';
import { DetalleComponent } from './components/detalle/detalle.component';
import { BorrarComponent } from './components/borrar/borrar.component';
import { ModificarComponent } from './components/modificar/modificar.component';
import { DatePipe } from '@angular/common';
import { TablaActorComponent } from './components/tabla-actor/tabla-actor.component';
import { PeliculaAltaComponent } from './components/pelicula-alta/pelicula-alta.component';
import { BienvenidoComponent } from './components/bienvenido/bienvenido.component';
import { ActorsService } from './services/actors.service';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PeliculaListadoComponent } from './components/pelicula-listado/pelicula-listado.component';
import { ActorAltaComponent } from './components/actor-alta/actor-alta.component';
import { ActorListadoComponent } from './components/actor-listado/actor-listado.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TablaPeliculaComponent,
    BusquedaComponent,
    DetalleComponent,
    BorrarComponent,
    ModificarComponent,
    TablaActorComponent,
    PeliculaAltaComponent,
    BienvenidoComponent,
    NavBarComponent,
    PeliculaListadoComponent,
    ActorAltaComponent,
    ActorListadoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [MoviesService, DatePipe, ActorsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
