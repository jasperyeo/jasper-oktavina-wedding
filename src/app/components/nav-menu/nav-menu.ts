import { Component, computed, HostListener, inject, signal, WritableSignal, ChangeDetectionStrategy } from '@angular/core';
import { Button } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { AppService } from '../../app.service';
import { MUSIC_PLAYER_CONTENT } from './nav-menu.constants';

@Component({
  standalone: true,
  selector: 'nav-menu',
  imports: [
    Button,
    MenubarModule
  ],
  templateUrl: './nav-menu.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './nav-menu.scss'
})
export class NavMenu {

  public readonly appService: AppService = inject(AppService);
  public readonly content = computed(() => MUSIC_PLAYER_CONTENT[this.appService.country()]);
  public readonly items: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-home'
    }
  ];

}
