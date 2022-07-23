import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCreateEditFormComponent } from './recipe-create-edit-form.component';

describe('RecipeCreateEditFormComponent', () => {
  let component: RecipeCreateEditFormComponent;
  let fixture: ComponentFixture<RecipeCreateEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeCreateEditFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeCreateEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
