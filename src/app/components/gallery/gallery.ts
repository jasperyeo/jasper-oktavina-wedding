import { Component, computed, inject, model, ModelSignal, OnInit, signal, WritableSignal } from '@angular/core';
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
  styleUrl: './gallery.scss'
})
export class Gallery implements OnInit {

  public readonly appService: AppService = inject(AppService);
  public readonly content = computed(() => GALLERY_CONTENT[this.appService.country()]);
  public images: ModelSignal<any[]> = model<any[]>([]);
  public responsiveOptions: WritableSignal<any[]> = signal<any[]>(RESPONSIVE_OPTIONS);
  public readonly AUTOPLAY = AUTOPLAY;
  public readonly CIRCULAR = CIRCULAR;
  public readonly NUMVISIBLE = NUMVISIBLE;

  public ngOnInit(): void {
   this.images.set(this.content().ITEMS); 
  }
}
