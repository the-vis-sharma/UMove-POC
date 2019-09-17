import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapPathComponent } from './map-path/map-path.component';
import { MapBoxComponent } from './map-box/map-box.component';


const routes: Routes = [
  {path: "", component: MapBoxComponent},
  {path: "distance", component: MapPathComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
