export interface PokemonsDetails {
  id: number;
  name: string;
  image: string;
  flavorText: string;
  types: {
    slot: number;
    name: string;
    url: string;
  }[];
}
