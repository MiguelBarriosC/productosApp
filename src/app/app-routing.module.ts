import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import { ListComponent } from './components/list/list.component';


const routes: Routes = [
  { path:'', redirectTo:'list', pathMatch:'full' },
  { path:'list', component:ListComponent },
  { path:'create', component:CreateComponent },
  { path:'edit/:name', component:EditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
