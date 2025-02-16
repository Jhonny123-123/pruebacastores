import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from './login.service';
import {Usuario} from './interfaces/usuario.interface';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private loginService: LoginService = inject(LoginService);

  public loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  public ngOnInit(): void {
    // si hay un usuario almacenado en local storage, redirigir a la ruta /app
    if (localStorage.getItem('usuario') !== null) {
      this.router.navigate(['app']);
    }
  }

  public async login(): Promise<void> {
    console.log(this.loginForm.get('email')?.value);
    if (this.loginForm.invalid) {
      alert('Por favor, llena todos los campos');
      return;
    }

    const { email, password } = this.loginForm.value;
    const usuario: Usuario | undefined = await this.loginService.login(email, password);
    if (usuario !== undefined) {
      // almacenar usuario en local storage
      localStorage.setItem('usuario', JSON.stringify(usuario));
      this.router.navigate(['app']);
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }
}
