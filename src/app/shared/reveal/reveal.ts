import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, OnDestroy, OnInit, inject, input } from '@angular/core';

/** Fades and slides an element up once when it enters the viewport. */
@Directive({
  selector: '[appReveal]',
  host: { class: 'reveal' },
})
export class Reveal implements OnInit, OnDestroy {
  /** Stagger delay in milliseconds. */
  readonly appReveal = input<number | ''>('');

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly win = inject(DOCUMENT).defaultView;
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    const delay = this.appReveal();
    if (delay !== '') {
      this.el.style.setProperty('--reveal-delay', `${delay}ms`);
    }
    const reduce = this.win?.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    if (reduce || !this.win || !('IntersectionObserver' in this.win)) {
      this.el.classList.add('reveal--in');
      return;
    }
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          this.el.classList.add('reveal--in');
          this.observer?.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    this.observer.observe(this.el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
