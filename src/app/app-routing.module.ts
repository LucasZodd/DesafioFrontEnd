import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { TransferenciasComponent } from './pages/transferencias/transferencias.component';

const routes: Routes = [
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path: 'main', component: TransferenciasComponent},
];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
};

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
