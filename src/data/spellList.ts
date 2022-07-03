import AhriE from '../assets/Spells/Ahri_E.webp';
import AhriQ from '../assets/Spells/Ahri_Q.webp';
import AhriR from '../assets/Spells/Ahri_R.webp';
import AhriW from '../assets/Spells/Ahri_W.webp';
import { Spell } from '../models';

export const spells: {[index: string]: Spell[]} = {
  'Ahri': [
    {
      name: 'Q',
      img: AhriQ,
      baseDamage: [40, 65, 90, 115, 140],
      scaleAd: [0, 0, 0, 0, 0],
      scaleAp: [0.4, 0.4, 0.4, 0.4, 0.4],
    },
    {
      name: 'W',
      img: AhriW,
      baseDamage: [80, 120, 160, 200, 240],
      scaleAd: [0, 0, 0, 0, 0],
      scaleAp: [0.48, 0.48, 0.48, 0.48, 0.48],
    },
    {
      name: 'E',
      img: AhriE,
      baseDamage: [80, 110, 140, 170, 200],
      scaleAd: [0, 0, 0, 0, 0],
      scaleAp: [0.6, 0.6, 0.6, 0.6, 0.6],
    },
    {
      name: 'R',
      img: AhriR,
      baseDamage: [60, 90, 120],
      scaleAd: [0, 0, 0, 0, 0],
      scaleAp: [0.35, 0.35, 0.35],
    },
  ]
};