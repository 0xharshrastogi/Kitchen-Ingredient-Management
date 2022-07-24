import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrimTextPipe } from './trim-text.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [TrimTextPipe],
  exports: [TrimTextPipe],
})
export class SharedModule {}
