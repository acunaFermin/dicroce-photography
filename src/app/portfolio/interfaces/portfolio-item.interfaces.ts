import { Image } from 'src/app/interfaces/interfaces';

export interface PortfolioItem {
  titulo: string;
  link: string | null;
  imagen1: Image;
  imagen2: Image;
  imagen3: Image;
}
