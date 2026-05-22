import { Component, OnInit, computed, inject, input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LanguageService } from '../../core/language.service';

const ABOUT_COPY = {
  de: {
    title: 'Über mich',
    lead: 'Ich bin Youssouf Diallo, Frontend Developer mit Fokus auf moderne Webanwendungen.',
    intro: '',
    projectsCta: 'Projekte ansehen',
    contactCta: 'Mich kontaktieren',
    profileTitle: 'Kurzprofil',
    profileItems: [
      'Fokus: Frontend und UI-Architektur',
      'Stack: Angular, React, TypeScript, SCSS',
      'Arbeitsweise: strukturiert, zuverlässig, lernfähig'
    ],
    journeyTitle: 'Werdegang',
    journeyEyebrow: 'Profilweg',
    journeyItems: [
      { label: 'Guinea', text: 'Abitur und erste Orientierung in Wirtschaftsinformatik' },
      { label: 'Deutschland', text: 'Berufserfahrung, neue Perspektive und klare Neuausrichtung' },
      { label: 'Heute', text: 'starker Fokus auf Frontend-Entwicklung durch praxisnahe Projekte' }
    ],
    stackTitle: 'Stack',
    stackItems: ['Angular', 'React', 'TypeScript', 'SCSS', 'Firebase', 'REST APIs', 'Git / GitHub'],
    focusTitle: 'Schwerpunkte',
    focusEyebrow: 'Fokus',
    focusItems: [
      'Modulare und skalierbare Frontend-Architekturen',
      'Responsive und nutzerzentrierte Interfaces',
      'Umsetzung produktionsnaher Webanwendungen'
    ],
    goalTitle: 'Ziel',
    goalText: 'Ich entwickle klare, performante und wartbare Webanwendungen mit Fokus auf Nutzer und Produktqualität.',
    detailsTitle: 'Mehr über mich',
    detailsParagraphs: [
      'Ich habe mich bewusst für die Softwareentwicklung entschieden und arbeite heute an produktionsnahen Frontend-Projekten.',
      'Mein Ziel ist ein professionelles Team, in dem ich weiter wachsen und echten Mehrwert liefern kann.'
    ]
  },
  en: {
    title: 'About me',
    lead: 'I am Youssouf Diallo, a frontend developer focused on modern web applications.',
    intro: '',
    projectsCta: 'View projects',
    contactCta: 'Contact me',
    profileTitle: 'Profile',
    profileItems: [
      'Focus: frontend and UI architecture',
      'Stack: Angular, React, TypeScript, SCSS',
      'Work style: structured, reliable, fast-learning'
    ],
    journeyTitle: 'Background',
    journeyEyebrow: 'Path',
    journeyItems: [
      { label: 'Guinea', text: 'High school graduation and an early direction toward business informatics' },
      { label: 'Germany', text: 'Work experience, a new perspective, and a clear career shift' },
      { label: 'Today', text: 'strong focus on frontend development through hands-on projects' }
    ],
    stackTitle: 'Stack',
    stackItems: ['Angular', 'React', 'TypeScript', 'SCSS', 'Firebase', 'REST APIs', 'Git / GitHub'],
    focusTitle: 'Main strengths',
    focusEyebrow: 'Focus',
    focusItems: [
      'Modular and scalable frontend architectures',
      'Responsive and user-centered interfaces',
      'Production-oriented web applications'
    ],
    goalTitle: 'Goal',
    goalText: 'I build clear, performant, and maintainable web applications with a strong focus on users and product quality.',
    detailsTitle: 'More about me',
    detailsParagraphs: [
      'I consciously chose software development and now work on production-oriented frontend projects.',
      'My goal is to grow within a professional team and deliver real value through my work.'
    ]
  }
} as const;

@Component({
  selector: 'app-about',
  host: {
    '[class.is-embedded]': 'embedded()'
  },
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {
  readonly embedded = input(false);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly languageService = inject(LanguageService);
  readonly copy = computed(() => ABOUT_COPY[this.languageService.language()]);

  ngOnInit(): void {
    if (this.route.snapshot.routeConfig?.path === 'about') {
      void this.router.navigate(['/home'], {
        fragment: 'about',
        replaceUrl: true
      });
    }
  }

}
