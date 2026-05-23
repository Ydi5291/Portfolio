import { Directive, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
	selector: '[appRevealOnScroll]',
	standalone: true,
	host: {
		'class': 'scroll-animate'
	}
})
export class RevealOnScrollDirective implements OnInit, OnDestroy {
	private observer?: IntersectionObserver;

	constructor(
		private readonly elementRef: ElementRef<HTMLElement>,
		@Inject(PLATFORM_ID) private readonly platformId: object
	) {}

	ngOnInit(): void {
		if (!isPlatformBrowser(this.platformId)) {
			return;
		}

		this.observer = new IntersectionObserver(
			([entry]) => {
				if (!entry?.isIntersecting) {
					return;
				}

				this.elementRef.nativeElement.classList.add('is-visible');
				this.observer?.unobserve(this.elementRef.nativeElement);
			},
			{
				threshold: 0.2,
				rootMargin: '0px 0px -10% 0px'
			}
		);

		this.observer.observe(this.elementRef.nativeElement);
	}

	ngOnDestroy(): void {
		this.observer?.disconnect();
	}
}