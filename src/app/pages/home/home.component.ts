import { Component, OnDestroy, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AboutComponent } from '../about/about.component';
import { ProjectsComponent } from '../projects/projects.component';
import { ContactSectionComponent } from '../../components/contact-section/contact-section.component';

@Component({
  selector: 'app-home',
  imports: [RouterLink, AboutComponent, ProjectsComponent, ContactSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  private rotationTimerId: number | null = null;

  readonly heroMetaItems = [
    {
      icon: 'assets/images/location.png',
      text: 'Ich wohne in Werl'
    },
    {
      icon: 'assets/images/remote.png',
      text: 'Ich bin für Remote verfügbar'
    },
    {
      icon: 'assets/images/location.png',
      text: 'Ich bin bereit für die Arbeit vor Ort'
    }
  ];

  activeHeroMetaIndex = 0;

  ngOnInit(): void {
    if (this.route.snapshot.routeConfig?.path === 'contact') {
      void this.router.navigate(['/home'], {
        fragment: 'contact',
        replaceUrl: true
      });
    }

    if (isPlatformBrowser(this.platformId)) {
      this.rotationTimerId = window.setInterval(() => {
        this.activeHeroMetaIndex = (this.activeHeroMetaIndex + 1) % this.heroMetaItems.length;
      }, 3000);
    }
  }

  ngOnDestroy(): void {
    if (this.rotationTimerId !== null) {
      window.clearInterval(this.rotationTimerId);
    }
  }

  get currentHeroMeta() {
    return this.heroMetaItems[this.activeHeroMetaIndex];
  }

}
