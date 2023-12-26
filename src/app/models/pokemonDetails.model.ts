export interface PokemonDetails {
  id: number;
  name: string;
  image: string;
  flavorText: string;
  stats: {
    name: string;
    baseStat: number;
    effort: number;
    url: string;
  }[];
  types: {
    slot: number;
    name: string;
    url: string;
  }[];
  weight: number;
}
