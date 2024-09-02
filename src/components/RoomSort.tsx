import { Dispatch, SetStateAction } from "react";
import { ReactNode } from "@tanstack/react-router";

import { SortType } from "@/types";

interface RoomSortT {
  sortType: SortType;
  setSortType: Dispatch<SetStateAction<SortType>>;
}

const SortList = ({ sortType, setSortType }: RoomSortT) => {
  const RoomSortItem = ({
    sort,
    children,
  }: {
    sort: SortType;
    children: ReactNode;
  }) => {
    return (
      <li
        className={`${sortType !== sort ? "text-sky-500 underline cursor-pointer" : ""} text-sm px-3 border-r-2 leading-4`}
        onClick={() => {
          if (sortType !== sort) setSortType(sort);
        }}
      >
        {children}
      </li>
    );
  };

  return (
    <div className="flex justify-end">
      <ul className="flex border-l-2 mb-3 md:mb-0 md:absolute md:top-[-30px] md:right-0">
        <RoomSortItem sort={1}>料金が安い順</RoomSortItem>
        <RoomSortItem sort={-1}>料金が高い順</RoomSortItem>
      </ul>
    </div>
  );
};

export default SortList;
