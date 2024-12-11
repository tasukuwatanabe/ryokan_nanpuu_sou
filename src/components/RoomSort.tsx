import { ReactNode } from "@tanstack/react-router";

import { TRoomSort } from "@/types";

type Props = {
  sort: TRoomSort;
  onChange: (value: TRoomSort) => void;
};

const SortList: React.FC<Props> = ({ sort: currentSort, onChange }) => {
  const RoomSortItem = ({
    targetSort,
    children,
  }: {
    targetSort: TRoomSort;
    children: ReactNode;
  }) => (
    <li
      className={`${targetSort !== currentSort ? "text-sky-500 underline cursor-pointer" : ""} text-sm px-3 border-r-2 leading-4`}
      onClick={() => targetSort !== currentSort && onChange(targetSort)}
    >
      {children}
    </li>
  );

  return (
    <div className="flex justify-end relative">
      <ul className="flex border-l-2 mb-3 md:mb-0 md:absolute md:top-[-30px] md:right-0">
        <RoomSortItem targetSort="asc">料金が安い順</RoomSortItem>
        <RoomSortItem targetSort="desc">料金が高い順</RoomSortItem>
      </ul>
    </div>
  );
};

export default SortList;
