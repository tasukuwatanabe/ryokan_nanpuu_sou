import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { IRoomSearch, TRoomSort } from "@/types";
import { ROOM_LIST } from "@/consts";
import { calcDateFromToday } from "@/utils/date";
import PageGrid from "@/components/PageGrid";
import RoomSearch from "@/components/RoomSearch";
import RoomIndex from "@/components/RoomIndex";
import RoomSort from "@/components/RoomSort";
import { ADULT_MIN_COUNT, CHILD_MIN_COUNT } from "@/consts/search";

const Index: React.FC = () => {
  const initialRoomSearch = {
    checkInDate: calcDateFromToday(1),
    checkOutDate: calcDateFromToday(2),
    adultNum: ADULT_MIN_COUNT,
    childNum: CHILD_MIN_COUNT,
    minPrice: 0,
    maxPrice: 0,
  };

  const [roomSearch, setRoomSearch] = useState<IRoomSearch>(initialRoomSearch);
  const [sortType, setSortType] = useState<TRoomSort>(1);

  const handleSearchChange = (key: keyof IRoomSearch, value: any) => {
    setRoomSearch((state: IRoomSearch) => ({
      ...state,
      [key]: value,
    }));
  };

  const filteredRooms = ROOM_LIST!
    .filter(() => {
      // const { adultNum, childNum, minPrice, maxPrice } = roomSearch;

      // const adultNumNumber = Number(adultNum);
      // const childNumNumber = Number(childNum);
      // const minPriceNumber = Number(minPrice);
      // const maxPriceNumber = Number(maxPrice);

      // // TODO: prettierが丸括弧を自動除去しないように設定変更した上でリファクタ
      // if (room.capacity < adultNumNumber + childNumNumber) return;
      // if (minPriceNumber !== 0 && room.price < minPriceNumber) return;
      // if (maxPriceNumber !== 0 && maxPriceNumber < room.price) return;

      return true;
    })
    .sort((a, b) => (sortType === 1 ? a.price - b.price : b.price - a.price));

  const handleSearchReset = () => setRoomSearch(initialRoomSearch);

  return (
    <PageGrid>
      <aside>
        <RoomSearch
          roomSearch={roomSearch}
          onChange={handleSearchChange}
          handleSearchReset={handleSearchReset}
        />
      </aside>
      <main>
        <RoomSort sortType={sortType} setSortType={setSortType} />
        <RoomIndex rooms={filteredRooms} />
      </main>
    </PageGrid>
  );
};

export const Route = createFileRoute("/")({
  component: Index,
});
