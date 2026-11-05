import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AgeGroup, Course, CourseText, ageGroups } from '../../core/data/courses';
import { I18nService } from '../../core/i18n/i18n.service';
import { TPipe } from '../../core/i18n/t.pipe';
import { Reveal } from '../../shared/reveal/reveal';
import { SectionHeading } from '../../shared/section-heading/section-heading';
import { TechLogo } from '../../shared/tech-logo/tech-logo';

@Component({
  selector: 'app-programs',
  imports: [SectionHeading, TechLogo, Reveal, TPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="programet" class="section" aria-labelledby="programet-title">
      <div class="container">
        <app-section-heading
          headingId="programet-title"
          [eyebrow]="'programs.eyebrow' | t"
          [title]="'programs.title' | t"
          [subtitle]="'programs.subtitle' | t"
        />
        <div class="boxes">
          @for (g of groups; track g.age; let gi = $index) {
            <article class="box" [appReveal]="gi * 100">
              <header class="box-head" [style.background]="g.color">
                <h3>{{ groupText(g).age }}</h3>
                <p>{{ groupText(g).subtitle }}</p>
              </header>
              <ul class="list">
                @for (c of g.courses; track c.id) {
                  <li class="card course" [style.--c]="c.color">
                    @if (text(c).badge; as badge) {
                      <span class="badge">{{ badge }}</span>
                    }
                    <app-tech-logo [name]="c.logo" />
                    <h4>{{ text(c).title }}</h4>
                    <p class="desc">{{ text(c).description }}</p>
                    <p class="project">
                      <strong>{{ 'programs.project' | t }}</strong> {{ text(c).project }}
                    </p>
                  </li>
                }
              </ul>
            </article>
          }
        </div>
        <p class="note">{{ 'programs.note' | t }}</p>
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }
    .boxes {
      display: grid;
      gap: 22px;
    }
    .box {
      display: grid;
      gap: 14px;
      padding: 14px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 32px;
    }
    .box-head {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      gap: 14px;
      padding: 16px 24px;
      border-radius: 22px;
      color: #fff;
    }
    .box-head h3 {
      font-size: 28px;
      font-weight: 800;
      line-height: 1.15;
    }
    .box-head p {
      font-size: 15px;
      font-weight: 600;
      opacity: 0.92;
    }
    .list {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 14px;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    @media (min-width: 801px) {
      .list {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
      .course:last-child:nth-child(odd) {
        grid-column: 1 / -1;
      }
    }
    .course {
      padding: 18px;
      border-radius: 22px;
      border-top: 4px solid var(--c);
    }
    app-tech-logo {
      display: block;
      margin-bottom: 12px;
    }
    .badge {
      float: right;
      padding: 2px 10px;
      border: 1px solid var(--border);
      border-radius: 99px;
      background: var(--surface);
      font-size: 13px;
      font-weight: 700;
      line-height: 1.5;
      white-space: nowrap;
    }
    @media (min-width: 561px) {
      .course {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr);
        grid-auto-rows: min-content;
        column-gap: 18px;
        padding: 20px;
      }
      app-tech-logo {
        grid-column: 1;
        grid-row: 1 / span 4;
        align-self: start;
        margin: 0;
      }
      .course > :not(app-tech-logo) {
        grid-column: 2;
      }
      .badge {
        float: none;
        justify-self: start;
        margin-bottom: 6px;
      }
    }
    h4 {
      margin: 0;
      font-size: 20px;
      font-weight: 800;
      line-height: 1.15;
    }
    .desc {
      margin-top: 8px;
      color: var(--muted);
    }
    .project {
      margin-top: 10px;
      font-size: 15px;
    }
    .project strong {
      color: var(--accent);
    }
    .note {
      margin-top: 32px;
      text-align: center;
      color: var(--muted);
      font-weight: 500;
    }
  `,
})
export class Programs {
  private readonly i18n = inject(I18nService);
  protected readonly groups = ageGroups;

  protected text(c: Course): CourseText {
    return this.i18n.lang() === 'en' ? c.en : c;
  }

  protected groupText(g: AgeGroup): { age: string; subtitle: string } {
    return this.i18n.lang() === 'en' ? g.en : g;
  }
}
