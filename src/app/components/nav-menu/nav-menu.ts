import { Component, computed, HostListener, inject, signal, WritableSignal, ChangeDetectionStrategy } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { Button, ButtonLabel } from 'primeng/button';
import { Menubar } from 'primeng/menubar';
import { Menu } from 'primeng/menu';
import { AppService } from '../../app.service';
import { NAV_MENU_CONTENT, WeddingMenuItem } from './nav-menu.constants';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './nav-menu.scss'
})
export class NavMenu {

  private readonly _appService: AppService = inject(AppService);
  private readonly _viewportScroller: ViewportScroller = inject(ViewportScroller);
  protected readonly content = computed(() => NAV_MENU_CONTENT[this._appService.country()]);
  protected readonly items = computed<WeddingMenuItem[]>(() => {
    return this.content().map((item: WeddingMenuItem, index: number) => {
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
            this._viewportScroller.scrollToAnchor(item.anchor);
          }
        };
      }
    });
  });

}
