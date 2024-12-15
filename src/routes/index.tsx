import { FC, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import type { Room, RoomSearch, ObjectUpdater, PriceSort } from "@/types";
import { ROOM_LIST } from "@/consts/room";
import SearchComponent from "@/components/RoomSearch";
import RoomIndex from "@/components/RoomIndex";
import RoomSort from "@/components/RoomSortList";
import { INITIAL_SEARCH_DATA } from "@/consts/search";

const sortRoomsByPrice = (list: Room[], type: PriceSort) =>
  [...list].sort((a, b) =>
    type === "asc" ? a.price - b.price : b.price - a.price
  );

const Index: FC = () => {
  const initialRoomSort = "asc";
  const initialRoomList = sortRoomsByPrice(ROOM_LIST, initialRoomSort);

  const [sortType, setSortType] = useState<PriceSort>(initialRoomSort);
  const [roomResult, setRoomResult] = useState<Room[]>(initialRoomList);
  const [roomSearch, setRoomSearch] = useState<RoomSearch>(INITIAL_SEARCH_DATA);

  const handleSortChange = (type: PriceSort) => {
    const sortedRooms = sortRoomsByPrice(roomResult, type);

    setSortType(type);
    setRoomResult(sortedRooms);
  };

  const handleSearchChange: ObjectUpdater<RoomSearch> = (key, value) => {
    setRoomSearch((state: RoomSearch) => ({
      ...state,
      [key]: value,
    }));
  };

  const handleSearchSubmit = () => {
    const { adultNum, childNum, minPrice, maxPrice } = roomSearch;

    const filteredRooms = ROOM_LIST.filter((room: Room) => {
      // TODO: prettierが丸括弧を自動除去しないように設定変更した上でリファクタ
      if (room.capacity < adultNum + childNum) return;
      if (minPrice !== 0 && room.price < minPrice) return;
      if (maxPrice !== 0 && maxPrice < room.price) return;

      return true;
    });

    const sortedRooms = sortRoomsByPrice(filteredRooms, sortType);
    setRoomResult(sortedRooms);
  };

  const handleSearchReset = () => setRoomSearch(INITIAL_SEARCH_DATA);

  return (
    <div className="grid grid-cols-1 gap-y-10 md:grid-cols-pageGrid md:gap-x-5 lg:gap-x-8">
      <aside>
        <SearchComponent
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
