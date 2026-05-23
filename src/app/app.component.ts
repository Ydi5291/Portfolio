import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, HostListener, Inject, PLATFORM_ID, computed } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher.component';
import { RevealOnScrollDirective } from './core/reveal-on-scroll.directive';
import { LanguageService } from './core/language.service';

const APP_COPY = {
  de: {
    menu: 'Menü',
    home: 'Startseite',
    why: 'Warum ich',
    about: 'Über mich',
    projects: 'Projekte',
    contact: 'Kontakt',
    impressum: 'Impressum',
    footerCta: 'Verfügbar für Frontend-Projekte mit Angular / React sowie für produktnahe Webanwendungen.',
    footerRole: 'Frontend Developer',
    footerDescription: 'Entwicklung moderner Webanwendungen mit Fokus auf Angular, React und skalierbare Architekturen.'
  },
  en: {
    menu: 'Menu',
    home: 'Home',
    why: 'Why me',
    about: 'About me',
    projects: 'Projects',
    contact: 'Contact',
    impressum: 'Legal notice',
    footerCta: 'Available for Angular / React frontend projects and product-oriented web applications.',
    footerRole: 'Frontend Developer',
    footerDescription: 'Building modern web applications focused on Angular, React, and scalable architectures.'
  }
} as const;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, LanguageSwitcherComponent, RevealOnScrollDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  title = 'portfolio';
	currentYear = new Date().getFullYear();
  mobileMenuOpen = false;
  isScrolled = false;
  isHeaderVisible = true;
  lastScrollTop = 0;
  private pendingMobileMenuOpen = false;
  readonly copy = computed(() => APP_COPY[this.languageService.language()]);

  constructor(
		private readonly router: Router,
		@Inject(DOCUMENT) private readonly document: Document,
		@Inject(PLATFORM_ID) private readonly platformId: object,
		private readonly languageService: LanguageService
	) {
    this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.queueFragmentScroll(event.urlAfterRedirects);
        this.mobileMenuOpen = false;
        if (this.pendingMobileMenuOpen) {
          this.pendingMobileMenuOpen = false;
          this.mobileMenuOpen = true;
          this.queueHomeMobileMenuGeometrySync();
        }
				this.queueScrollAnimationRefresh();
      }
    });
  }

	ngAfterViewInit(): void {
		this.syncHeaderState();
    this.syncHomeMobileMenuGeometry();
  }

  toggleMobileMenu(): void {
    if (this.mobileMenuOpen) {
      this.closeMobileMenu();
      return;
    }

		if (this.shouldNavigateHomeBeforeOpeningMenu()) {
			this.pendingMobileMenuOpen = true;
			void this.router.navigate(['/home'], { fragment: 'hero' });
			return;
		}

    if (this.shouldReturnToHeroBeforeOpeningMenu()) {
      this.scrollHeroIntoView();
    }

    this.mobileMenuOpen = true;
    this.queueHomeMobileMenuGeometrySync();
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
		this.clearHomeMobileMenuGeometry();
  }

	isHomeLayout(): boolean {
		return this.router.url === '/' || this.router.url.startsWith('/home') || this.router.url.startsWith('/contact');
	}

  private shouldNavigateHomeBeforeOpeningMenu(): boolean {
    return isPlatformBrowser(this.platformId)
		&& window.innerWidth <= 768
		&& (this.router.url.startsWith('/cv') || this.router.url.startsWith('/impressum'));
  }

  private shouldReturnToHeroBeforeOpeningMenu(): boolean {
    return isPlatformBrowser(this.platformId) && this.isHomeLayout() && window.innerWidth <= 768;
  }

  private scrollHeroIntoView(): void {
    const hero = this.document.getElementById('hero');
    if (!hero) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    hero.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.syncHeaderState();
    if (this.mobileMenuOpen) {
      this.syncHomeMobileMenuGeometry();
    }
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.syncHomeMobileMenuGeometry();
  }

  private syncHeaderState(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const currentScroll = window.pageYOffset || this.document.documentElement.scrollTop || 0;

    this.isScrolled = currentScroll > 50;
    this.isHeaderVisible = currentScroll <= 0 || currentScroll < this.lastScrollTop || this.mobileMenuOpen;
    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }

  private queueScrollAnimationRefresh(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    requestAnimationFrame(() => {
      this.syncHeaderState();
      this.syncHomeMobileMenuGeometry();
    });
  }

  private queueFragmentScroll(url: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const fragment = this.extractFragment(url);
    if (!fragment) {
      return;
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const target = this.document.getElementById(fragment);
        target?.scrollIntoView({ block: 'start', behavior: 'auto' });
      });
    });
  }

  private extractFragment(url: string): string | null {
    const hashIndex = url.indexOf('#');
    if (hashIndex < 0 || hashIndex === url.length - 1) {
      return null;
    }

    return decodeURIComponent(url.slice(hashIndex + 1));
  }

  private queueHomeMobileMenuGeometrySync(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    requestAnimationFrame(() => {
      this.syncHomeMobileMenuGeometry();
    });
  }

  private syncHomeMobileMenuGeometry(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (!this.mobileMenuOpen || !this.isHomeLayout() || window.innerWidth > 768) {
      this.clearHomeMobileMenuGeometry();
      return;
    }

    const photo = this.document.querySelector<HTMLElement>('.profile-photo');
    if (!photo) {
      return;
    }

    const rect = photo.getBoundingClientRect();
    const root = this.document.documentElement;

    root.style.setProperty('--home-mobile-menu-top', `${rect.top}px`);
    root.style.setProperty('--home-mobile-menu-left', `${rect.left}px`);
    root.style.setProperty('--home-mobile-menu-width', `${rect.width}px`);
    root.style.setProperty('--home-mobile-menu-height', `${rect.height}px`);
  }

  private clearHomeMobileMenuGeometry(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const root = this.document.documentElement;
    root.style.removeProperty('--home-mobile-menu-top');
    root.style.removeProperty('--home-mobile-menu-left');
    root.style.removeProperty('--home-mobile-menu-width');
    root.style.removeProperty('--home-mobile-menu-height');
  }
}
