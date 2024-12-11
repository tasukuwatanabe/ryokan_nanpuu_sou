import { type ReactNode } from "react";

export interface ChildrenPropsType {
  children: ReactNode;
}

export interface IRoomSearch {
  checkInDate?: Date;
  checkOutDate?: Date;
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

export interface Reservation {
  id: number;
  roomId: number;
  checkInDate: Date;
  checkOutDate: Date;
  adultNum: number;
  childNum: number;
  price: number;
}

export type TRoomSort = 1 | -1;

export type TGuestCategory = "adult" | "child";
