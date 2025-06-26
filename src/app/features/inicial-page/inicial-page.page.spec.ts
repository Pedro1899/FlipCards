import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InicialPagePage } from './inicial-page.page';

describe('InicialPagePage', () => {
  let component: InicialPagePage;
  let fixture: ComponentFixture<InicialPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InicialPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
