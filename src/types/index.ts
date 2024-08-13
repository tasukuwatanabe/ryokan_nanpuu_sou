import { type ReactNode } from "react";

export interface ChildrenPropsType {
  children: ReactNode;
}

export interface Room {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  wifi: boolean;
  smoking: boolean;
  breakfast: boolean;
  reservedDates: Date[];
}
