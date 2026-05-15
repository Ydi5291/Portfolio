import { Component, computed, inject } from '@angular/core';

import { LanguageService } from '../../core/language.service';

const CONTACT_COPY = {
	de: {
		title: 'Kontakt',
		intro: 'Kurz und direkt: Schreiben Sie mir oder rufen Sie an, wenn Sie über Ihr Vorhaben sprechen möchten.',
		availabilityTitle: 'Verfügbar für Frontend-Projekte und neue berufliche Chancen',
		availabilityText: 'Ideal für eine strukturierte Frontend-Umsetzung, Produktpflege oder den Ausbau einer bestehenden Webanwendung.',
		primaryCta: 'Direkt per E-Mail anfragen',
		email: 'E-Mail',
		emailHint: 'Antwort in der Regel innerhalb von 24 bis 48 Stunden.',
		phone: 'Telefon',
		phoneHint: 'Gern per Anruf oder WhatsApp.',
		address: 'Adresse',
		country: 'Deutschland',
		github: 'GitHub',
		githubHint: 'Code, Demos und kleine Frontend-Experimente.',
		formTitle: 'Kontaktformular',
		formHint: 'Ihre Nachricht wird in Ihrem Mailprogramm als E-Mail geöffnet.',
		name: 'Name',
		emailField: 'E-Mail',
		message: 'Nachricht',
		submit: 'Senden',
		subject: 'Kontakt über das Portfolio'
	},
	en: {
		title: 'Contact',
		intro: 'Short and direct: send me a message or give me a call if you would like to discuss your project.',
		availabilityTitle: 'Available for frontend projects and new career opportunities',
		availabilityText: 'A strong fit for structured frontend delivery, product iteration, or extending an existing web application.',
		primaryCta: 'Reach out by email',
		email: 'Email',
		emailHint: 'Usually answered within 24 to 48 hours.',
		phone: 'Phone',
		phoneHint: 'Happy to connect by phone or WhatsApp.',
		address: 'Address',
		country: 'Germany',
		github: 'GitHub',
		githubHint: 'Code, demos, and small frontend experiments.',
		formTitle: 'Contact form',
		formHint: 'Your message will open as an email in your mail app.',
		name: 'Name',
		emailField: 'Email',
		message: 'Message',
		submit: 'Send',
		subject: 'Contact via portfolio'
	}
} as const;

@Component({
	selector: 'app-contact-section',
	imports: [],
	templateUrl: './contact-section.component.html',
	styleUrl: './contact-section.component.scss'
})
export class ContactSectionComponent {
	private readonly languageService = inject(LanguageService);
	readonly copy = computed(() => CONTACT_COPY[this.languageService.language()]);

	submitContact(name: string, email: string, message: string): void {
		const to = 'lamaid0502@gmail.com';
		const subject = this.copy().subject;
		const body = `Name: ${name}\nE-Mail: ${email}\n\nNachricht:\n${message}`;
		const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
		window.location.href = mailto;
	}
}