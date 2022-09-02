import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { LinksComponent } from './links/links.component';
import { ToolsComponent } from './tools/tools.component';
import { MemberComponent } from './member/member.component';
import { MatGridListModule } from '@angular/material/grid-list';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'links', component: LinksComponent },
  { path: 'tools', component: ToolsComponent },
  { path: 'member', component: MemberComponent },
  // { path: 'help', component: HelpComponent },
  // { path: 'register', component: RegisterComponent },
  // { path: 'activate', component: ActivateComponent },   
  // { path: 'activate/:code', component: ActivateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule, MatGridListModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
