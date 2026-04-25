import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Language = 'de' | 'en';

@Injectable({ providedIn: 'root' })
export class LanguageService {
	private readonly storageKey = 'portfolio-language';
	private readonly platformId = inject(PLATFORM_ID);
	private readonly currentLanguage = signal<Language>('de');

	readonly language = this.currentLanguage.asReadonly();

	constructor() {
		if (!isPlatformBrowser(this.platformId)) {
			return;
		}

		const savedLanguage = window.localStorage.getItem(this.storageKey);
		if (savedLanguage === 'de' || savedLanguage === 'en') {
			this.currentLanguage.set(savedLanguage);
		}
	}

	setLanguage(language: Language): void {
		this.currentLanguage.set(language);

		if (!isPlatformBrowser(this.platformId)) {
			return;
		}

		window.localStorage.setItem(this.storageKey, language);
	}
}