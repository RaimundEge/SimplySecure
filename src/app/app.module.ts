import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

import { AppComponent } from './app.component';
import { ToolsComponent } from './tools/tools.component';
import { LinksComponent } from './links/links.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DownloadComponent } from './download/download.component';
import { HelpComponent } from './help/help.component';
import { AuthService } from "./providers/auth.service";
import { ActivateComponent } from './activate/activate.component';
import { MemberComponent } from './member/member.component';
import { AesComponent } from './aes/aes.component';
import { DesComponent } from './des/des.component';
import { CryptComponent } from './crypt/crypt.component';
import { FilesComponent } from './files/files.component';
import { KeysComponent } from './keys/keys.component';
import { ParamsComponent } from './params/params.component';
import { SelectComponent } from './select/select.component';
import { FilepopupComponent } from './filepopup/filepopup.component';

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
  declarations: [
    AppComponent, HomeComponent, LinksComponent, ToolsComponent, 
    MemberComponent, RegisterComponent, LoginComponent, DownloadComponent,
    HelpComponent, ActivateComponent, AesComponent, DesComponent,
    CryptComponent, FilesComponent, KeysComponent, ParamsComponent,
    SelectComponent, FilepopupComponent,
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, FlexLayoutModule,
    RouterModule.forRoot(routes, { useHash: true }),
    BrowserAnimationsModule,
    MatDialogModule, MatToolbarModule, MatMenuModule, MatIconModule, MatGridListModule, MatProgressSpinnerModule, 
    MatFormFieldModule, MatTabsModule, MatCardModule, MatSelectModule, MatButtonModule, MatRadioModule, MatListModule,
    MatDividerModule,
    HttpClientModule    
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
