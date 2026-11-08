import { Component, OnInit, computed, inject, input, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { RevealOnScrollDirective } from '../../core/reveal-on-scroll.directive';
import { LanguageService } from '../../core/language.service';

type ProjectKey = 'afromarket' | 'mitarbeiter-management' | 'portfolio';

const PROJECTS_COPY = {
  de: {
    title: 'Projekte',
    intro: 'Wählen Sie ein Projekt aus, um Details zu Vorgehen, Umsetzung und Technologien zu sehen.',
    selectorLabel: 'Projekt auswählen',
    tabAriaLabel: 'Projektliste',
    afromarketTab: '1. AfroConnect',
    mitarbeiterManagementTab: '2. Mitarbeiter Management',
    portfolioTab: '3. Portfolio',
    processTitle: 'Über das Projekt',
    summaryPrimary: 'AfroConnect ist eine E-Commerce- und Marketplace-Plattform für Afro-Commerce-Händler und ihre Kunden.',
    summarySecondary: 'Das Projekt wurde vollständig eigenständig konzipiert, entwickelt und produktiv veröffentlicht – von UI/UX über Backend-Logik bis hin zu Zahlungs- und Kommunikationssystemen. Dazu gehören die Integration des KI-Chatbots Diamal über die OpenAI APIs sowie Google Routes API und Maps API, damit Kundinnen und Kunden Afro-Shops im Umkreis von 30 km schneller und einfacher finden können.',
    logoLabel: 'AfroConnect live ansehen',
    liveLabel: 'Live',
    proofTitle: 'Projekt-Nachweise',
    proofs: [
      'Eigenständige Entwicklung eines vollständigen Webprodukts',
      'Live im produktiven Einsatz',
      'Integration von Payments- und Kommunikationssysteme',
      'Multi-Rollen-System (Shop-Owner & Delivery-User)'
    ],
    valueLead: 'AfroConnect zeigt meine Fähigkeit, nutzerzentrierte und funktionale Webanwendungen zu entwickeln, die über reine UI-Demos hinausgehen.',
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
      'Umsetzung produktionsnaher Features von Konzeption bis Deployment',
      'Verständnis für die unterschiedlichen Anforderungen von B2B- und B2C-Produkten'
    ],
    stackTitle: 'Technologien',
    stackItems: ['Angular', 'TypeScript', 'SCSS', 'Firebase', 'REST APIs'],
    workflowTitle: 'Links',
    workflowItems: ['GitHub', 'Netlify', 'CI/CD Deployment'],
    platformCta: 'Plattform ansehen',
    contactCta: 'Über ein ähnliches Projekt sprechen',
    mitarbeiterLogoLabel: 'Mitarbeiter Management live ansehen',
    mitarbeiterOverviewTitle: 'Über das Projekt',
    mitarbeiterSummaryPrimary: 'Mitarbeiter Management ist eine HR- und PWA-Anwendung zur Verwaltung von Mitarbeitenden, Abwesenheiten, Freigaben und Arbeitszeiten.',
    mitarbeiterSummarySecondary: 'Die Anwendung folgt einem mandantenfähigen SaaS-Modell: Jede Firma erhält ihren eigenen Bereich mit Mitarbeitenden, Einladungen, Urlaubsanträgen und Zeiterfassung. Rollen wie Superadmin, Admin, Arbeitgeber und Arbeitnehmer steuern Navigation, Rechte und Ansichten.',
    mitarbeiterProofTitle: 'Projekt-Nachweise',
    mitarbeiterProofs: ['SaaS-Architektur mit Multi-Tenant-Kontext', 'Rollenbasierte Benutzerführung für vier Nutzergruppen', 'PWA für Zeiterfassung, Abwesenheiten und HR-Freigaben', 'Sensible Operationen über Firebase Functions zentralisiert'],
    mitarbeiterValueLead: 'Das Projekt zeigt, dass ich komplexe Business-Flows mit klaren Rollen, Freigabewegen und isolierten Mandantenstrukturen in ein skalierbares Frontend übersetzen kann.',
    mitarbeiterValueSupport: 'Im Fokus stehen sichere Prozessführung, saubere Rechtevergabe und eine Produktstruktur, die sowohl HR-Teams als auch Mitarbeitende effizient unterstützt.',
    mitarbeiterValueItems: ['Modulare Struktur für Onboarding, Einladungen, Rollenverwaltung, Urlaubsanträge und Freigaben', 'Klare Trennung zwischen Client-Logik, Tenant-Kontext und serverseitigen Sicherheitsregeln', 'Produktfluss auf wiederkehrende HR-Prozesse wie Abwesenheiten, Freigaben und Zeiterfassung ausgerichtet'],
    mitarbeiterShowcaseItems: ['Umsetzung eines echten B2B-SaaS-Produkts mit rollenabhängigen Oberflächen', 'Verknüpfung von Angular-Frontend, Firestore, Authentifizierung und Cloud Functions', 'Abbildung wiederkehrender HR-Prozesse in wartbare UI- und Routing-Strukturen'],
    mitarbeiterStackItems: ['Angular', 'TypeScript', 'SCSS', 'Firebase Auth', 'Firestore', 'Cloud Functions', 'PWA'],
    mitarbeiterWorkflowItems: ['Netlify', 'Firebase', 'Serverseitige Geschäftsregeln'],
    mitarbeiterCta: 'Produkt ansehen',
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
    afromarketTab: '1. AfroConnect',
    mitarbeiterManagementTab: '2. Mitarbeiter Management',
    portfolioTab: '3. Portfolio',
    processTitle: 'About the project',
    summaryPrimary: 'AfroConnect is an e-commerce and marketplace platform for Afro-commerce merchants and their customers.',
    summarySecondary: 'The project was fully designed, developed, and launched independently, from UI/UX and backend logic to payments and communication systems. This includes the integration of the AI chatbot Diamal through the OpenAI APIs, as well as Google Routes API and Maps API, helping customers find nearby Afro shops within a 30 km radius more quickly and easily.',
    logoLabel: 'View AfroConnect live',
    liveLabel: 'Live',
    proofTitle: 'Project proof points',
    proofs: [
      'Independent development of a complete web product',
      'Live in production',
        'Integration of payment and communication systems',
      'Multi-role system (shop owner & delivery user)'
    ],
    valueLead: 'AfroConnect shows my ability to build user-centered and functional web applications that go beyond simple UI demos.',
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
      'Taking a product from concept to deployment',
      'Understanding the different requirements of B2B and B2C products'
    ],
    stackTitle: 'Technologies',
    stackItems: ['Angular', 'TypeScript', 'SCSS', 'Firebase', 'REST APIs'],
    workflowTitle: 'Links',
    workflowItems: ['GitHub', 'Netlify', 'CI/CD Deployment'],
    platformCta: 'View platform',
    contactCta: 'Discuss a similar project',
    mitarbeiterLogoLabel: 'View Mitarbeiter Management live',
    mitarbeiterOverviewTitle: 'About the project',
    mitarbeiterSummaryPrimary: 'Mitarbeiter Management is an HR and PWA application built to manage employees, leave, approvals, and work time tracking.',
    mitarbeiterSummarySecondary: 'The product follows a multi-tenant SaaS model: each company gets its own workspace with employees, invitations, leave requests, and time entries. Roles such as superadmin, admin, employer, and employee drive navigation, permissions, and view modes.',
    mitarbeiterProofTitle: 'Project proof points',
    mitarbeiterProofs: ['SaaS architecture with tenant-aware context', 'Role-based UX for four user types', 'PWA flows for time tracking, leave, and HR approvals', 'Sensitive operations centralized through Firebase Functions'],
    mitarbeiterValueLead: 'This project shows that I can turn complex business workflows with role management, approval chains, and tenant isolation into a scalable frontend product.',
    mitarbeiterValueSupport: 'The focus is on secure process design, clean permission boundaries, and a product structure that supports both HR teams and employees efficiently.',
    mitarbeiterValueItems: ['Modular feature structure for onboarding, invitations, role management, leave requests, and approvals', 'Clear separation between client logic, tenant context, and server-side security rules', 'Product flow centered on recurring HR tasks such as absences, approvals, and time tracking'],
    mitarbeiterShowcaseItems: ['Delivery of a real B2B SaaS product with role-specific interfaces', 'Integration of Angular frontend, Firestore, authentication, and Cloud Functions', 'Mapping recurring HR workflows into maintainable UI and routing structures'],
    mitarbeiterStackItems: ['Angular', 'TypeScript', 'SCSS', 'Firebase Auth', 'Firestore', 'Cloud Functions', 'PWA'],
    mitarbeiterWorkflowItems: ['Netlify', 'Firebase', 'Server-side business rules'],
    mitarbeiterCta: 'View product',
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
  },
  fr: {
    title: 'Projets',
    intro: 'Sélectionnez un projet pour voir la démarche, la réalisation et les technologies.',
    selectorLabel: 'Choisir un projet',
    tabAriaLabel: 'Liste des projets',
    afromarketTab: '1. AfroConnect',
    mitarbeiterManagementTab: '2. Mitarbeiter Management',
    portfolioTab: '3. Portfolio',
    processTitle: 'À propos du projet',
    summaryPrimary: 'AfroConnect est une plateforme e-commerce et marketplace pour les commerçants afro et leurs clients.',
    summarySecondary: 'J\'ai conçu, développé et mis en production ce projet entièrement seul, de l\'UI/UX à la logique backend, en passant par les paiements et les systèmes de communication. Cela inclut l\'intégration du chatbot IA Diamal via les API OpenAI, ainsi que des API Google Routes et Maps, pour aider les clients à trouver rapidement les boutiques afro dans un rayon de 30 km.',
    logoLabel: 'Voir AfroConnect en ligne',
    liveLabel: 'En ligne',
    proofTitle: 'Preuves concrètes',
    proofs: [
      'Développement autonome d\'un produit web complet',
      'En production',
      'Intégration de systèmes de paiement et de communication',
      'Système multi-rôles (commerçant & livreur)'
    ],
    valueLead: 'AfroConnect montre ma capacité à créer des applications web fonctionnelles et centrées sur l\'utilisateur, bien au-delà de simples démos d\'interface.',
    valueSupport: 'L\'accent est mis sur des parcours utilisateur clairs, la performance et une expérience produit de bout en bout.',
    valueTitle: 'Comment j\'ai organisé mon travail',
    valueItems: [
      'Structure claire de l\'UI, de la logique des rôles et des fonctionnalités clés',
      'Mise en place progressive des paiements, des e-mails et des pages produits',
      'Améliorations continues axées sur l\'UX et la performance'
    ],
    showcaseTitle: 'Ce que j\'ai appris',
    showcaseItems: [
      'Créer des applications web complètes avec une vraie logique métier',
      'Structurer des parcours frontend et des rôles complexes',
      'Mener un produit de la conception au déploiement',
      'Comprendre les besoins différents des produits B2B et B2C'
    ],
    stackTitle: 'Technologies',
    stackItems: ['Angular', 'TypeScript', 'SCSS', 'Firebase', 'REST APIs'],
    workflowTitle: 'Liens',
    workflowItems: ['GitHub', 'Netlify', 'Déploiement CI/CD'],
    platformCta: 'Voir la plateforme',
    contactCta: 'Parler d\'un projet similaire',
    mitarbeiterLogoLabel: 'Voir Mitarbeiter Management en ligne',
    mitarbeiterOverviewTitle: 'À propos du projet',
    mitarbeiterSummaryPrimary: 'Mitarbeiter Management est une application RH (PWA) pour gérer les employés, les absences, les validations et le temps de travail.',
    mitarbeiterSummarySecondary: 'Le produit suit un modèle SaaS multi-tenant : chaque entreprise dispose de son propre espace avec ses employés, invitations, demandes de congés et pointages. Les rôles super admin, admin, employeur et employé déterminent la navigation, les droits et les vues.',
    mitarbeiterProofTitle: 'Preuves concrètes',
    mitarbeiterProofs: ['Architecture SaaS multi-tenant', 'Parcours selon le rôle pour quatre types d\'utilisateurs', 'PWA pour le pointage, les absences et les validations RH', 'Opérations sensibles centralisées dans Firebase Functions'],
    mitarbeiterValueLead: 'Ce projet montre que je sais transformer des processus métier complexes, avec gestion des rôles, circuits de validation et isolation des clients, en un produit frontend évolutif.',
    mitarbeiterValueSupport: 'L\'accent est mis sur des processus sécurisés, une gestion propre des droits et une structure produit efficace pour les équipes RH comme pour les employés.',
    mitarbeiterValueItems: ['Structure modulaire pour l\'onboarding, les invitations, les rôles, les congés et les validations', 'Séparation claire entre logique client, contexte tenant et règles de sécurité côté serveur', 'Parcours centré sur les tâches RH récurrentes : absences, validations et pointage'],
    mitarbeiterShowcaseItems: ['Réalisation d\'un vrai produit SaaS B2B avec des interfaces selon le rôle', 'Intégration du frontend Angular avec Firestore, l\'authentification et les Cloud Functions', 'Traduction de processus RH récurrents en structures UI et de routage maintenables'],
    mitarbeiterStackItems: ['Angular', 'TypeScript', 'SCSS', 'Firebase Auth', 'Firestore', 'Cloud Functions', 'PWA'],
    mitarbeiterWorkflowItems: ['Netlify', 'Firebase', 'Règles métier côté serveur'],
    mitarbeiterCta: 'Voir le produit',
    portfolioEyebrow: 'Portfolio',
    portfolioProcessTitle: 'À propos du projet',
    portfolioSummaryPrimary: 'Ce portfolio est lui-même un de mes projets : il présente mon profil comme un produit.',
    portfolioSummarySecondary: 'Je l\'ai conçu comme une application Angular performante pour présenter mon travail, mon parcours et mes projets dans une navigation claire et responsive.',
    portfolioLogoLabel: 'Ouvrir l\'accueil du portfolio',
    portfolioProofTitle: 'Preuves concrètes',
    portfolioProofs: ['Concept produit et système UI personnels', 'Contenu multilingue', 'Expérience monopage responsive', 'Navigation claire par sections'],
    portfolioOverviewTitle: 'Vue d\'ensemble',
    portfolioValueLead: 'Ce portfolio montre comment je pense mon propre profil comme un produit et transforme du contenu en parcours clair.',
    portfolioValueSupport: 'L\'accent est mis sur la structure, la lisibilité, la performance et l\'accès direct aux informations essentielles.',
    portfolioValueItems: ['Découpage clair : accueil, pourquoi moi, à propos et projets', 'Amélioration itérative de l\'UX, de la typographie et de la densité du contenu', 'Navigation fluide entre les sections et les appels à l\'action'],
    portfolioShowcaseItems: ['Hiérarchie visuelle plus forte pour les recruteurs et les clients', 'Réduction systématique des redondances et de la complexité inutile', 'Meilleure cohérence entre contenu, mise en page et positionnement personnel'],
    portfolioStackItems: ['Angular', 'TypeScript', 'SCSS', 'Angular Router'],
    portfolioWorkflowItems: ['GitHub', 'Netlify', 'Évolutions itératives'],
    portfolioCta: 'Ouvrir l\'accueil'
  }
} as const;

@Component({
  selector: 'app-projects',
  imports: [RouterLink, RevealOnScrollDirective],
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
    { key: 'mitarbeiter-management' as const, label: this.copy().mitarbeiterManagementTab },
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
