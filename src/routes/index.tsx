import { FC, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { IRoom, IRoomSearch, ObjectUpdater, TPriceSort } from "@/types";
import { ROOM_LIST } from "@/consts/room";
import { calcDateFromToday } from "@/utils/date";
import RoomSearch from "@/components/RoomSearch";
import RoomIndex from "@/components/RoomIndex";
import RoomSort from "@/components/RoomSortList";
import { ADULT_MIN_COUNT, CHILD_MIN_COUNT } from "@/consts/search";

const sortRoomsByPrice = (list: IRoom[], type: TPriceSort) =>
  [...list].sort((a, b) =>
    type === "asc" ? a.price - b.price : b.price - a.price
  );

const Index: FC = () => {
  const initialRoomSearch = {
    checkInDate: calcDateFromToday(1),
    checkOutDate: calcDateFromToday(2),
    adultNum: ADULT_MIN_COUNT,
    childNum: CHILD_MIN_COUNT,
    minPrice: 0,
    maxPrice: 0,
  };
  const initialRoomSort = "asc";
  const initialRoomList = sortRoomsByPrice(ROOM_LIST, initialRoomSort);

  const [sortType, setSortType] = useState<TPriceSort>(initialRoomSort);
  const [roomResult, setRoomResult] = useState<IRoom[]>(initialRoomList);
  const [roomSearch, setRoomSearch] = useState<IRoomSearch>(initialRoomSearch);

  const handleSortChange = (type: TPriceSort) => {
    const sortedRooms = sortRoomsByPrice(roomResult, type);

    setSortType(type);
    setRoomResult(sortedRooms);
  };

  const handleSearchChange: ObjectUpdater<IRoomSearch> = (key, value) => {
    setRoomSearch((state: IRoomSearch) => ({
      ...state,
      [key]: value,
    }));
  };

  const handleSearchSubmit = () => {
    const { adultNum, childNum, minPrice, maxPrice } = roomSearch;

    const filteredRooms = ROOM_LIST.filter((room: IRoom) => {
      // TODO: prettierが丸括弧を自動除去しないように設定変更した上でリファクタ
      if (room.capacity < adultNum + childNum) return;
      if (minPrice !== 0 && room.price < minPrice) return;
      if (maxPrice !== 0 && maxPrice < room.price) return;

      return true;
    });

    const sortedRooms = sortRoomsByPrice(filteredRooms, sortType);
    setRoomResult(sortedRooms);
  };

  const handleSearchReset = () => setRoomSearch(initialRoomSearch);

  return (
    <div className="grid grid-cols-1 gap-y-10 md:grid-cols-pageGrid md:gap-x-5 lg:gap-x-8">
      <aside>
        <RoomSearch
          roomSearch={roomSearch}
          onChange={handleSearchChange}
          onSubmit={handleSearchSubmit}
          onReset={handleSearchReset}
        />
      </aside>
      <main>
        <RoomSort sort={sortType} onChange={handleSortChange} />
        <RoomIndex rooms={roomResult} search={roomSearch} />
      </main>
    </div>
  );
};

export const Route = createFileRoute("/")({
  component: Index,
});
