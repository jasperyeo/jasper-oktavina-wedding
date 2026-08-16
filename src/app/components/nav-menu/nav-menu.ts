import { Component, computed, HostListener, inject, signal, WritableSignal, ChangeDetectionStrategy } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { Button, ButtonLabel } from 'primeng/button';
import { Menubar } from 'primeng/menubar';
import { Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { AppService } from '../../app.service';
import { NAV_MENU_CONTENT } from './nav-menu.constants';

@Component({
  standalone: true,
  selector: 'nav-menu',
  imports: [
    Button,
    Menubar,
    Menu,
    ButtonLabel
],
  templateUrl: './nav-menu.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './nav-menu.scss'
})
export class NavMenu {

  public readonly appService: AppService = inject(AppService);
  public readonly viewportScroller: ViewportScroller = inject(ViewportScroller);
  public readonly content = computed(() => NAV_MENU_CONTENT[this.appService.country()]);
  public readonly items = computed<MenuItem[]>(() => {
    return (this.content() as MenuItem[]).map((item: MenuItem, index: number) => {
      if (!index) {
        return {
          ...item,
          command: () => {
              window.scroll({ 
              top: 0, 
              behavior: 'smooth' 
            });
          }
        };
      } else {
        return {
          ...item,
          command: () => {
            this.viewportScroller.scrollToAnchor(item['anchor']);
          }
        };
      }
    });
  });

}
