import { Component, OnInit, inject, input } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-projects',
  imports: [RouterLink],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  readonly embedded = input(false);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  ngOnInit(): void {
    if (this.route.snapshot.routeConfig?.path === 'projects') {
      void this.router.navigate(['/home'], {
        fragment: 'projects',
        replaceUrl: true
      });
    }
  }

}
