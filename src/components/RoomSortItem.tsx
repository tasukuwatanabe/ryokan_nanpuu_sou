import { FC } from "react";
import { ReactNode } from "@tanstack/react-router";

import type { PriceSort } from "@/types";

type Props = {
  currentSort: PriceSort;
  targetSort: PriceSort;
  onChange: (value: PriceSort) => void;
  children: ReactNode;
};

const RoomSortItem: FC<Props> = ({
  currentSort,
  targetSort,
  onChange,
  children,
}) => (
  <li
    className={`${targetSort !== currentSort ? "text-sky-500 underline cursor-pointer" : ""} text-sm px-3 border-r-2 leading-4`}
    onClick={() => onChange(targetSort)}
  >
    {children}
  </li>
);

export default RoomSortItem;
