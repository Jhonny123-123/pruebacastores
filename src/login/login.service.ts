import {Injectable} from '@angular/core';
import axios from 'axios';
import {Usuario} from './interfaces/usuario.interface';
import {Global} from '../global';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl: string = `${Global.url}/usuarios`;

  public async login(email: string, password: string): Promise<Usuario | undefined> {
    try {
      const response = await axios.get(`${this.apiUrl}/login/${email}/${password}`);
      return response.status === 200 ? response.data : undefined;
    } catch (error) {
      return undefined;
    }
  }

}
