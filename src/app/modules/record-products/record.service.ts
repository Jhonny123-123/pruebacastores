import {Global} from '../../../global';
import {Usuario} from '../../../login/interfaces/usuario.interface';
import axios from 'axios';
import {Injectable} from '@angular/core';
import {HistorialDetalle} from './interfaces/historial-detalle.interface';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class RecordService {

  private apiUrl: string = `${Global.url}/historial`;

  public async getHistorial(tipo: number): Promise<HistorialDetalle[]> {
    try {
      const response = await axios.get(`${this.apiUrl}/get-historial/${tipo}`);
      return response.status === 200 ? response.data : [];
    } catch (error) {
      return [];
    }
  }
}
