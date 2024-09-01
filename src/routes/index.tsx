import { useState } from "react";
import styled from "styled-components";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { db, collection, getDocs } from "@/firebase/firebase";
import type { Room, SortType } from "@/types";
import { reservationList } from "@/consts";
import PageGrid from "@/components/PageGrid";
import RoomSearch from "@/components/RoomSearch";
import RoomIndex from "@/components/RoomIndex";
import {
  addDaysToDate,
  parseDateStringToMidnight,
  setHoursToMidnight,
} from "@/utils";
import RoomSort from "@/components/RoomSort";

const ADULT_MIN_COUNT = 1;
const CHILD_MIN_COUNT = 0;

const MAIN_Main = styled.main`
  position: relative;
`;

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
    adultNum: ADULT_MIN_COUNT,
    childNum: CHILD_MIN_COUNT,
    minPrice: 0,
    maxPrice: 0,
  };

  const [checkInDate, setCheckInDate] = useState<Date>(
    initialState.checkInDate
  );
  const [checkOutDate, setCheckOutDate] = useState<Date>(
    initialState.checkOutDate
  );
  const [adultNum, setAdultNum] = useState<number>(initialState.adultNum);
  const [childNum, setChildNum] = useState<number>(initialState.childNum);
  const [minPrice, setMinPrice] = useState<number>(initialState.minPrice);
  const [maxPrice, setMaxPrice] = useState<number>(initialState.maxPrice);
  const [sortType, setSortType] = useState<SortType>(1);

  const [filterOptions, setFilterOptions] = useState(initialState);

  const { data, status } = useQuery({
    queryKey: ["rooms"],
    queryFn: getRooms,
  });

  const handleCheckInDateChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const parsedCheckInDate = parseDateStringToMidnight(e.target.value);
    setCheckInDate(new Date(parsedCheckInDate));
  };

  const handleCheckOutDateChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const parsedCheckOutDate = parseDateStringToMidnight(e.target.value);
    setCheckOutDate(new Date(parsedCheckOutDate));
  };

  const handleAdultNumChange: React.ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    setAdultNum(Number(e.target.value));
  };

  const handleChildNumChange: React.ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    setChildNum(Number(e.target.value));
  };

  const handleMinPriceChange: React.ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    setMinPrice(Number(e.target.value));
  };

  const handleMaxPriceChange: React.ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    setMaxPrice(Number(e.target.value));
  };

  const clearConditions = () => {
    setCheckInDate(tomorrowAtMidnight);
    setCheckOutDate(dayAfterTomorrowAtMidnight);
    setAdultNum(ADULT_MIN_COUNT);
    setChildNum(CHILD_MIN_COUNT);
    setMinPrice(0);
    setMaxPrice(0);
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

      if (room.capacity < adultNum + childNum) return;
      if (minPrice && room.price < minPrice) return;
      if (maxPrice && maxPrice < room.price) return;

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
        <RoomSearch
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          adultNum={adultNum}
          childNum={childNum}
          minPrice={minPrice}
          maxPrice={maxPrice}
          handleCheckInDateChange={handleCheckInDateChange}
          handleCheckOutDateChange={handleCheckOutDateChange}
          handleAdultNumChange={handleAdultNumChange}
          handleChildNumChange={handleChildNumChange}
          handleMinPriceChange={handleMinPriceChange}
          handleMaxPriceChange={handleMaxPriceChange}
          handleRoomSearch={handleRoomSearch}
          clearConditions={clearConditions}
        />
      </aside>
      <MAIN_Main>
        <RoomSort sortType={sortType} setSortType={setSortType} />
        <RoomIndex rooms={sortedRooms} />
      </MAIN_Main>
    </PageGrid>
  );
};

export const Route = createFileRoute("/")({
  component: Index,
});
