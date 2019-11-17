import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LinksComponent } from './links/links.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ToolsComponent } from './tools/tools.component';
import { HelpComponent } from './help/help.component';
import { MemberComponent } from './member/member.component';
import { ActivateComponent } from './activate/activate.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'links', component: LinksComponent },
  { path: 'tools', component: ToolsComponent },
  { path: 'member', component: MemberComponent },
  { path: 'help', component: HelpComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'activate', component: ActivateComponent },   
  { path: 'activate/:code', component: ActivateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
