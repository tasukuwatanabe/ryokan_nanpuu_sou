export interface IRoomSearch {
  checkInDate: Date;
  checkOutDate: Date;
  adultNum: number;
  childNum: number;
  minPrice: number;
  maxPrice: number;
}

export interface IRoom {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  capacity: number;
}

export type TPriceSort = "asc" | "desc";

export type TGuestCategory = "adult" | "child";

export type ObjectUpdater<T> = <K extends keyof T>(key: K, value: T[K]) => void;
