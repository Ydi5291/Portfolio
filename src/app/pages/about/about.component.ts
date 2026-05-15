import { Component, OnInit, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';

import { LanguageService } from '../../core/language.service';

const ABOUT_COPY = {
  de: {
    title: 'Über mich',
    lead: 'Ich bin Youssouf Diallo, Frontend Developer und Gründer von AfroMarket, der digitalen Plattform für afroeuropäische Geschäfte.',
    intro: 'Mein Schwerpunkt liegt in der Frontend-Entwicklung mit Angular und React, ergänzt durch praktische Erfahrung in der Entwicklung kompletter Webplattformen.',
    projectsCta: 'Projekte ansehen',
    contactCta: 'Mich kontaktieren',
    profileTitle: 'Kurzprofil',
    profileItems: [
      'Fokus: Frontend Development und UI-Architektur',
      'Stack: Angular, React, TypeScript, SCSS, Firebase, REST APIs',
      'Arbeitsweise: strukturiert, produktorientiert, sauberer Code',
      'Tools: Git, GitHub, Netlify, Stripe, E-Mail-Services'
    ],
    journeyTitle: 'Werdegang',
    journeyEyebrow: 'Profilweg',
    journeyItems: [
      { label: 'Guinea', text: 'Abitur, anschließend Studium der Wirtschaftsinformatik (3 Semester)' },
      { label: 'Deutschland', text: 'Ausbildung im Bereich Lagerlogistik + mehrjährige Berufserfahrung' },
      { label: '2024', text: 'bewusste Neuausrichtung in Richtung Softwareentwicklung' },
      { label: 'Heute', text: 'intensive Vertiefung in der Frontend-Entwicklung durch praxisnahe Projekte' }
    ],
    stackTitle: 'Stack',
    stackItems: ['Angular', 'React', 'TypeScript', 'HTML', 'SCSS', 'Firebase', 'REST APIs', 'Git / GitHub', 'Netlify', 'Stripe Connect', 'Brevo'],
    focusTitle: 'Schwerpunkte',
    focusEyebrow: 'Fokus',
    focusItems: [
      'Entwicklung modularer und skalierbarer Frontend-Architekturen',
      'Umsetzung responsiver und nutzerzentrierter Interfaces',
      'Aufbau und Deployment vollständiger Webanwendungen',
      'Arbeit mit realen Use-Cases aus eigenen Projekten'
    ],
    goalTitle: 'Ziel',
    goalText: 'Ich entwickle Webanwendungen, die funktional, klar strukturiert und langfristig wartbar sind – mit echtem Fokus auf Nutzer und Produktqualität.',
    detailsTitle: 'Mehr über mich',
    detailsParagraphs: [
      'Ich habe früh ein Interesse an Technologie entwickelt und mich nach mehreren beruflichen Stationen bewusst für die Softwareentwicklung entschieden.',
      'Heute arbeite ich intensiv an eigenen Projekten wie AfroMarket, einer E-Commerce-Plattform mit Authentifizierung, Zahlungsintegration und rollenbasierten Dashboards.',
      'Mein Ziel ist es, mich in einem professionellen Entwicklerteam weiterzuentwickeln und an echten, produktionsnahen Anwendungen zu arbeiten.'
    ]
  },
  en: {
    title: 'About me',
    lead: 'I am Youssouf Diallo, web developer and founder of AfroMarket, the digital platform for Afro-European businesses.',
    intro: 'My main focus is frontend development with Angular and React, complemented by hands-on experience building complete web platforms.',
    projectsCta: 'View projects',
    contactCta: 'Contact me',
    profileTitle: 'Profile',
    profileItems: [
      'Focus: Frontend development and UI architecture',
      'Stack: Angular, React, TypeScript, SCSS, Firebase, REST APIs',
      'Work style: structured, product-oriented, clean code',
      'Tools: Git, GitHub, Netlify, Stripe, email services'
    ],
    journeyTitle: 'Background',
    journeyEyebrow: 'Path',
    journeyItems: [
      { label: 'Guinea', text: 'High school diploma, followed by studies in business informatics (3 semesters)' },
      { label: 'Germany', text: 'Professional training in warehouse logistics plus several years of work experience' },
      { label: '2024', text: 'deliberate career shift toward software development' },
      { label: 'Today', text: 'stronger frontend specialization through hands-on projects' }
    ],
    stackTitle: 'Stack',
    stackItems: ['Angular', 'React', 'TypeScript', 'HTML', 'SCSS', 'Firebase', 'REST APIs', 'Git / GitHub', 'Netlify', 'Stripe Connect', 'Brevo'],
    focusTitle: 'Main strengths',
    focusEyebrow: 'Focus',
    focusItems: [
      'Developing modular and scalable frontend architectures',
      'Building responsive and user-centered interfaces',
      'Delivering and deploying complete web applications',
      'Working with real use cases from personal projects'
    ],
    goalTitle: 'Goal',
    goalText: 'I build web applications that are functional, clearly structured, and maintainable in the long term, with a real focus on users and product quality.',
    detailsTitle: 'More about me',
    detailsParagraphs: [
      'I developed an early interest in technology and consciously chose software development after several professional stages.',
      'Today I work intensively on personal projects such as AfroMarket, an e-commerce platform with authentication, payment integration, and role-based dashboards.',
      'My goal is to grow within a professional development team and contribute to real, production-oriented applications.'
    ]
  }
} as const;

@Component({
  selector: 'app-about',
  imports: [RouterLink],
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
