import { Component, OnInit, computed, inject, input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RevealOnScrollDirective } from '../../core/reveal-on-scroll.directive';
import { LanguageService } from '../../core/language.service';

type StackLogo = {
  src: string;
  label: string;
};

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
      { label: 'Heute', text: 'Fortbildung als Frontend Developer bei der Developer Akademie in München (Remote), außerdem starker Fokus auf Frontend-Entwicklung durch praxisnahe Projekte' }
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
      { label: 'Today', text: 'Further training as a frontend developer at Developer Akademie in Munich (remote), combined with a strong focus on frontend development through hands-on projects' }
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
  },
  fr: {
    title: 'À propos',
    lead: 'Je suis Youssouf Diallo, développeur frontend spécialisé dans les applications web modernes.',
    intro: '',
    projectsCta: 'Voir les projets',
    contactCta: 'Me contacter',
    profileTitle: 'Profil',
    profileItems: [
      'Spécialité : frontend et architecture UI',
      'Stack : Angular, React, TypeScript, SCSS',
      'Façon de travailler : structuré, fiable, apprend vite'
    ],
    journeyTitle: 'Parcours',
    journeyEyebrow: 'Chemin',
    journeyItems: [
      { label: 'Guinée', text: 'Baccalauréat et premiers pas en informatique de gestion' },
      { label: 'Allemagne', text: 'Expérience professionnelle, nouvelle perspective et reconversion assumée' },
      { label: 'Aujourd\'hui', text: 'Formation de développeur frontend à la Developer Akademie de Munich (à distance) et forte spécialisation frontend à travers des projets concrets' }
    ],
    stackTitle: 'Stack',
    stackItems: ['Angular', 'React', 'TypeScript', 'SCSS', 'Firebase', 'REST APIs', 'Git / GitHub'],
    focusTitle: 'Points forts',
    focusEyebrow: 'Focus',
    focusItems: [
      'Architectures frontend modulaires et évolutives',
      'Interfaces responsives centrées sur l\'utilisateur',
      'Applications web prêtes pour la production'
    ],
    goalTitle: 'Objectif',
    goalText: 'Je développe des applications web claires, performantes et maintenables, centrées sur l\'utilisateur et la qualité du produit.',
    detailsTitle: 'Plus sur moi',
    detailsParagraphs: [
      'J\'ai choisi consciemment le développement logiciel et je travaille aujourd\'hui sur des projets frontend en production.',
      'Mon objectif : rejoindre une équipe professionnelle où je peux continuer à progresser et apporter une vraie valeur.'
    ]
  }
} as const;

@Component({
  selector: 'app-about',
  imports: [RevealOnScrollDirective],
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
  readonly stackLogos: StackLogo[] = [
    { src: 'assets/images/Angular.png', label: 'Angular' },
    { src: 'assets/images/CSS.png', label: 'CSS' },
    { src: 'assets/images/Firebase.png', label: 'Firebase' },
    { src: 'assets/images/Git.png', label: 'Git' },
    { src: 'assets/images/HTML.png', label: 'HTML' },
    { src: 'assets/images/JavaScript.png', label: 'JavaScript' },
    { src: 'assets/images/REST-API.png', label: 'REST APIs' },
    { src: 'assets/images/TypeScript.png', label: 'TypeScript' }
  ];

  ngOnInit(): void {
    if (this.route.snapshot.routeConfig?.path === 'about') {
      void this.router.navigate(['/home'], {
        fragment: 'about',
        replaceUrl: true
      });
    }
  }

}
