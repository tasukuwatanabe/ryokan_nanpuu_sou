import { FC } from "react";
import type { PriceSort } from "@/types";
import RoomSortItem from "@/components/RoomSortItem";

type Props = {
  sort: PriceSort;
  onChange: (value: PriceSort) => void;
};

const RoomSortList: FC<Props> = ({ sort: currentSort, onChange }) => {
  return (
    <div className="flex justify-end relative">
      <ul className="flex border-l-2 mb-3 md:mb-0 md:absolute md:top-[-30px] md:right-0">
        <RoomSortItem
          currentSort={currentSort}
          targetSort="asc"
          onChange={onChange}
        >
          料金が安い順
        </RoomSortItem>
        <RoomSortItem
          currentSort={currentSort}
          targetSort="desc"
          onChange={onChange}
        >
          料金が高い順
        </RoomSortItem>
      </ul>
    </div>
  );
};

export default RoomSortList;
