import React, { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { type Room } from "../types";
import { roomList } from "../consts";
import PageGrid from "../components/PageGrid";
import RoomSearch from "../components/RoomSearch";
import RoomIndex from "../components/RoomIndex";
import {
  addDaysToDate,
  parseDateStringToMidnight,
  setHoursToMidnight,
} from "../utils";

const ADULT_MIN_COUNT = 1;
const CHILD_MIN_COUNT = 0;

const Index = () => {
  const tomorrow = addDaysToDate(new Date(), 1);
  const tomorrowAtMidnight = setHoursToMidnight(tomorrow);

  const dayAfterTomorrow = addDaysToDate(new Date(), 2);
  const dayAfterTomorrowAtMidnight = setHoursToMidnight(dayAfterTomorrow);

  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [checkInDate, setCheckInDate] = useState<Date | "">(tomorrowAtMidnight);
  const [checkOutDate, setCheckOutDate] = useState<Date | "">(
    dayAfterTomorrowAtMidnight
  );
  const [adultNum, setAdultNum] = useState<number>(ADULT_MIN_COUNT);
  const [childNum, setChildNum] = useState<number>(CHILD_MIN_COUNT);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);

  useEffect(() => handleRoomSearch(), []);

  const handleCheckInDateChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const parsedCheckInDate = parseDateStringToMidnight(e.target.value);
    setCheckInDate(parsedCheckInDate);
  };

  const handleCheckOutDateChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const parsedCheckOutDate = parseDateStringToMidnight(e.target.value);
    setCheckOutDate(parsedCheckOutDate);
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

  const handleRoomSearch = () => {
    const filteredRooms = roomList.filter((roomItem) => {
      // 検索のチェックイン・チェックアウト期間の間に、すでに予約された日があるか判定する
      // if (roomItem.reservedDates.length > 0) {
      //   const reservedDateInRange = roomItem.reservedDates.find(
      //     (reservedDate) =>
      //       checkInDate <= reservedDate && reservedDate <= checkOutDate
      //   );

      //   if (reservedDateInRange) return;
      // }

      if (roomItem.capacity < adultNum + childNum) return;
      if (minPrice && roomItem.price < minPrice) return;
      if (maxPrice && maxPrice < roomItem.price) return;

      return true;
    });

    setFilteredRooms(filteredRooms);
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
      <main>
        <RoomIndex rooms={filteredRooms} />
      </main>
    </PageGrid>
  );
};

export const Route = createFileRoute("/")({
  component: Index,
});
