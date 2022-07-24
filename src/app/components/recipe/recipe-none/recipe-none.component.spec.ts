import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeNoneComponent } from './recipe-none.component';

describe('RecipeNoneComponent', () => {
  let component: RecipeNoneComponent;
  let fixture: ComponentFixture<RecipeNoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeNoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeNoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
