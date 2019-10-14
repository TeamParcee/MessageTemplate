import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { EmailConfirmationGuard } from './guards/email-confirmation.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule), canActivate: [AuthGuard, EmailConfirmationGuard] },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule', canActivate: [AuthGuard, EmailConfirmationGuard] },
  { path: 'message-list', loadChildren: './message-list/message-list.module#MessageListPageModule', canActivate: [AuthGuard, EmailConfirmationGuard] },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
  { path: 'confirm-email', loadChildren: './confirm-email/confirm-email.module#ConfirmEmailPageModule' },
  { path: 'messages', loadChildren: './message-list/messages/messages.module#MessagesPageModule' },
  { path: 'select-contact', loadChildren: './select-contact/select-contact.module#SelectContactPageModule' },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
