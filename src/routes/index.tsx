import React, { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { type Room } from "../types";
import PageGrid from "../components/PageGrid";
import RoomSearch from "../components/RoomSearch";
import RoomIndex from "../components/RoomIndex";
import { parseDateStringToMidnight } from "../utils";

const roomList = [
  {
    id: 1,
    name: "梅の間",
    price: 9800,
    description: "海が一望できる",
    image: "example_1.jpg",
    wifi: false,
    smoking: true,
    breakfast: false,
    reservedDates: [
      new Date(2024, 7, 20),
      new Date(2024, 7, 21),
      new Date(2024, 7, 22),
    ],
  },
  {
    id: 2,
    name: "竹の間",
    price: 15800,
    description: "山が一望できる",
    image: "example_2.jpg",
    wifi: true,
    smoking: false,
    breakfast: false,
    reservedDates: [
      new Date(2024, 7, 25),
      new Date(2024, 7, 26),
      new Date(2024, 7, 27),
    ],
  },
  {
    id: 3,
    name: "松の間",
    price: 19800,
    description: "夕焼けが楽しめる",
    image: "example_3.jpg",
    wifi: true,
    smoking: false,
    breakfast: true,
    reservedDates: [new Date(2024, 7, 1)],
  },
  {
    id: 4,
    name: "鶴の間",
    price: 29800,
    description: "海が一望できる",
    image: "example_4.jpg",
    wifi: true,
    smoking: false,
    breakfast: false,
    reservedDates: [
      new Date(2024, 7, 29),
      new Date(2024, 7, 30),
      new Date(2024, 7, 31),
    ],
  },
];

const Index = () => {
  const today = new Date();
  const todaysMidnight = new Date(today.setHours(0, 0, 0, 0));

  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [checkInDate, setCheckInDate] = useState<Date>(todaysMidnight);
  const [checkOutDate, setCheckOutDate] = useState<Date>(todaysMidnight);
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [wifi, setWifi] = useState<boolean>(false);
  const [smoking, setSmoking] = useState<boolean>(false);
  const [breakfast, setBreakfast] = useState<boolean>(false);

  useEffect(() => {
    const filteredRooms = roomList.filter((roomItem) => {
      // 検索のチェックイン・チェックアウト期間の間に、すでに予約された日があるか判定する
      if (roomItem.reservedDates.length > 0) {
        const reservedDateInRange = roomItem.reservedDates.find(
          (reservedDate) =>
            checkInDate <= reservedDate && reservedDate <= checkOutDate
        );

        if (reservedDateInRange) return;
      }

      if (minPrice && roomItem.price < minPrice) return;
      if (maxPrice && maxPrice < roomItem.price) return;
      if (wifi && !roomItem.wifi) return;
      if (smoking && !roomItem.smoking) return;
      if (breakfast && !roomItem.breakfast) return;

      return true;
    });

    setFilteredRooms(filteredRooms);
  }, [checkInDate, checkOutDate, minPrice, maxPrice, wifi, smoking, breakfast]);

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
          wifi={wifi}
          setWifi={setWifi}
          smoking={smoking}
          setSmoking={setSmoking}
          breakfast={breakfast}
          setBreakfast={setBreakfast}
          handleMinPriceChange={handleMinPriceChange}
          handleMaxPriceChange={handleMaxPriceChange}
          handleCheckInDateChange={handleCheckInDateChange}
          handleCheckOutDateChange={handleCheckOutDateChange}
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
