import { MenuItem } from 'primeng/api';

export interface WeddingMenuItem extends MenuItem {
  anchor: string;
};

export const NAV_MENU_CONTENT: Record<string, WeddingMenuItem[]> = {
  id: [
    { label: 'Beranda', anchor: '' },
    { label: 'Lokasi', anchor: 'separator-location' },
    { label: 'Galeri', anchor: 'separator-gallery' },
    { label: 'Countdown', anchor: 'countdown' }
  ],
  sg: [
    { label: 'Home 返回頂部', anchor: '' },
    { label: 'Location 地點', anchor: 'separator-location' },
    { label: 'Getting here 如何抵達', anchor: 'separator-getting-here' },
    { label: 'Gallery 圖庫', anchor: 'separator-gallery' },
    { label: 'Q & A 問答', anchor: 'separator-qna' },
    { label: 'Countdown 倒數計時', anchor: 'countdown' }
  ]
};