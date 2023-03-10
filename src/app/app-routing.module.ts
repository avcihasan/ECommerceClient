import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { AuthGuard } from './guards/common/auth.guard';
import { HomeComponent } from './ui/components/home/home.component';

const routes: Routes = [
  {
    path: 'admin',
    component: LayoutComponent,
    children: [
      { path: '', component: DashboardComponent },
      {
        path: 'customers',
        loadChildren: () =>
          import('../app/admin/components/customers/customers.module').then(
            (m) => m.CustomersModule
          ),canActivate:[AuthGuard]
      },
      {
        path: 'products',
        loadChildren: () =>
          import('../app/admin/components/products/products.module').then(
            (m) => m.ProductsModule
          ),canActivate:[AuthGuard]
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('../app/admin/components/orders/orders.module').then(
            (m) => m.OrdersModule
          ),canActivate:[AuthGuard]
      },
    ],canActivate:[AuthGuard]
  },
  { path: '', component: HomeComponent },
  { path: 'register',loadChildren:()=>import("./ui/components/register/register.module").then(module=>module.RegisterModule) },
  { path: 'login',loadChildren:()=>import("./ui/components/login/login.module").then(module=>module.LoginModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
