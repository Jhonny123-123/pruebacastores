import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {MatToolbar} from "@angular/material/toolbar";
import {MatTabLink, MatTabNav} from "@angular/material/tabs";
import {Usuario} from '../login/interfaces/usuario.interface';
import {NgIf} from '@angular/common';
import {Rol} from './enums/enums';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-app',
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbar,
    MatTabNav,
    MatTabLink,
    RouterLinkActive,
    NgIf,
    MatButton
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  public usuario : Usuario | undefined = undefined;
  protected readonly rol: typeof Rol = Rol;

  constructor(private router: Router) {
  }

  public ngOnInit(): void {
    // obtener usuario de local storage y deserializarlo
    this.usuario = JSON.parse(<string> localStorage.getItem('usuario')) ?? undefined;
    if(this.usuario === undefined) {
      this.router.navigate(['login']);
    }
  }

  public logout(): void {
    localStorage.removeItem('usuario');
    this.router.navigate(['login']);
  }
}
