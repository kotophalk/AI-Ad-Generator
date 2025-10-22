
import { BannerSize, AspectRatio } from './types';

export const ASPECT_RATIOS: AspectRatio[] = ['16:9', '9:16', '1:1', '4:3', '3:4'];

export const BANNER_SIZES: BannerSize[] = [
  { name: 'Leaderboard', width: 728, height: 90 },
  { name: 'Large Leaderboard', width: 970, height: 90 },
  { name: 'Banner', width: 468, height: 60 },
  { name: 'Half Banner', width: 234, height: 60 },
  { name: 'Mobile Banner', width: 320, height: 50 },
  { name: 'Large Mobile Banner', width: 320, height: 100 },
  { name: 'Skyscraper', width: 120, height: 600 },
  { name: 'Wide Skyscraper', width: 160, height: 600 },
  { name: 'Half Page', width: 300, height: 600 },
  { name: 'Square', width: 250, height: 250 },
  { name: 'Small Square', width: 200, height: 200 },
  { name: 'Medium Rectangle', width: 300, height: 250 },
  { name: 'Large Rectangle', width: 336, height: 280 },
  { name: 'Rectangle', width: 180, height: 150 },
];
