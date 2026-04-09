import { Component, OnInit, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {
  readonly embedded = input(false);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  ngOnInit(): void {
    if (this.route.snapshot.routeConfig?.path === 'about') {
      void this.router.navigate(['/home'], {
        fragment: 'about',
        replaceUrl: true
      });
    }
  }

}
