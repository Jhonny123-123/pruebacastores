import {Component, inject} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {InventoryService} from '../inventory/inventory.service';
import {Usuario} from '../../../login/interfaces/usuario.interface';
import {Producto} from '../inventory/interfaces/producto.interface';
import {Rol} from '../../enums/enums';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {AddProductDialogComponent} from '../../dialogs/add-product-dialog/add-product-dialog.component';

@Component({
  selector: 'app-out-products',
    imports: [
        NgForOf,
        NgIf
    ],
  templateUrl: './out-products.component.html',
  styleUrl: './out-products.component.css'
})
export class OutProductsComponent {

  private inventoryService: InventoryService = inject(InventoryService);
  protected usuario: Usuario | undefined = undefined;
  public products: Producto[] = [];

  constructor(
    public dialog: MatDialog,
    public router: Router,
  ) {}

  public ngOnInit(): void {
    // obtener usuario de local storage y deserializarlo
    this.usuario = JSON.parse(<string>localStorage.getItem('usuario')) ?? undefined;
    if (this.usuario === undefined) {
      this.router.navigate(['login']);
    } else {
      this.getProducts(1);
    }
  }

  public async getProducts(type: number): Promise<void> {
    this.products = await this.inventoryService.getProducts(type);
    console.log(this.products);
  }

  public async salida(product: Producto): Promise<void> {
    //alert de input
    const cantidad: number = parseInt(prompt('Cantidad de entrada') ?? '0');
    if (cantidad > 0) {
      if(product.cantidad >= cantidad) {
        const result: boolean = await this.inventoryService.removeQuantity(product.idProductos, cantidad, this.usuario!.idUsuario);
        if (result) {
          product.cantidad -= cantidad;
        } else {
          alert('Error al agregar cantidad');
        }
      } else {
        alert('La cantidad no puede ser mayor a la existente');
      }
    } else {
      alert('Cantidad inválida');
    }
  }
}
