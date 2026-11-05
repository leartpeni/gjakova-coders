import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { TPipe } from '../../core/i18n/t.pipe';

@Component({
  selector: 'app-sticky-bar',
  imports: [TPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bar" [class.bar--in]="visible()" [attr.inert]="visible() ? null : ''">
      <p class="text">{{ 'sticky.text' | t }}</p>
      <a class="btn btn--primary btn--sm" href="#regjistrimi">{{ 'sticky.button' | t }}</a>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    .bar {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 55;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 10px 16px calc(10px + env(safe-area-inset-bottom));
      background: var(--bg);
      border-top: 1px solid var(--border);
      box-shadow: 0 -8px 24px rgba(11, 14, 54, 0.12);
      transform: translateY(115%);
      visibility: hidden;
      transition:
        transform 0.3s ease,
        visibility 0s linear 0.3s;
    }
    .bar--in {
      transform: translateY(0);
      visibility: visible;
      transition: transform 0.3s ease;
    }
    .text {
      margin: 0;
      font-size: 13px;
      font-weight: 600;
      line-height: 1.3;
      color: var(--muted);
    }
    .btn {
      flex: none;
      white-space: nowrap;
    }
    @media (min-width: 801px) {
      :host {
        display: none;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .bar,
      .bar--in {
        transition: none;
      }
    }
  `,
})
export class StickyBar implements OnDestroy {
  private readonly doc = inject(DOCUMENT);
  private readonly observers: IntersectionObserver[] = [];

  private readonly heroInView = signal(true);
  private readonly registrationInView = signal(false);
  protected readonly visible = computed(() => !this.heroInView() && !this.registrationInView());

  constructor() {
    afterNextRender(() => {
      this.watch('top', this.heroInView);
      // The registration section is deferred, so watch its persistent wrapper.
      this.watch('registration-zone', this.registrationInView);
    });
  }

  ngOnDestroy(): void {
    this.observers.forEach((o) => o.disconnect());
  }

  private watch(id: string, state: { set(value: boolean): void }): void {
    const target = this.doc.getElementById(id);
    if (!target || !('IntersectionObserver' in window)) {
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      state.set(entries[entries.length - 1].isIntersecting);
    });
    observer.observe(target);
    this.observers.push(observer);
  }
}
