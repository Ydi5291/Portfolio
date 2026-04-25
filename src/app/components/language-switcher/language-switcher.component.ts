import { Component, inject } from '@angular/core';

import { Language, LanguageService } from '../../core/language.service';

@Component({
	selector: 'app-language-switcher',
	imports: [],
	templateUrl: './language-switcher.component.html',
	styleUrl: './language-switcher.component.scss'
})
export class LanguageSwitcherComponent {
	private readonly languageService = inject(LanguageService);

	readonly language = this.languageService.language;

	setLanguage(language: Language): void {
		this.languageService.setLanguage(language);
	}
}