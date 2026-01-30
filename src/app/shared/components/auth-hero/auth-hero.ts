import { Component, input, ChangeDetectionStrategy, computed } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-auth-hero',
  templateUrl: './auth-hero.html',
  styleUrl: './auth-hero.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'hidden lg:block lg:w-1/2 relative h-screen overflow-hidden'
  } // use when component needs to take up specific space in flex/grid layout
})
export class AuthHero {
  title = input<string>('Order food you love.');
  subtitle = input<string>('Join thousands of foodies and get your favorite meals delivered fresh to your doorstep.');
  imageUrl = input<string>('https://lh3.googleusercontent.com/aida-public/AB6AXuA59HzRe0eoW9olb5SG8HoyVkAymCdC0e7_AqAZQkC3eZ8CYQ0lwceblOigOGgcFVCnS4xGOWDXC2piAWzL-aa0MinLvld2FxvRMcRfrvhWCkC8TuilBRdTDkchifn1ZmEgh-bjLbg7qqizpLGmFFLVdfdhnV26YPiywn3lfswXVYDsVDBx5AVpvRBIkJkMKapr4uGmHKIlt2yxjwsScwV8Nluq9masuDWioNId8HsmzHLW-dOu-xxSYqpon2yyWXEugfw1snpIpFXS');
  imageAlt = input<string>('Top down view of a gourmet table spread with various delicious dishes');

  constructor(private sanitizer: DomSanitizer) {}

  safeImageUrl = computed(() => this.sanitizer.bypassSecurityTrustUrl(this.imageUrl()));
}
