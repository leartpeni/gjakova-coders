import { ChangeDetectionStrategy, Component } from '@angular/core';
import { COURSES } from '../../core/data/courses';
import { Reveal } from '../../shared/reveal/reveal';
import { SectionHeading } from '../../shared/section-heading/section-heading';
import { TechLogo } from '../../shared/tech-logo/tech-logo';

@Component({
  selector: 'app-programs',
  imports: [SectionHeading, TechLogo, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="programet" class="section" aria-labelledby="programet-title">
      <div class="container">
        <app-section-heading
          headingId="programet-title"
          eyebrow="PROGRAMET"
          title="Çfarë do të mësojnë fëmijët"
          subtitle="Shtatë kurse, nga hapat e parë me lojëra deri te Python, PHP dhe Inteligjenca Artificiale."
        />
        <ul class="grid courses">
          @for (c of courses; track c.id; let i = $index) {
            <li class="card card--lift course" [style.--c]="c.color" [appReveal]="(i % 3) * 80">
              <app-tech-logo [name]="c.logo" />
              <h3>{{ c.title }}</h3>
              <p class="desc">{{ c.description }}</p>
              <p class="project"><strong>Projekt:</strong> {{ c.project }}</p>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }
    .courses {
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
    }
    .course {
      display: flex;
      flex-direction: column;
      gap: 12px;
      border-top: 4px solid var(--c);
    }
    h3 {
      font-size: 22px;
    }
    .desc {
      color: var(--muted);
    }
    .project {
      margin-top: auto;
      padding-top: 8px;
      font-size: 15px;
    }
    .project strong {
      color: var(--accent);
    }
  `,
})
export class Programs {
  protected readonly courses = COURSES;
}
