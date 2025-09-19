import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioHeaderComponent } from './usuario-header.component';

describe('LoginHeaderComponent', () => {
  let component: UsuarioHeaderComponent;
  let fixture: ComponentFixture<UsuarioHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
