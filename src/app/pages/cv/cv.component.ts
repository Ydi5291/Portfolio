import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LanguageService } from '../../core/language.service';

const CV_COPY = {
  de: {
    eyebrow: 'Lebenslauf',
    title: 'Mein Lebenslauf als PDF',
    intro: 'Kurz, direkt und sofort downloadbar.',
    highlights: ['Angular / React', 'Frontend Development', 'Praxisnahe Projekte'],
    recruiterHint: 'Hier können Sie meinen Lebenslauf als PDF herunterladen, entweder über den Button „CV herunterladen“ oder direkt per Klick auf die Vorschau.',
    downloadCta: 'CV herunterladen',
    contactCta: 'Mich kontaktieren',
    metaLabel: 'PDF · Softwareentwickler'
  },
  en: {
    eyebrow: 'Resume',
    title: 'My resume as a PDF',
    intro: 'Short, direct, and ready to download.',
    highlights: ['Angular / React', 'Frontend development', 'Hands-on projects'],
    recruiterHint: 'Recruiters can download my CV as a PDF either by clicking the “Download CV” button or directly on the preview image.',
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
