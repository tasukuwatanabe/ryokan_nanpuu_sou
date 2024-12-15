export interface RoomSearch extends RoomReservation {
  minPrice: number;
  maxPrice: number;
}

export interface RoomReservation {
  checkInDate: Date;
  checkOutDate: Date;
  adultNum: number;
  childNum: number;
}

export interface Room {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  capacity: number;
}

export type PriceSort = "asc" | "desc";

export type GuestCategory = "adult" | "child";

export type ObjectUpdater<T> = <K extends keyof T>(key: K, value: T[K]) => void;
