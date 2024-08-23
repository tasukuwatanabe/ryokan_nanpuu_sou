import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { createFileRoute } from "@tanstack/react-router";

import type { Room, SortType } from "../types";
import { roomList, reservationList } from "../consts";
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

const UL_FilterList = styled.ul`
  display: flex;
  justify-content: flex-end;
  list-style-type: none;
  margin-bottom: 10px;
`;

const LI_FilterItem = styled.li`
  font-size: 14px;
  line-height: 1.2;
  padding-inline: 10px;
  border-left: 1px solid #f0f0f0;

  &:last-of-type {
    border-right: 1px solid #f0f0f0;
  }

  &:not(.active) {
    color: #ad9b3c;
    cursor: pointer;
    text-decoration: underline;
  }
`;

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
  const [sortType, setSortType] = useState<SortType>("asc");

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

      return !(
        checkOutDate <= reservedCheckInDateAtMidnight ||
        reservedCheckOutDateAtMidnight <= checkInDate
      );
    });

    return reservationsWithinPeriod.length > 0;
  };

  const sortRooms = (rooms: Room[], sortType: SortType = "asc"): Room[] => {
    const sortedRooms = rooms.sort((a, b) => {
      if (sortType === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

    return sortedRooms;
  };

  const filterRooms = (rooms: Room[]): Room[] => {
    const filteredRooms = rooms.filter((room) => {
      const reservedWithinPeriod = checkReservationWithinPeriod(room.id);
      if (reservedWithinPeriod) return;

      if (room.capacity < adultNum + childNum) return;
      if (minPrice && room.price < minPrice) return;
      if (maxPrice && maxPrice < room.price) return;

      return true;
    });

    return filteredRooms;
  };

  const handleRoomSearch = (sortType: SortType = "asc") => {
    const filteredRooms = filterRooms(roomList);
    const sortedRooms = sortRooms(filteredRooms, sortType);

    setFilteredRooms(sortedRooms);
  };

  const handleSortChange = (sortType: SortType = "asc") => {
    setSortType(sortType);
    const sortedRooms = sortRooms(filteredRooms, sortType);

    setFilteredRooms(sortedRooms);
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
        <UL_FilterList>
          <LI_FilterItem
            className={sortType === "asc" ? "active" : ""}
            onClick={() => handleSortChange("asc")}
          >
            料金が安い順
          </LI_FilterItem>
          <LI_FilterItem
            className={sortType === "desc" ? "active" : ""}
            onClick={() => handleSortChange("desc")}
          >
            料金が高い順
          </LI_FilterItem>
        </UL_FilterList>
        <RoomIndex rooms={filteredRooms} />
      </main>
    </PageGrid>
  );
};

export const Route = createFileRoute("/")({
  component: Index,
});
