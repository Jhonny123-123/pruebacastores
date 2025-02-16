import {Global} from '../../../global';
import {Usuario} from '../../../login/interfaces/usuario.interface';
import axios from 'axios';
import {Producto} from './interfaces/producto.interface';
import {Injectable} from '@angular/core';
import {Rol} from '../../enums/enums';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class InventoryService {

  private apiUrl: string = `${Global.url}/productos`;
  protected readonly rol: typeof Rol = Rol;

  public async addProduct(name: string, idUsuario: number): Promise<Producto | undefined> {
    try {
      const producto: Producto = {
        idProductos: 0,
        nombre: name,
        cantidad: 0,
        estado: 1,
        idUsuario: idUsuario
      }
      const response = await axios.post(`${this.apiUrl}/add-product`, producto);
      return response.status === 201 ? response.data : undefined;
    } catch (error) {
      return undefined;
    }
  }

  public async getProducts(type: number): Promise<Producto[]> {
    try {
      const response = await axios.get(`${this.apiUrl}/get-products/${type}`);
      return response.status === 200 ? response.data : undefined;
    } catch (error) {
      return [];
    }
  }

  public async addQuantity(id: number, quantity: number, idUser: number): Promise<boolean> {
    try {
      const response = await axios.post(`${this.apiUrl}/add-quantity/${id}/${quantity}/${idUser}`);
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }

  public async removeQuantity(id: number, quantity: number, idUser: number): Promise<boolean> {
    try {
      const response = await axios.post(`${this.apiUrl}/remove-quantity/${id}/${quantity}/${idUser}`);
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }

  public async lowProduct(id: number): Promise<boolean> {
    try {
      const response = await axios.post(`${this.apiUrl}/low-product/${id}`);
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }

  public async upProduct(id: number): Promise<boolean> {
    try {
      const response = await axios.post(`${this.apiUrl}/up-product/${id}`);
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }
}
