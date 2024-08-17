import React, { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { type Room } from "../types";
import { roomList } from "../consts";
import PageGrid from "../components/PageGrid";
import RoomSearch from "../components/RoomSearch";
import RoomIndex from "../components/RoomIndex";
import { parseDateStringToMidnight } from "../utils";

const Index = () => {
  const today = new Date();
  const todaysMidnight = new Date(today.setHours(0, 0, 0, 0));

  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [checkInDate, setCheckInDate] = useState<Date>(todaysMidnight);
  const [checkOutDate, setCheckOutDate] = useState<Date>(todaysMidnight);
  const [adultNum, setAdultNum] = useState<number>(1);
  const [childNum, setChildNum] = useState<number>(0);
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

  useEffect(() => {
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
  }, [checkInDate, checkOutDate, adultNum, childNum, minPrice, maxPrice]);

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

  return (
    <PageGrid>
      <aside>
        <RoomSearch
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          handleCheckInDateChange={handleCheckInDateChange}
          handleCheckOutDateChange={handleCheckOutDateChange}
          handleAdultNumChange={handleAdultNumChange}
          handleChildNumChange={handleChildNumChange}
          handleMinPriceChange={handleMinPriceChange}
          handleMaxPriceChange={handleMaxPriceChange}
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
