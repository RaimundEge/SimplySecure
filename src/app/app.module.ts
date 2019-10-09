import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatListModule, MatTableModule, MatPaginatorModule, MatCheckboxModule, MatMenuModule, MatIconModule, MatToolbarModule, MatInputModule, MatDialogModule, MatProgressSpinnerModule, MatRadioModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';

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
    AppComponent,
    ToolsComponent,
    LinksComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    DownloadComponent,
    HelpComponent,
    ActivateComponent,
    MemberComponent,
    AesComponent,
    DesComponent,
    CryptComponent,
    FilesComponent,
    KeysComponent,
    ParamsComponent,
    SelectComponent,
    FilepopupComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, HttpClientModule,
    FlexLayoutModule, MatGridListModule, MatTableModule, MatPaginatorModule, MatCardModule, MatTabsModule, MatSelectModule, MatRadioModule,
    RouterModule.forRoot(routes, { useHash: true }),
    MatButtonModule, MatCheckboxModule, MatListModule, MatMenuModule, MatIconModule, MatToolbarModule, MatInputModule, MatDialogModule, MatProgressSpinnerModule
  ],
  providers: [AuthService],
  entryComponents: [ LoginComponent, DownloadComponent, FilepopupComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
