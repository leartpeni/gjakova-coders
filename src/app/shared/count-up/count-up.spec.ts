import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CountUp } from './count-up';

@Component({
  imports: [CountUp],
  template: `<strong [countUp]="value"></strong>`,
})
class Host {
  value = '2×';
}

describe('CountUp', () => {
  let callback: IntersectionObserverCallback;
  let frames: FrameRequestCallback[];
  let now: number;

  function mount(value: string, reduce = false): HTMLElement {
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(cb: IntersectionObserverCallback) {
          callback = cb;
        }
        observe(): void {}
        disconnect(): void {}
      },
    );
    window.matchMedia = ((q: string) => ({ matches: reduce && q.includes('reduce') })) as never;
    frames = [];
    now = 0;
    vi.spyOn(window.performance, 'now').mockImplementation(() => now);
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => frames.push(cb));
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.value = value;
    fixture.detectChanges();
    return fixture.nativeElement.querySelector('strong');
  }

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('counts up to the value and keeps the suffix', () => {
    const el = mount('2×');
    expect(el.textContent).toBe('0×');
    callback([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver);
    now = 550;
    frames.splice(0).forEach((f) => f(now));
    expect(el.textContent).toBe('2×');
    now = 1100;
    frames.splice(0).forEach((f) => f(now));
    expect(el.textContent).toBe('2×');
  });

  it('skips non-numeric values', () => {
    expect(mount('7â€“18').textContent).toBe('7â€“18');
  });

  it('does nothing when reduced motion is preferred', () => {
    expect(mount('9', true).textContent).toBe('9');
  });
});
