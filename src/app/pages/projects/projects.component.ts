import { Component, OnInit, computed, inject, input, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { LanguageService } from '../../core/language.service';

type ProjectKey = 'afromarket' | 'portfolio';

const PROJECTS_COPY = {
  de: {
    title: 'Projekte',
    intro: 'Wählen Sie ein Projekt aus, um Details zu Vorgehen, Umsetzung und Technologien zu sehen.',
    selectorLabel: 'Projekt auswählen',
    tabAriaLabel: 'Projektliste',
    afromarketTab: '1. AfroMarket',
    portfolioTab: '2. Portfolio',
    processTitle: 'Über das Projekt',
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
    valueTitle: 'Wie ich meinen Arbeitsprozess organisiert habe',
    valueItems: [
      'Klare Struktur von UI, Rollenlogik und Kernfunktionen',
      'Schrittweise Umsetzung von Payments, E-Mail-Flows und Produktseiten',
      'Kontinuierliche Weiterentwicklung mit Fokus auf Nutzerführung und Performance'
    ],
    showcaseTitle: 'Was ich gelernt habe',
    showcaseItems: [
      'Entwicklung kompletter Webanwendungen mit echter Geschäftslogik',
      'Strukturierung komplexer Rollen- und Frontend-Flows',
      'Umsetzung produktionsnaher Features von Konzeption bis Deployment'
    ],
    stackTitle: 'Technologien',
    stackItems: ['Angular', 'TypeScript', 'SCSS', 'Firebase', 'REST APIs'],
    workflowTitle: 'Links',
    workflowItems: ['GitHub', 'Netlify', 'CI/CD Deployment'],
    platformCta: 'Plattform ansehen',
    contactCta: 'Über ein ähnliches Projekt sprechen',
    portfolioEyebrow: 'Portfolio',
    portfolioProcessTitle: 'Über das Projekt',
    portfolioSummaryPrimary: 'Dieses Portfolio ist selbst eines meiner Projekte und zeigt meinen Aufbau als persönliche Produktpräsentation.',
    portfolioSummarySecondary: 'Ich habe die Seite als performante Angular-Anwendung konzipiert, um meine Arbeit, meinen Werdegang und meine Projekte in einer klaren, responsiven Benutzerführung zu präsentieren.',
    portfolioLogoLabel: 'Portfolio Startseite öffnen',
    portfolioProofTitle: 'Portfolio-Nachweise',
    portfolioProofs: ['Eigenes Produktkonzept und UI-System', 'Mehrsprachige Inhalte', 'Responsive Single-Page-Erfahrung', 'Saubere Navigation mit Section-Routing'],
    portfolioOverviewTitle: 'Projektüberblick',
    portfolioValueLead: 'Das Portfolio zeigt, wie ich mich selbst als Produkt denke und Inhalte in eine klare Nutzerführung übersetze.',
    portfolioValueSupport: 'Im Fokus stehen Struktur, Lesbarkeit, Performance und eine direkte Navigation zu den wichtigsten Informationen.',
    portfolioValueItems: ['Klare Aufteilung in Hero, Warum ich, Über mich und Projekte', 'Iterative Optimierung von UX, Typografie und Inhaltsdichte', 'Saubere Navigation zwischen Sektionen und Call-to-Actions'],
    portfolioShowcaseItems: ['Stärkere visuelle Hierarchie für Recruiter und Kundschaft', 'Konsequente Reduktion von Redundanz und unnötiger Komplexität', 'Besseres Zusammenspiel von Inhalt, Layout und persönlicher Positionierung'],
    portfolioStackItems: ['Angular', 'TypeScript', 'SCSS', 'Angular Router'],
    portfolioWorkflowItems: ['GitHub', 'Netlify', 'Iterative Weiterentwicklung'],
    portfolioCta: 'Home öffnen'
  },
  en: {
    title: 'Projects',
    intro: 'Select a project to view details about the process, implementation, and technologies.',
    selectorLabel: 'Choose a project',
    tabAriaLabel: 'Project list',
    afromarketTab: '1. AfroMarket',
    portfolioTab: '2. Portfolio',
    processTitle: 'About the project',
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
    valueTitle: 'How I organized my workflow',
    valueItems: [
      'Clear structure for UI, role logic, and core features',
      'Step-by-step delivery of payments, email flows, and product pages',
      'Continuous iteration focused on UX and performance'
    ],
    showcaseTitle: 'What I learned',
    showcaseItems: [
      'Building complete web applications with real business logic',
      'Structuring complex user-role and frontend flows',
      'Taking a product from concept to deployment'
    ],
    stackTitle: 'Technologies',
    stackItems: ['Angular', 'TypeScript', 'SCSS', 'Firebase', 'REST APIs'],
    workflowTitle: 'Links',
    workflowItems: ['GitHub', 'Netlify', 'CI/CD Deployment'],
    platformCta: 'View platform',
    contactCta: 'Discuss a similar project',
    portfolioEyebrow: 'Portfolio',
    portfolioProcessTitle: 'About the project',
    portfolioSummaryPrimary: 'This portfolio is itself one of my projects and presents how I structure my personal product showcase.',
    portfolioSummarySecondary: 'I designed the site as a performant Angular application to present my work, background, and projects through a clear and responsive user journey.',
    portfolioLogoLabel: 'Open portfolio home page',
    portfolioProofTitle: 'Portfolio proof points',
    portfolioProofs: ['Personal product concept and UI system', 'Multilingual content', 'Responsive single-page experience', 'Clean navigation with section routing'],
    portfolioOverviewTitle: 'Project overview',
    portfolioValueLead: 'The portfolio shows how I approach my own profile like a product and turn content into a clear user flow.',
    portfolioValueSupport: 'The focus is on structure, readability, performance, and direct navigation to the most important information.',
    portfolioValueItems: ['Clear split between hero, why me, about, and projects', 'Iterative refinement of UX, typography, and content density', 'Clean navigation between sections and call-to-actions'],
    portfolioShowcaseItems: ['Stronger visual hierarchy for recruiters and clients', 'Consistent reduction of redundancy and unnecessary complexity', 'Better alignment between content, layout, and personal positioning'],
    portfolioStackItems: ['Angular', 'TypeScript', 'SCSS', 'Angular Router'],
    portfolioWorkflowItems: ['GitHub', 'Netlify', 'Iterative updates'],
    portfolioCta: 'Open home'
  }
} as const;

@Component({
  selector: 'app-projects',
  imports: [RouterLink],
  host: {
    '[class.is-embedded]': 'embedded()'
  },
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  readonly embedded = input(false);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly languageService = inject(LanguageService);
  readonly activeProject = signal<ProjectKey>('afromarket');
  readonly copy = computed(() => PROJECTS_COPY[this.languageService.language()]);
  readonly projectTabs = computed(() => ([
    { key: 'afromarket' as const, label: this.copy().afromarketTab },
    { key: 'portfolio' as const, label: this.copy().portfolioTab }
  ]));

  ngOnInit(): void {
    if (this.route.snapshot.routeConfig?.path === 'projects') {
      void this.router.navigate(['/home'], {
        fragment: 'projects',
        replaceUrl: true
      });
    }
  }

  setActiveProject(project: ProjectKey): void {
    this.activeProject.set(project);
  }

  isActiveProject(project: ProjectKey): boolean {
    return this.activeProject() === project;
  }

}
