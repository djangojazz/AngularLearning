import { AuthGuard } from './user/auth-guard.service';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      { path: 'products', canActivate: [AuthGuard], loadChildren: 'app/products/product.module#ProductModule' },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent }
    ]
    , { enableTracing: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }