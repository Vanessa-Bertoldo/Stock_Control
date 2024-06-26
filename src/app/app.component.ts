import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'stock-control';

  constructor(private primeNgConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.primeNgConfig.ripple = true;
  }
}
