import { Component } from '@angular/core';

@Component({
	selector: 'app-contact-section',
	imports: [],
	templateUrl: './contact-section.component.html',
	styleUrl: './contact-section.component.scss'
})
export class ContactSectionComponent {
	submitContact(name: string, email: string, message: string): void {
		const to = 'lamaid0502@gmail.com';
		const subject = 'Kontakt über das Portfolio';
		const body = `Name: ${name}\nE-Mail: ${email}\n\nNachricht:\n${message}`;
		const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
		window.location.href = mailto;
	}
}