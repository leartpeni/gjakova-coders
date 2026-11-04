import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  it('renders header, hero, stats and hides contact/FAB without config', async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;

    expect(el.querySelector('app-header')).toBeTruthy();
    expect(el.querySelector('h1')?.textContent).toContain('Programim');
    expect(el.querySelector('app-stats')).toBeTruthy();
    expect(el.querySelector('#kontakti')).toBeNull();
    expect(el.querySelector('.fab')).toBeNull();
  });
});
