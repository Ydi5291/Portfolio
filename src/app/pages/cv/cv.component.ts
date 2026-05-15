import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LanguageService } from '../../core/language.service';

const CV_COPY = {
  de: {
    eyebrow: 'Lebenslauf',
    title: 'Mein Lebenslauf als PDF',
    intro: 'Kurz, direkt und sofort downloadbar.',
    highlights: ['Angular / React', 'Frontend Development', 'Praxisnahe Projekte'],
    downloadCta: 'CV herunterladen',
    contactCta: 'Mich kontaktieren',
    metaLabel: 'PDF · Softwareentwickler'
  },
  en: {
    eyebrow: 'Resume',
    title: 'My resume as a PDF',
    intro: 'Short, direct, and ready to download.',
    highlights: ['Angular / React', 'Frontend development', 'Hands-on projects'],
    downloadCta: 'Download CV',
    contactCta: 'Contact me',
    metaLabel: 'PDF · Software Developer'
  }
} as const;

@Component({
  selector: 'app-cv',
  imports: [RouterLink],
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.scss'
})
export class CvComponent {
  private readonly languageService = inject(LanguageService);
  readonly copy = computed(() => CV_COPY[this.languageService.language()]);
  readonly cvUrl = 'assets/CV-Softwareentwickler.pdf';
}
