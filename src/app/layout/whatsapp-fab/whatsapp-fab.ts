import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TPipe } from '../../core/i18n/t.pipe';
import { WhatsappService } from '../../core/services/whatsapp.service';

@Component({
  selector: 'app-whatsapp-fab',
  imports: [TPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (wa.enabled) {
      <a
        class="fab"
        [href]="wa.buildLink()"
        target="_blank"
        rel="noopener noreferrer"
        [attr.aria-label]="'fab.label' | t"
      >
        <svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true">
          <path
            fill="#0B0E36"
            d="M16 3C8.800 3 3 8.800 3 16c0 2.300.600 4.500 1.700 6.400L3 29l6.800-1.700A13 13 0 1 0 16 3zm0 23.700c-2 0-3.900-.6-5.500-1.600l-.4-.2-4 1 1.100-3.900-.3-.4A10.700 10.700 0 1 1 16 26.700zm5.900-8c-.3-.2-1.900-.9-2.200-1-.3-.1-.5-.2-.7.200-.2.300-.8 1-1 1.200-.2.200-.4.200-.7.100-.3-.2-1.400-.5-2.600-1.600-1-.9-1.600-1.900-1.800-2.200-.2-.3 0-.5.100-.7l.5-.6c.2-.2.200-.3.300-.6.100-.2.100-.4 0-.6l-1-2.300c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.100-.9.400-.3.300-1.200 1.200-1.200 2.800s1.200 3.300 1.400 3.500c.2.200 2.400 3.600 5.700 5 .8.300 1.400.5 1.900.7.8.300 1.500.2 2.100.1.600-.1 1.900-.8 2.200-1.500.3-.8.300-1.400.2-1.500-.1-.2-.3-.3-.6-.4z"
          />
        </svg>
        <span class="label">{{ 'fab.label' | t }}</span>
      </a>
    }
  `,
  styles: `
    .fab {
      position: fixed;
      right: max(16px, env(safe-area-inset-right));
      bottom: calc(86px + env(safe-area-inset-bottom));
      z-index: 60;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      width: 52px;
      height: 52px;
      border-radius: 99px;
      background: #25d366;
      color: #0b0e36;
      font-weight: 600;
      text-decoration: none;
      box-shadow: 0 10px 26px rgba(37, 211, 102, 0.5);
    }
    .label {
      display: none;
    }
    @media (min-width: 801px) {
      .fab {
        bottom: calc(18px + env(safe-area-inset-bottom));
      }
    }
    @media (min-width: 768px) {
      .fab {
        width: auto;
        padding: 0 22px 0 18px;
      }
      .label {
        display: inline;
      }
    }
  `,
})
export class WhatsappFab {
  protected readonly wa = inject(WhatsappService);
}
