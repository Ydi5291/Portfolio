import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cv',
  imports: [RouterLink],
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.scss'
})
export class CvComponent {
  readonly cvUrl = 'assets/CV-SE.pdf';
}
