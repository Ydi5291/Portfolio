import { Component, OnDestroy, OnInit, PLATFORM_ID, computed, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AboutComponent } from '../about/about.component';
import { ProjectsComponent } from '../projects/projects.component';
import { ContactSectionComponent } from '../../components/contact-section/contact-section.component';
import { RevealOnScrollDirective } from '../../core/reveal-on-scroll.directive';
import { LanguageService } from '../../core/language.service';

const HOME_COPY = {
  de: {
    heroRole: 'Frontend Developer mit Full-Stack-Erfahrung',
    heroIntro: 'Ich entwickle skalierbare Webanwendungen mit Angular, Firebase und modernen Technologien.',
    heroMetaItems: [
      { icon: 'assets/images/location.png', text: 'Ich wohne in Werl' },
      { icon: 'assets/images/remote.png', text: 'Ich bin für Remote verfügbar' },
      { icon: 'assets/images/location.png', text: 'Ich bin bereit für die Arbeit vor Ort' }
    ],
    projectsCta: 'Projekte ansehen',
    aboutCta: 'Mein Profil entdecken',
    contactCta: 'Mich kontaktieren',
    cvCta: 'CV herunterladen',
    whyTitle: 'Warum ich?',
    whyParagraphs: [
        'Ich arbeite strukturiert, lösungsorientiert, zuverlässig, hochmotiviert und lernfähig.',
        'Mein Fokus liegt auf sauberer Architektur, Performance und Benutzerfreundlichkeit.'
    ],
    learningTitle: 'Ich lerne noch',
    learningText: 'Ich lerne diese Sprache noch für die Erweiterung von Shopify-Projekten.'
  },
  en: {
    heroRole: 'Frontend Developer with Full-Stack experience',
    heroIntro: 'I build scalable web applications with Angular, Firebase, and modern technologies.',
    heroMetaItems: [
      { icon: 'assets/images/location.png', text: 'Based in Werl' },
      { icon: 'assets/images/remote.png', text: 'Available for remote work' },
      { icon: 'assets/images/location.png', text: 'Open to on-site work' }
    ],
    projectsCta: 'View projects',
    aboutCta: 'Explore my profile',
    contactCta: 'Contact me',
    cvCta: 'Download CV',
    whyTitle: 'Why me?',
    whyParagraphs: [
        'I work in a structured, solution-oriented, reliable, highly motivated, and fast-learning way.',
        'My focus is on clean architecture, performance, and usability.'
    ],
    learningTitle: 'I am still learning',
    learningText: 'I am still learning this language for extending Shopify projects.'
  }
} as const;

@Component({
  selector: 'app-home',
  imports: [RouterLink, AboutComponent, ProjectsComponent, ContactSectionComponent, RevealOnScrollDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly languageService = inject(LanguageService);
  private rotationTimerId: number | null = null;
  readonly copy = computed(() => HOME_COPY[this.languageService.language()]);

  activeHeroMetaIndex = 0;

  ngOnInit(): void {
    if (this.route.snapshot.routeConfig?.path === 'contact') {
      void this.router.navigate(['/home'], {
        fragment: 'contact',
        replaceUrl: true
      });
    }

    if (isPlatformBrowser(this.platformId)) {
      this.rotationTimerId = window.setInterval(() => {
        this.activeHeroMetaIndex = (this.activeHeroMetaIndex + 1) % this.copy().heroMetaItems.length;
      }, 3000);
    }
  }

  ngOnDestroy(): void {
    if (this.rotationTimerId !== null) {
      window.clearInterval(this.rotationTimerId);
    }
  }

  get currentHeroMeta() {
    return this.copy().heroMetaItems[this.activeHeroMetaIndex];
  }

}
