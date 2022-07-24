import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IngredientsRoutingModule } from './ingredients-routing.module';
import { IngredientsComponent } from './ingredients.component';
@NgModule({
  declarations: [IngredientsComponent],
  imports: [CommonModule, IngredientsRoutingModule],
})
export class IngredientsModule {}
