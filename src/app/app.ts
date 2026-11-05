import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TPipe } from './core/i18n/t.pipe';
import { SITE_CONFIG } from './core/config/site.config';
import { buildContacts } from './core/utils/contacts';
import { Footer } from './layout/footer/footer';
import { Header } from './layout/header/header';
import { StickyBar } from './layout/sticky-bar/sticky-bar';
import { WhatsappFab } from './layout/whatsapp-fab/whatsapp-fab';
import { Benefits } from './sections/benefits/benefits';
import { Contact } from './sections/contact/contact';
import { CtaBand } from './sections/cta-band/cta-band';
import { Faq } from './sections/faq/faq';
import { Hero } from './sections/hero/hero';
import { Pricing } from './sections/pricing/pricing';
import { Programs } from './sections/programs/programs';
import { Registration } from './sections/registration/registration';
import { Stats } from './sections/stats/stats';
import { Steps } from './sections/steps/steps';

@Component({
  selector: 'app-root',
  imports: [
    Header,
    Hero,
    Stats,
    Programs,
    Benefits,
    Steps,
    Pricing,
    Faq,
    CtaBand,
    Registration,
    Contact,
    Footer,
    WhatsappFab,
    StickyBar,
    TPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly hasContact = buildContacts(inject(SITE_CONFIG)).length > 0;
}
