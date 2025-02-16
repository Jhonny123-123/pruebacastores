import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [
    RouterOutlet],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  constructor(public router: Router) { }

  public ngOnInit(): void {
    this.router.navigate(['/login']);
  }

}
