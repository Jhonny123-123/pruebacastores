import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AddProductDialogComponent} from '../../dialogs/add-product-dialog/add-product-dialog.component';
import {InventoryService} from './inventory.service';
import {Usuario} from '../../../login/interfaces/usuario.interface';
import {Router} from '@angular/router';
import {Producto} from './interfaces/producto.interface';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {Rol} from '../../enums/enums';

@Component({
  selector: 'app-inventory',
  imports: [
    NgForOf,
    NgIf,
    NgClass
  ],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent {

  private inventoryService: InventoryService = inject(InventoryService);
  protected usuario: Usuario | undefined = undefined;
  public products: Producto[] = [];
  private type: number = 1;
  protected readonly rol: typeof Rol = Rol;

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


  public openDialogAddProduct(): void {
    const dialogRef: MatDialogRef<AddProductDialogComponent> = this.dialog.open(AddProductDialogComponent, {
      width: '650px',
      height: '400px',
    });

    dialogRef.afterClosed().subscribe(async (result: string | undefined): Promise<void> => {
      if (result) {
        const product: Producto | undefined = await this.inventoryService.addProduct(result, this.usuario!.idUsuario);
        if (product) {
          this.products.push(product);
        } else {
          alert('Error al agregar producto');
        }
      }
    });
  }

  public async entrada(product: Producto): Promise<void> {
    //alert de input
    const cantidad: number = parseInt(prompt('Cantidad de entrada') ?? '0');
    if (cantidad > 0) {
      const result: boolean = await this.inventoryService.addQuantity(product.idProductos, cantidad, this.usuario!.idUsuario);
      if (result) {
        product.cantidad += cantidad;
      } else {
        alert('Error al agregar cantidad');
      }
    } else {
      alert('Cantidad inválida');
    }
  }

  public async baja(product: Producto): Promise<void> {
    const result: boolean = await this.inventoryService.lowProduct(product.idProductos);
    if (result) {
      product.estado = 0;
      if(this.type === 1) {
        this.products = this.products.filter(p => p.idProductos !== product.idProductos);
      }
    } else {
      alert('Error al dar de baja');
    }
  }

  public async alta(product: Producto): Promise<void> {
    const result: boolean = await this.inventoryService.upProduct(product.idProductos);
    if (result) {
      product.estado = 1;
      if(this.type === 0) {
        this.products = this.products.filter(p => p.idProductos !== product.idProductos);
      }
    } else {
      alert('Error al dar de alta');
    }
  }

  public async onTypeChange(event: Event): Promise<void> {
    const target = event.target as HTMLSelectElement;
    const type: number = parseInt(target.value);
    this.type = type;
    await this.getProducts(type);
  }
}
