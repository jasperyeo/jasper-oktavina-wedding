import { Component, computed, inject, model, ModelSignal, OnInit, signal, WritableSignal, ChangeDetectionStrategy } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { AppService } from '../../app.service';
import { GALLERY_CONTENT, RESPONSIVE_OPTIONS, AUTOPLAY, CIRCULAR, NUMVISIBLE } from './gallery.constants';

@Component({
  standalone: true,
  selector: 'gallery',
  imports: [
    GalleriaModule,
    ImageModule
  ],
  templateUrl: './gallery.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './gallery.scss'
})
export class Gallery implements OnInit {

  private readonly _appService: AppService = inject(AppService);
  protected readonly content = computed(() => GALLERY_CONTENT[this._appService.country()]);
  protected readonly images: ModelSignal<any[]> = model<any[]>([]);
  protected readonly responsiveOptions: WritableSignal<any[]> = signal<any[]>(RESPONSIVE_OPTIONS);
  public readonly AUTOPLAY = AUTOPLAY;
  public readonly CIRCULAR = CIRCULAR;
  public readonly NUMVISIBLE = NUMVISIBLE;

  public ngOnInit(): void {
    let images: any[] = [];
    for (let i = 1; i <= this.content().ITEM_COUNT; i++) {
      images.push({
        thumbnailImageSrc: this.content().ITEM_SRC_PREFIX + i + '.webp',
        itemImageSrc: this.content().ITEM_SRC_PREFIX + i + '.webp',
        alt: this.content().ITEM_ALT,
        title: this.content().ITEM_TITLE
      });
    }
    this.images.set(images); 
  }
}
