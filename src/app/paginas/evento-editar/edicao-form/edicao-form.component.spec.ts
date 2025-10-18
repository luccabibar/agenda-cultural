import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicaoFormComponent } from './edicao-form.component';

describe('EdicaoFormComponent', () => {
  let component: EdicaoFormComponent;
  let fixture: ComponentFixture<EdicaoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdicaoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdicaoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
