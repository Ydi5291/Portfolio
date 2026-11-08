import { Component, computed, inject } from '@angular/core';

import { LanguageService } from '../../core/language.service';

const IMPRESSUM_COPY = {
  de: {
    eyebrow: 'Rechtliches',
    title: 'Impressum',
    intro: 'Pflichtangaben und direkte Kontaktmöglichkeiten in einer klaren, kompakten Übersicht.',
    legalTitle: 'Anbieter',
    legalName: 'Youssouf Diallo',
    legalItems: [
      'Kapuzinerring 26',
      '59457 Werl',
      'Deutschland'
    ],
    legalBadge: 'Adresse',
    contactTitle: 'Kontakt',
    contactBadge: 'Direkt',
    phoneLabel: 'Telefon',
    phoneValue: '+49 162 6291461',
    emailLabel: 'E-Mail',
    emailValue: 'youssoufdiamaldiallo@gmail.com'
  },
  en: {
    eyebrow: 'Legal',
    title: 'Legal notice',
    intro: 'Required publisher information and direct contact details presented in a clean, compact layout.',
    legalTitle: 'Provider',
    legalName: 'Youssouf Diallo',
    legalItems: [
      'Kapuzinerring 26',
      '59457 Werl',
      'Germany'
    ],
    legalBadge: 'Address',
    contactTitle: 'Contact',
    contactBadge: 'Direct',
    phoneLabel: 'Phone',
    phoneValue: '+49 162 6291461',
    emailLabel: 'Email',
    emailValue: 'youssoufdiamaldiallo@gmail.com'
  },
  fr: {
    eyebrow: 'Informations légales',
    title: 'Mentions légales',
    intro: 'Informations obligatoires et coordonnées directes, présentées de façon claire et compacte.',
    legalTitle: 'Éditeur',
    legalName: 'Youssouf Diallo',
    legalItems: [
      'Kapuzinerring 26',
      '59457 Werl',
      'Allemagne'
    ],
    legalBadge: 'Adresse',
    contactTitle: 'Contact',
    contactBadge: 'Direct',
    phoneLabel: 'Téléphone',
    phoneValue: '+49 162 6291461',
    emailLabel: 'E-mail',
    emailValue: 'youssoufdiamaldiallo@gmail.com'
  }
} as const;

@Component({
  selector: 'app-impressum',
  templateUrl: './impressum.component.html',
  styleUrl: './impressum.component.scss'
})
export class ImpressumComponent {
  private readonly languageService = inject(LanguageService);
  readonly copy = computed(() => IMPRESSUM_COPY[this.languageService.language()]);
}
