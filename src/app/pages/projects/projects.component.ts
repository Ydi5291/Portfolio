import { Component, OnInit, computed, inject, input } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { LanguageService } from '../../core/language.service';

const PROJECTS_COPY = {
  de: {
    title: 'Projekte',
    intro: 'Ein ausgewähltes Projekt, das meinen Ansatz zeigt, komplette Webprodukte von der Idee bis zum produktiven Deployment zu entwickeln.',
    eyebrow: 'Hauptprojekt – AfroMarket',
    summaryPrimary: 'AfroMarket ist eine E-Commerce- und Marketplace-Plattform für Afro-Commerce-Händler und ihre Kunden.',
    summarySecondary: 'Das Projekt wurde vollständig eigenständig konzipiert, entwickelt und produktiv veröffentlicht – von UI/UX über Backend-Logik bis hin zu Zahlungs- und Kommunikationssystemen. Dazu gehören die Integration des KI-Chatbots Diamal über die OpenAI APIs sowie Google Routes API und Maps API, damit Kundinnen und Kunden Afro-Shops im Umkreis von 30 km schneller und einfacher finden können.',
    logoLabel: 'AfroMarket live ansehen',
    liveLabel: 'Live',
    proofTitle: 'Projekt-Nachweise',
    proofs: [
      'Eigenständige Entwicklung eines vollständigen Webprodukts',
      'Live im produktiven Einsatz',
      'Integration von Payments und Transaktions-E-Mails',
      'Multi-Rollen-System (Shop-Owner & Delivery-User)'
    ],
    valueLead: 'AfroMarket zeigt meine Fähigkeit, nutzerzentrierte und funktionale Webanwendungen zu entwickeln, die über reine UI-Demos hinausgehen.',
    valueSupport: 'Der Fokus liegt auf klarer Benutzerführung, Performance und einem durchgängigen Produktfluss.',
    valueTitle: 'Mehrwert',
    valueItems: [
      'Klare Navigation für schnellen Zugang zu Produkten, Services und Anbietern',
      'Responsive Interface für eine einfache Nutzung auf Mobile und Desktop',
      'Installierbare PWA mit App-Feeling und optimierten Ladezeiten'
    ],
    showcaseTitle: 'Was das Projekt zeigt',
    showcaseItems: [
      'Entwicklung kompletter Webanwendungen mit echter Geschäftslogik',
      'Strukturierung komplexer UI- und Nutzerrollen-Systeme',
      'Umsetzung von Authentifizierung, Payments und E-Mail-Flows',
      'Fähigkeit, ein Produkt von Anfang bis Deployment zu führen'
    ],
    integrationsTitle: 'Integrationen',
    integrationsItems: ['Payments: Stripe Connect', 'E-Mail: Brevo für Transaktionen und Benachrichtigungen', 'KI-Chatbot: Diamal mit OpenAI APIs', 'Geolokalisierung: Google Routes API und Maps API für Afro-Shops im Umkreis von 30 km'],
    stackTitle: 'Stack',
    stackItems: ['Angular', 'TypeScript', 'SCSS', 'Firebase', 'REST APIs'],
    workflowTitle: 'Workflow und Deployment',
    workflowItems: ['GitHub', 'Netlify', 'CI/CD Deployment'],
    platformCta: 'Plattform ansehen',
    contactCta: 'Über ein ähnliches Projekt sprechen'
  },
  en: {
    title: 'Projects',
    intro: 'A selected project that shows my approach to building complete web products from the initial idea to production deployment.',
    eyebrow: 'Main project – AfroMarket',
    summaryPrimary: 'AfroMarket is an e-commerce and marketplace platform for Afro-commerce merchants and their customers.',
    summarySecondary: 'The project was fully designed, developed, and launched independently, from UI/UX and backend logic to payments and communication systems. This includes the integration of the AI chatbot Diamal through the OpenAI APIs, as well as Google Routes API and Maps API, helping customers find nearby Afro shops within a 30 km radius more quickly and easily.',
    logoLabel: 'View AfroMarket live',
    liveLabel: 'Live',
    proofTitle: 'Project proof points',
    proofs: [
      'Independent development of a complete web product',
      'Live in production',
      'Payments and transactional email integration',
      'Multi-role system (shop owner & delivery user)'
    ],
    valueLead: 'AfroMarket shows my ability to build user-centered and functional web applications that go beyond simple UI demos.',
    valueSupport: 'The focus is on clear user flows, performance, and an end-to-end product experience.',
    valueTitle: 'Value delivered',
    valueItems: [
      'Clear navigation for fast access to products, services, and vendors',
      'Responsive interface for easy use on mobile and desktop',
      'Installable PWA experience with optimized loading times'
    ],
    showcaseTitle: 'What this project demonstrates',
    showcaseItems: [
      'Development of complete web applications with real business logic',
      'Structuring complex UI and user-role systems',
      'Implementation of authentication, payments, and email flows',
      'Ability to drive a product from concept to deployment'
    ],
    integrationsTitle: 'Integrations',
    integrationsItems: ['Payments: Stripe Connect', 'Email: Brevo for transactions and notifications', 'AI chatbot: Diamal with OpenAI APIs', 'Geolocation: Google Routes API and Maps API for Afro shops within a 30 km radius'],
    stackTitle: 'Stack',
    stackItems: ['Angular', 'TypeScript', 'SCSS', 'Firebase', 'REST APIs'],
    workflowTitle: 'Workflow and deployment',
    workflowItems: ['GitHub', 'Netlify', 'CI/CD Deployment'],
    platformCta: 'View platform',
    contactCta: 'Discuss a similar project'
  }
} as const;

@Component({
  selector: 'app-projects',
  imports: [RouterLink],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  readonly embedded = input(false);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly languageService = inject(LanguageService);
  readonly copy = computed(() => PROJECTS_COPY[this.languageService.language()]);

  ngOnInit(): void {
    if (this.route.snapshot.routeConfig?.path === 'projects') {
      void this.router.navigate(['/home'], {
        fragment: 'projects',
        replaceUrl: true
      });
    }
  }

}
