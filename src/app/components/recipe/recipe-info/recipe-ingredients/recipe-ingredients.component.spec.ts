import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeIngredientsComponent } from './recipe-ingredients.component';

describe('RecipeIngredientsComponent', () => {
  let component: RecipeIngredientsComponent;
  let fixture: ComponentFixture<RecipeIngredientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeIngredientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeIngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
