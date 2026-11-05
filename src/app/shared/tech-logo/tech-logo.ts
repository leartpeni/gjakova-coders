import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TechName } from '../../core/data/courses';

/**
 * NOTE: these are simplified, hand-drawn approximations of the technology logos.
 * Official brand assets can replace the inline SVGs below.
 */
@Component({
  selector: 'app-tech-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="tile" aria-hidden="true">
      @switch (name()) {
        @case ('code') {
          <svg viewBox="0 0 48 48">
            <rect width="48" height="48" rx="11" fill="#00ADBC" />
            <g
              fill="none"
              stroke="#fff"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M18 16L9 24L18 32" />
              <path d="M30 16L39 24L30 32" />
              <path d="M26 13L22 35" stroke-width="3" />
            </g>
          </svg>
        }
        @case ('scratch') {
          <svg viewBox="0 0 48 48">
            <path d="M8 18L9 4L19 10Z M40 18L39 4L29 10Z" fill="#FF9F1C" />
            <ellipse cx="24" cy="27" rx="18" ry="16" fill="#FF9F1C" />
            <circle cx="17" cy="25" r="5" fill="#fff" />
            <circle cx="31" cy="25" r="5" fill="#fff" />
            <circle cx="18" cy="26" r="2.2" fill="#1B1F5E" />
            <circle cx="30" cy="26" r="2.2" fill="#1B1F5E" />
            <path
              d="M20 34Q24 38 28 34"
              fill="none"
              stroke="#fff"
              stroke-width="2.4"
              stroke-linecap="round"
            />
          </svg>
        }
        @case ('web') {
          <span class="trio">
            <svg viewBox="0 0 48 48">
              <path d="M6 5H42L38.500 41L24 45L9.500 41Z" fill="#E44D26" />
              <path d="M24 41.500L35.500 38.300L38.700 8H24Z" fill="#F16529" />
              <text
                x="24"
                y="33"
                text-anchor="middle"
                font-size="24"
                font-weight="800"
                font-family="Poppins, sans-serif"
                fill="#fff"
              >
                5
              </text>
            </svg>
            <svg viewBox="0 0 48 48">
              <path d="M6 5H42L38.500 41L24 45L9.500 41Z" fill="#1572B6" />
              <path d="M24 41.500L35.500 38.300L38.700 8H24Z" fill="#33A9DC" />
              <text
                x="24"
                y="33"
                text-anchor="middle"
                font-size="24"
                font-weight="800"
                font-family="Poppins, sans-serif"
                fill="#fff"
              >
                3
              </text>
            </svg>
            <svg viewBox="0 0 48 48">
              <rect x="3" y="3" width="42" height="42" rx="3" fill="#F7DF1E" />
              <text
                x="43"
                y="42"
                text-anchor="end"
                font-size="20"
                font-weight="800"
                font-family="Poppins, sans-serif"
                fill="#1B1F5E"
              >
                JS
              </text>
            </svg>
          </span>
        }
        @case ('wp') {
          <svg viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="22" fill="#21759B" />
            <circle cx="24" cy="24" r="18" fill="none" stroke="#fff" stroke-width="2.500" />
            <text
              x="24"
              y="32"
              text-anchor="middle"
              font-size="24"
              font-weight="700"
              font-family="Georgia, 'Times New Roman', serif"
              fill="#fff"
            >
              W
            </text>
          </svg>
        }
        @case ('py') {
          <svg viewBox="0 0 48 48">
            <path
              d="M23 5h-3c-5 0-7 2-7 6v5h10v2H10c-4 0-6 3-6 8s2 8 6 8h3v-5c0-4 3-7 7-7h9c3 0 5-2 5-5V11c0-4-4-6-11-6z"
              fill="#3776AB"
            />
            <path
              d="M25 43h3c5 0 7-2 7-6v-5H25v-2h13c4 0 6-3 6-8s-2-8-6-8h-3v5c0 4-3 7-7 7h-9c-3 0-5 2-5 5v7c0 4 4 6 11 6z"
              fill="#FFD43B"
            />
            <circle cx="18" cy="11" r="1.800" fill="#fff" />
            <circle cx="30" cy="37" r="1.800" fill="#fff" />
          </svg>
        }
        @case ('php') {
          <svg class="wide" viewBox="0 6 48 36" width="44" height="33">
            <ellipse cx="24" cy="24" rx="23" ry="14" fill="#777BB4" />
            <text
              x="24"
              y="30"
              text-anchor="middle"
              font-size="17"
              font-weight="800"
              font-style="italic"
              font-family="Poppins, sans-serif"
              fill="#0B0E36"
            >
              php
            </text>
          </svg>
        }
        @case ('info1') {
          <svg viewBox="0 0 48 48">
            <rect width="48" height="48" rx="11" fill="#14B8A6" />
            <rect x="8" y="9" width="32" height="22" rx="3.500" fill="#fff" />
            <rect x="11" y="12" width="26" height="16" rx="1.500" fill="#14B8A6" />
            <path
              d="M18 20L22.500 24.500L30 16.500"
              fill="none"
              stroke="#fff"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <rect x="22" y="31" width="4" height="5" fill="#fff" />
            <rect x="15" y="35" width="18" height="3.500" rx="1.700" fill="#fff" />
          </svg>
        }
        @case ('info2') {
          <svg viewBox="0 0 48 48">
            <rect width="48" height="48" rx="11" fill="#FF9F1C" />
            <rect x="10" y="9" width="28" height="21" rx="3" fill="#fff" />
            <rect x="15" y="22" width="5" height="5" rx="1" fill="#FF9F1C" />
            <rect x="21.500" y="17" width="5" height="10" rx="1" fill="#FF9F1C" />
            <rect x="28" y="12.500" width="5" height="14.500" rx="1" fill="#FF9F1C" />
            <rect x="5" y="34" width="38" height="3.500" rx="1.700" fill="#fff" />
          </svg>
        }
        @case ('dev1') {
          <svg viewBox="0 0 48 48">
            <rect width="48" height="48" rx="11" fill="#7C4DFF" />
            <rect x="7" y="9" width="34" height="30" rx="4" fill="#fff" />
            <circle cx="12.500" cy="14" r="1.700" fill="#7C4DFF" />
            <circle cx="18" cy="14" r="1.700" fill="#7C4DFF" />
            <g
              fill="none"
              stroke="#7C4DFF"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M19 23L13.500 28.500L19 34" />
              <path d="M29 23L34.500 28.500L29 34" />
              <path d="M26 21.500L22 35.500" stroke-width="2.600" />
            </g>
          </svg>
        }
        @case ('dev2') {
          <span class="trio">
            <svg viewBox="0 0 48 48">
              <rect width="48" height="48" rx="10" fill="#7952B3" />
              <text
                x="24"
                y="36"
                text-anchor="middle"
                font-size="32"
                font-weight="800"
                font-family="Poppins, sans-serif"
                fill="#fff"
              >
                B
              </text>
            </svg>
            <svg viewBox="0 0 48 48">
              <rect x="3" y="3" width="42" height="42" rx="3" fill="#F7DF1E" />
              <text
                x="43"
                y="42"
                text-anchor="end"
                font-size="20"
                font-weight="800"
                font-family="Poppins, sans-serif"
                fill="#1B1F5E"
              >
                JS
              </text>
            </svg>
            <svg class="wide" viewBox="0 6 48 36" width="44" height="33">
              <ellipse cx="24" cy="24" rx="23" ry="14" fill="#777BB4" />
              <text
                x="24"
                y="30"
                text-anchor="middle"
                font-size="17"
                font-weight="800"
                font-style="italic"
                font-family="Poppins, sans-serif"
                fill="#0B0E36"
              >
                php
              </text>
            </svg>
          </span>
        }
        @case ('aipy') {
          <span class="trio">
            <svg viewBox="0 0 48 48">
              <defs>
                <linearGradient id="aipy-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stop-color="#FF5A8A" />
                  <stop offset="1" stop-color="#6D2FE0" />
                </linearGradient>
              </defs>
              <rect width="48" height="48" rx="11" fill="url(#aipy-grad)" />
              <path
                d="M18 9C19 17 21 19 29 21C21 23 19 25 18 33C17 25 15 23 7 21C15 19 17 17 18 9Z"
                fill="#fff"
              />
              <path
                d="M35 24C35.700 29 37 30.500 42 32C37 33.500 35.700 35 35 40C34.300 35 33 33.500 28 32C33 30.500 34.300 29 35 24Z"
                fill="#fff"
              />
            </svg>
            <svg viewBox="0 0 48 48">
              <path
                d="M23 5h-3c-5 0-7 2-7 6v5h10v2H10c-4 0-6 3-6 8s2 8 6 8h3v-5c0-4 3-7 7-7h9c3 0 5-2 5-5V11c0-4-4-6-11-6z"
                fill="#3776AB"
              />
              <path
                d="M25 43h3c5 0 7-2 7-6v-5H25v-2h13c4 0 6-3 6-8s-2-8-6-8h-3v5c0 4-3 7-7 7h-9c-3 0-5 2-5 5v7c0 4 4 6 11 6z"
                fill="#FFD43B"
              />
              <circle cx="18" cy="11" r="1.800" fill="#fff" />
              <circle cx="30" cy="37" r="1.800" fill="#fff" />
            </svg>
          </span>
        }
        @case ('ai') {
          <svg viewBox="0 0 48 48">
            <defs>
              <linearGradient id="ai-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stop-color="#FF5A8A" />
                <stop offset="1" stop-color="#6D2FE0" />
              </linearGradient>
            </defs>
            <rect width="48" height="48" rx="11" fill="url(#ai-grad)" />
            <path
              d="M18 9C19 17 21 19 29 21C21 23 19 25 18 33C17 25 15 23 7 21C15 19 17 17 18 9Z"
              fill="#fff"
            />
            <path
              d="M35 24C35.700 29 37 30.500 42 32C37 33.500 35.700 35 35 40C34.300 35 33 33.500 28 32C33 30.500 34.300 29 35 24Z"
              fill="#fff"
            />
          </svg>
        }
      }
    </span>
  `,
  styles: `
    :host {
      display: inline-block;
    }
    .tile {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 7px 10px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 14px;
    }
    .trio {
      display: inline-flex;
      gap: 6px;
    }
    svg {
      display: block;
      width: 32px;
      height: 32px;
    }
    svg.wide {
      width: 44px;
      height: 33px;
    }
    .trio:has(> :nth-child(4)) svg:not(.wide) {
      width: 28px;
      height: 28px;
    }
  `,
})
export class TechLogo {
  readonly name = input.required<TechName>();
}
