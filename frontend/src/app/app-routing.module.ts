import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ImagesChatComponent } from './components/images-chat/images-chat.component';

const routes: Routes = [
  { path: 'chat', component: HomeComponent },
  { path: 'chat/images', component: ImagesChatComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
