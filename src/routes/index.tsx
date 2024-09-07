import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SelectSingleEventHandler } from "react-day-picker";

import { db, collection, getDocs } from "@/firebase/firebase";
import type { Room, SortType } from "@/types";
import { reservationList } from "@/consts";
import PageGrid from "@/components/PageGrid";
import RoomSearchNew from "@/components/RoomSearchNew";
import RoomIndex from "@/components/RoomIndex";
import {
  addDaysToDate,
  formatDateToString,
  parseDateStringToMidnight,
  setHoursToMidnight,
} from "@/utils";
import RoomSort from "@/components/RoomSort";

const ADULT_MIN_COUNT = 1;
const CHILD_MIN_COUNT = 0;

const getRooms = async () => {
  const roomsCol = collection(db, "rooms");
  const roomSnapshot = await getDocs(roomsCol);
  const roomList = roomSnapshot.docs.map((doc) => doc.data() as Room);

  return roomList;
};

const Index = () => {
  const tomorrow = addDaysToDate(new Date(), 1);
  const tomorrowAtMidnight = setHoursToMidnight(tomorrow);

  const dayAfterTomorrow = addDaysToDate(new Date(), 2);
  const dayAfterTomorrowAtMidnight = setHoursToMidnight(dayAfterTomorrow);

  const initialState = {
    checkInDate: tomorrowAtMidnight,
    checkOutDate: dayAfterTomorrowAtMidnight,
    adultNum: String(ADULT_MIN_COUNT),
    childNum: String(CHILD_MIN_COUNT),
    minPrice: String(0),
    maxPrice: String(0),
  };

  const [checkInDate, setCheckInDate] = useState<Date>(
    initialState.checkInDate
  );
  const [checkOutDate, setCheckOutDate] = useState<Date>(
    initialState.checkOutDate
  );
  const [adultNum, setAdultNum] = useState<string>(initialState.adultNum);
  const [childNum, setChildNum] = useState<string>(initialState.childNum);
  const [minPrice, setMinPrice] = useState<string>(initialState.minPrice);
  const [maxPrice, setMaxPrice] = useState<string>(initialState.maxPrice);
  const [sortType, setSortType] = useState<SortType>(1);

  const [filterOptions, setFilterOptions] = useState(initialState);

  const { data, status } = useQuery({
    queryKey: ["rooms"],
    queryFn: getRooms,
  });

  const handleCheckInDateChange: SelectSingleEventHandler = (day) => {
    if (!day) return;

    const parsedCheckInDate = parseDateStringToMidnight(
      formatDateToString(day)
    );
    setCheckInDate(new Date(parsedCheckInDate));
  };

  const handleCheckOutDateChange: SelectSingleEventHandler = (day) => {
    if (!day) return;

    const parsedCheckOutDate = parseDateStringToMidnight(
      formatDateToString(day)
    );
    setCheckOutDate(new Date(parsedCheckOutDate));
  };

  const clearConditions = () => {
    setCheckInDate(tomorrowAtMidnight);
    setCheckOutDate(new Date(dayAfterTomorrowAtMidnight));
    setAdultNum(initialState.adultNum);
    setChildNum(initialState.childNum);
    setMinPrice(initialState.minPrice);
    setMaxPrice(initialState.maxPrice);
  };

  // 検索のチェックイン・チェックアウト期間の間に、すでに予約された日があるか判定する
  const checkReservationWithinPeriod = (roomId: number): boolean => {
    const roomReservations = reservationList.filter((reservation) => {
      return reservation.roomId === roomId;
    });

    if (!roomReservations) return false;

    const reservationsWithinPeriod = roomReservations.filter((reservation) => {
      const reservedCheckInDateAtMidnight = setHoursToMidnight(
        reservation.checkInDate
      );
      const reservedCheckOutDateAtMidnight = setHoursToMidnight(
        reservation.checkOutDate
      );

      const { checkInDate, checkOutDate } = filterOptions;

      return !(
        checkOutDate <= reservedCheckInDateAtMidnight ||
        reservedCheckOutDateAtMidnight <= checkInDate
      );
    });

    return reservationsWithinPeriod.length > 0;
  };

  if (status !== "success") return;

  const filterRooms = () =>
    data!.filter((room: Room) => {
      const reservedWithinPeriod = checkReservationWithinPeriod(room.id);
      if (reservedWithinPeriod) return;

      const { adultNum, childNum, minPrice, maxPrice } = filterOptions;

      const adultNumNumber = Number(adultNum);
      const childNumNumber = Number(childNum);
      const minPriceNumber = Number(minPrice);
      const maxPriceNumber = Number(maxPrice);

      if (room.capacity < adultNumNumber + childNumNumber) return;
      if (minPriceNumber !== 0 && room.price < minPriceNumber) return;
      if (maxPriceNumber !== 0 && maxPriceNumber < room.price) return;

      return true;
    });

  const sortRooms = () => {
    const filteredRooms = filterRooms();
    const sortedRooms = filteredRooms.sort((a, b) =>
      sortType === 1 ? a.price - b.price : b.price - a.price
    );

    return sortedRooms;
  };

  const sortedRooms = sortRooms();

  const handleRoomSearch = () => {
    setFilterOptions({
      checkInDate,
      checkOutDate,
      adultNum,
      childNum,
      minPrice,
      maxPrice,
    });
  };

  return (
    <PageGrid>
      <aside>
        <RoomSearchNew
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          adultNum={adultNum}
          childNum={childNum}
          minPrice={minPrice}
          maxPrice={maxPrice}
          handleCheckInDateChange={handleCheckInDateChange}
          handleCheckOutDateChange={handleCheckOutDateChange}
          setAdultNum={setAdultNum}
          setChildNum={setChildNum}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          handleRoomSearch={handleRoomSearch}
          clearConditions={clearConditions}
        />
      </aside>
      <div className="relative">
        <RoomSort sortType={sortType} setSortType={setSortType} />
        <RoomIndex rooms={sortedRooms} />
      </div>
    </PageGrid>
  );
};

export const Route = createFileRoute("/")({
  component: Index,
});
