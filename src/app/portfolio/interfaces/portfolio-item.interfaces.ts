import { Image } from 'src/app/interfaces/interfaces';

export interface PortfolioItem {
  id: string;
  titulo: string;
  link: string | null;
  imagen1: Image;
  imagen2: Image;
  imagen3: Image;
}
