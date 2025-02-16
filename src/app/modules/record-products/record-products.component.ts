import {Component, inject} from '@angular/core';
import {RecordService} from './record.service';
import {HistorialDetalle} from './interfaces/historial-detalle.interface';
import {Usuario} from '../../../login/interfaces/usuario.interface';
import {Router} from '@angular/router';
import {NgClass, NgForOf} from '@angular/common';

@Component({
  selector: 'app-record-products',
  imports: [
    NgForOf,
    NgClass
  ],
  templateUrl: './record-products.component.html',
  styleUrl: './record-products.component.css'
})
export class RecordProductsComponent {

  private recordService: RecordService = inject(RecordService);
  public historialDetalle: HistorialDetalle[] = [];
  public usuario: Usuario | undefined = undefined;

  constructor(private router: Router) {}

  public ngOnInit(): void {
    // obtener usuario de local storage y deserializarlo
    this.usuario = JSON.parse(<string>localStorage.getItem('usuario')) ?? undefined;
    if (this.usuario === undefined) {
      this.router.navigate(['login']);
    } else {
      this.getHistorial(2);
    }
  }

  public async getHistorial(tipo: number): Promise<void> {
    this.historialDetalle = await this.recordService.getHistorial(tipo);
  }

  public async onChangeType($event: Event): Promise<void> {
    const target: HTMLSelectElement = $event.target as HTMLSelectElement;
    const value: number = parseInt(target.value);
    await this.getHistorial(value);
  }
}
