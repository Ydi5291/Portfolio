import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  submitContact(name: string, email: string, message: string): void {
    const to = 'lamaid0502@gmail.com';
    const subject = 'Kontakt über Portfolio';
    const body = `Name: ${name}\nE-Mail: ${email}\n\nNachricht:\n${message}`;
    const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  }

}
