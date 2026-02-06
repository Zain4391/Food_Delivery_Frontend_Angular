import { ChangeDetectionStrategy, Component, input, computed } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-hero-section',
  imports: [],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroSection {
  mainText = input<string>('');
  spanText = input<string>('');
  subText = input<string>('');
  imageUrl = input<string>('https://lh3.googleusercontent.com/aida-public/AB6AXuBfR_ZycUgbPihEQPViLmCZt2TnIhVV63brdMJYfHBWHxXB6BcFa-QNFTAVF7qCb4D-5ToCVKfZCFenD3c9ocBN4RspP4A1mDqwXXu2-JDL74NjidbXIsAWdlekCkz-3YkQRVw69OFxH6Q647Ef-bQxxbR_yyXEpwu5rzyJt2ntv50Y3ZP4Jgf3rVW6EXknlGzIswo73AUan8__RdiwLiIHwCrP2E12uNd3ZtMTl1QHshjkUQt38n2bMKZCPmlFKZgJTRgsNZ2y-gxB');
  imageAlt = input<string>('Top down view of a table full of diverse delicious food plates including salads, meats and vegetables');

  constructor(private sanitizer: DomSanitizer) {}

  safeImageUrl = computed(() => this.sanitizer.bypassSecurityTrustUrl(this.imageUrl()));
}
