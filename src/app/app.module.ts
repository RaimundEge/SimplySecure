import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatListModule, MatTableModule, MatPaginatorModule, MatCheckboxModule, MatMenuModule, MatIconModule, MatToolbarModule, MatInputModule, MatDialogModule, MatProgressSpinnerModule, MatRadioModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthService } from "./providers/auth.service";
import { DownloadComponent } from './download/download.component';
import { FilepopupComponent } from './filepopup/filepopup.component';
import { HelpComponent } from './help/help.component';
import { HomeComponent } from './home/home.component';
import { LinksComponent } from './links/links.component';
import { RegisterComponent } from './register/register.component';
import { ToolsComponent } from './tools/tools.component';
import { MemberComponent } from './member/member.component';
import { ActivateComponent } from './activate/activate.component';
import { CryptComponent } from './crypt/crypt.component';
import { KeysComponent } from './keys/keys.component';
import { FilesComponent } from './files/files.component';
import { AesComponent } from './aes/aes.component';
import { DesComponent } from './des/des.component';
import { SelectComponent } from './select/select.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DownloadComponent,
    FilepopupComponent,
    HelpComponent,
    HomeComponent,
    LinksComponent,
    RegisterComponent,
    ToolsComponent,
    MemberComponent,
    ActivateComponent,
    CryptComponent,
    KeysComponent,
    FilesComponent,
    AesComponent,
    DesComponent,
    SelectComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule, MatListModule, MatTableModule, MatPaginatorModule, MatCheckboxModule, MatMenuModule, MatIconModule, MatToolbarModule, MatInputModule, MatDialogModule, MatProgressSpinnerModule, MatRadioModule,
    FormsModule, ReactiveFormsModule, MatGridListModule, MatTabsModule, MatSelectModule
  ],
  providers: [AuthService],
  entryComponents: [ LoginComponent, DownloadComponent, FilepopupComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
