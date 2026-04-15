import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, HostListener, Inject, NgZone, OnDestroy, PLATFORM_ID } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'portfolio';
	currentYear = new Date().getFullYear();
  mobileMenuOpen = false;
  isScrolled = false;
  isHeaderVisible = true;
  lastScrollTop = 0;
  private scrollObserver?: IntersectionObserver;

  constructor(
		private readonly router: Router,
		private readonly ngZone: NgZone,
		@Inject(DOCUMENT) private readonly document: Document,
		@Inject(PLATFORM_ID) private readonly platformId: object
	) {
    this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.mobileMenuOpen = false;
				this.queueScrollAnimationRefresh();
      }
    });
  }

	ngAfterViewInit(): void {
		this.syncHeaderState();
    this.syncHomeMobileMenuGeometry();
		this.bindScrollAnimations();
	}

  ngOnDestroy(): void {
    this.scrollObserver?.disconnect();
  }

  toggleMobileMenu(): void {
    if (this.mobileMenuOpen) {
      this.closeMobileMenu();
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

  scrollToTop(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

	isHomeLayout(): boolean {
		return this.router.url === '/' || this.router.url.startsWith('/home') || this.router.url.startsWith('/contact');
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

  private bindScrollAnimations(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.scrollObserver?.disconnect();

    const elements = this.document.querySelectorAll<HTMLElement>('.scroll-animate');
    if (!elements.length) {
      return;
    }

    this.scrollObserver = new IntersectionObserver(
      (entries) => {
        this.ngZone.run(() => {
          for (const entry of entries) {
            if (!entry.isIntersecting) {
              continue;
            }

            entry.target.classList.add('is-visible');
            this.scrollObserver?.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    for (const element of elements) {
      if (element.classList.contains('is-visible')) {
        continue;
      }

      this.scrollObserver.observe(element);
    }
  }

  private queueScrollAnimationRefresh(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    requestAnimationFrame(() => {
      this.syncHeaderState();
      this.syncHomeMobileMenuGeometry();
      this.bindScrollAnimations();
    });
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
