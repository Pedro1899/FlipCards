import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayDeckPage } from './play-deck.page';

describe('PlayDeckPage', () => {
  let component: PlayDeckPage;
  let fixture: ComponentFixture<PlayDeckPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayDeckPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
