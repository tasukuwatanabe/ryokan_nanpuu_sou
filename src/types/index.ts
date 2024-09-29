import { Timestamp } from "firebase/firestore/lite";
import { type ReactNode } from "react";

export interface ChildrenPropsType {
  children: ReactNode;
}

export interface Room {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  capacity: number;
}

export interface Reservation {
  id: string;
  roomId: string;
  userId: string;
  checkInDate: Timestamp;
  checkOutDate: Timestamp;
  adultNum: number;
  childNum: number;
  price: number;
}

export type SortType = 1 | -1;

export type TGuestCategory = "adult" | "child";
