import { useState } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";

import type { IRoomSearch, IRoom, TRoomSort } from "@/types";
import { RESERVATION_LIST, ROOM_LIST } from "@/consts";
import { calcDateFromToday, setHoursToMidnight } from "@/utils/date";
import PageGrid from "@/components/PageGrid";
import RoomSearch from "@/components/RoomSearch";
import RoomIndex from "@/components/RoomIndex";
import RoomSort from "@/components/RoomSort";
import { ADULT_MIN_COUNT, CHILD_MIN_COUNT } from "@/consts/search";

const Index = () => {
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

  // const router = useRouter();

  // const handleCheckInDateChange: SelectSingleEventHandler = (day) => {
  //   if (!day) return;

  //   const checkInDateAtMidnight = new Date(setHoursToMidnight(day));
  //   setCheckInDate(checkInDateAtMidnight);
  // };

  // const handleCheckOutDateChange: SelectSingleEventHandler = (day) => {
  //   if (!day) return;

  //   const checkOutDateAtMidnight = new Date(setHoursToMidnight(day));
  //   setCheckOutDate(checkOutDateAtMidnight);
  // };

  const resetRoomSearch = () => setRoomSearch(initialRoomSearch);

  // // 検索のチェックイン・チェックアウト期間の間に、すでに予約された日があるか判定する
  // const checkReservationWithinPeriod = (roomId: string): boolean => {
  //   const roomReservations = RESERVATION_LIST.filter((reservation) => {
  //     return reservation.roomId === roomId;
  //   });

  //   if (!roomReservations) return false;

  //   const reservationsWithinPeriod = roomReservations.filter((reservation) => {
  //     const reservedCheckInDateAtMidnight = setHoursToMidnight(
  //       reservation.checkInDate
  //     );
  //     const reservedCheckOutDateAtMidnight = setHoursToMidnight(
  //       reservation.checkOutDate
  //     );

  //     const { checkInDate, checkOutDate } = roomSearch;

  //     return !(
  //       checkOutDate <= reservedCheckInDateAtMidnight ||
  //       reservedCheckOutDateAtMidnight <= checkInDate
  //     );
  //   });

  //   return reservationsWithinPeriod.length > 0;
  // };

  const filteredRooms = ROOM_LIST!
    .filter((room: IRoom) => {
      // const reservedWithinPeriod = checkReservationWithinPeriod(room.id);
      // if (reservedWithinPeriod) return;

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

  // const handleRoomSearch = () => {
  //   router.navigate({
  //     to: "/",
  //     search: {
  //       check_in: formatDateToString(checkInDate),
  //       check_out: formatDateToString(checkOutDate),
  //       adult_num: Number(adultNum),
  //       child_num: Number(childNum),
  //       min_price: Number(minPrice),
  //       max_price: Number(maxPrice),
  //     },
  //   });

  //   setFilterOptions({
  //     checkInDate,
  //     checkOutDate,
  //     adultNum,
  //     childNum,
  //     minPrice,
  //     maxPrice,
  //   });
  // };

  return (
    <PageGrid>
      <aside>
        <RoomSearch
          roomSearch={roomSearch}
          setRoomSearch={setRoomSearch}
          resetRoomSearch={resetRoomSearch}
        />
      </aside>
      <div>
        <RoomSort sortType={sortType} setSortType={setSortType} />
        <RoomIndex
          rooms={filteredRooms}
          checkInDate={roomSearch.checkInDate}
          checkOutDate={roomSearch.checkOutDate}
          adultNum={roomSearch.adultNum}
          childNum={roomSearch.childNum}
        />
      </div>
    </PageGrid>
  );
};

export const Route = createFileRoute("/")({
  component: Index,
});
