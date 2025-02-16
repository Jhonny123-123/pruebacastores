import {Routes} from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {AppComponent} from '../app/app.component';
import {InventoryComponent} from '../app/modules/inventory/inventory.component';
import {OutProductsComponent} from '../app/modules/out-products/out-products.component';
import {RecordProductsComponent} from '../app/modules/record-products/record-products.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: 'app', component: AppComponent, children:
      [
        {path: 'inventory', component: InventoryComponent},
        {path: 'out-products', component: OutProductsComponent},
        {path: 'record-products', component: RecordProductsComponent},
      ]
  },
];
