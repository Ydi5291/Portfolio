import { Component, OnInit, inject } from '@angular/core';
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

  ngOnInit(): void {
    if (this.route.snapshot.routeConfig?.path === 'contact') {
      void this.router.navigate(['/home'], {
        fragment: 'contact',
        replaceUrl: true
      });
    }
  }

}
