import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { LayoutComponent } from './admin/layout/layout.component';
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
          ),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('../app/admin/components/products/products.module').then(
            (m) => m.ProductsModule
          ),
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('../app/admin/components/orders/orders.module').then(
            (m) => m.OrdersModule
          ),
      },
    ],
  },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
