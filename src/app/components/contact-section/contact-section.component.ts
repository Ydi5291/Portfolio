import { Component, computed, inject } from '@angular/core';

import { RevealOnScrollDirective } from '../../core/reveal-on-scroll.directive';
import { LanguageService } from '../../core/language.service';

const CONTACT_COPY = {
	de: {
		title: 'Kontakt',
		eyebrow: 'Beruflicher Austausch',
		intro: 'Kurz und direkt: Schreiben Sie mir oder rufen Sie an, wenn Sie über eine Position, ein Team oder eine berufliche Möglichkeit sprechen möchten.',
		availabilityTitle: 'Offen für Frontend-Positionen und neue berufliche Chancen',
		email: 'E-Mail',
		emailHint: 'Antwort in der Regel innerhalb von 24 bis 48 Stunden.',
		phone: 'Telefon',
		phoneHint: 'Gern per Anruf oder WhatsApp.',
		address: 'Adresse',
		country: 'Deutschland',
		github: 'GitHub',
		githubHint: 'Code, Demos und Frontend-Experimente aus meinem Lern- und Arbeitsalltag.',
		formTitle: 'Kontaktformular',
		formHint: 'Ihre Nachricht wird in Gmail geoffnet. Falls Gmail nicht verfugbar ist, wird Ihr Mailprogramm verwendet.',
		name: 'Name',
		emailField: 'E-Mail',
		message: 'Nachricht',
		submit: 'Senden',
		subject: 'Kontakt über das Portfolio / berufliche Gelegenheit',
		bodyNameLabel: 'Name',
		bodyEmailLabel: 'E-Mail',
		bodyMessageLabel: 'Nachricht',
		bodyFooter: 'Vielen Dank fur Ihre Nachricht.'
	},
	en: {
		title: 'Contact',
		eyebrow: 'Career conversations',
		intro: 'Short and direct: send me a message or call if you would like to discuss a role, a team, or a career opportunity.',
		availabilityTitle: 'Open to frontend roles and new career opportunities',
		email: 'Email',
		emailHint: 'Usually answered within 24 to 48 hours.',
		phone: 'Phone',
		phoneHint: 'Happy to connect by phone or WhatsApp.',
		address: 'Address',
		country: 'Germany',
		github: 'GitHub',
		githubHint: 'Code, demos, and frontend experiments from my day-to-day learning and work.',
		formTitle: 'Contact form',
		formHint: 'Your message will open in Gmail. If Gmail is not available, your mail app will be used instead.',
		name: 'Name',
		emailField: 'Email',
		message: 'Message',
		submit: 'Send',
		subject: 'Portfolio contact / career opportunity',
		bodyNameLabel: 'Name',
		bodyEmailLabel: 'Email',
		bodyMessageLabel: 'Message',
		bodyFooter: 'Thank you for your message.'
	}
} as const;

@Component({
	selector: 'app-contact-section',
	imports: [RevealOnScrollDirective],
	templateUrl: './contact-section.component.html',
	styleUrl: './contact-section.component.scss'
})
export class ContactSectionComponent {
	private readonly languageService = inject(LanguageService);
	readonly copy = computed(() => CONTACT_COPY[this.languageService.language()]);

	submitContact(name: string, email: string, message: string): void {
		const to = 'lamaid0502@gmail.com';
		const copy = this.copy();
		const subject = copy.subject;
		const body = [
			`${copy.bodyNameLabel}: ${name}`,
			`${copy.bodyEmailLabel}: ${email}`,
			'',
			`${copy.bodyMessageLabel}:`,
			message,
			'',
			copy.bodyFooter
		].join('\n');
		const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
		const mailtoUrl = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
		const gmailWindow = window.open(gmailComposeUrl, '_blank', 'noopener,noreferrer');

		if (gmailWindow) {
			return;
		}

		window.location.href = mailtoUrl;
	}
}