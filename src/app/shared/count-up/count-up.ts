import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, OnDestroy, effect, inject, input } from '@angular/core';

const DURATION_MS = 1100;
const NUMERIC = /^(\d+)(\D*)$/;

const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

/** Counts an integer up from 0 once the element is 60% visible; suffixes like "×" are kept. */
@Directive({ selector: '[countUp]' })
export class CountUp implements OnDestroy {
  readonly countUp = input.required<string>();

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly win = inject(DOCUMENT).defaultView;
  private observer?: IntersectionObserver;
  private frame = 0;
  private done = false;

  constructor() {
    effect(() => this.setup(this.countUp()));
  }

  ngOnDestroy(): void {
    this.stop();
  }

  private setup(value: string): void {
    this.stop();
    const match = NUMERIC.exec(value.trim());
    const reduce = this.win?.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    if (!match || reduce || this.done || !this.win || !('IntersectionObserver' in this.win)) {
      this.el.textContent = value;
      return;
    }
    const target = Number(match[1]);
    const suffix = match[2];
    this.el.textContent = `0${suffix}`;
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          this.observer?.disconnect();
          this.animate(target, suffix, value);
        }
      },
      { threshold: 0.6 },
    );
    this.observer.observe(this.el);
  }

  private animate(target: number, suffix: string, finalText: string): void {
    const win = this.win;
    if (!win) {
      return;
    }
    const start = win.performance.now();
    const step = (now: number): void => {
      const progress = Math.min((now - start) / DURATION_MS, 1);
      if (progress >= 1) {
        this.done = true;
        this.frame = 0;
        this.el.textContent = finalText;
        return;
      }
      this.el.textContent = `${Math.round(target * easeOutCubic(progress))}${suffix}`;
      this.frame = win.requestAnimationFrame(step);
    };
    this.frame = win.requestAnimationFrame(step);
  }

  private stop(): void {
    this.observer?.disconnect();
    if (this.frame) {
      this.win?.cancelAnimationFrame(this.frame);
      this.frame = 0;
    }
  }
}
