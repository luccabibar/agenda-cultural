import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizacaoFormComponent } from './atualizacao-form.component';

describe('AtualizacaoFormComponent', () => {
  let component: AtualizacaoFormComponent;
  let fixture: ComponentFixture<AtualizacaoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtualizacaoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtualizacaoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
