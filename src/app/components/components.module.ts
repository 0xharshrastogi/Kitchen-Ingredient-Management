import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, BrowserAnimationsModule],
  exports: [NavbarComponent],
})
export class ComponentsModule {}
