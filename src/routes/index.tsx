import React, { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { type Room } from "../types";
import PageGrid from "../components/PageGrid";
import RoomSearch from "../components/RoomSearch";
import RoomIndex from "../components/RoomIndex";

const roomsData = [
  {
    id: 1,
    name: "梅の間",
    price: 9800,
    description: "海が一望できる",
    image: "example_1.jpg",
    wifi: false,
    smoking: true,
    breakfast: false,
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
  },
  {
    id: 4,
    name: "鶴の間",
    price: 29800,
    description: "海が一望できる",
    image: "example_4.jpg",
    wifi: true,
    smoking: false,
    breakfast: true,
  },
];

const Index = () => {
  const [filteredRooms, setFilteredRooms] = useState<Room[] | []>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [wifi, setWifi] = useState<boolean>(false);
  const [smoking, setSmoking] = useState<boolean>(false);
  const [breakfast, setBreakfast] = useState<boolean>(false);

  useEffect(() => {
    const filteredRooms = roomsData.filter((room) => {
      if (room.price < minPrice) return;
      if (maxPrice && maxPrice < room.price) return;
      if (wifi && !room.wifi) return;
      if (smoking && !room.smoking) return;
      if (breakfast && !room.breakfast) return;

      return true;
    });

    setFilteredRooms(filteredRooms);
  }, [minPrice, maxPrice, wifi, smoking, breakfast]);

  const handleMinPrice: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setMinPrice(Number(e.target.value));
  };

  const handleMaxPrice: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setMaxPrice(Number(e.target.value));
  };

  return (
    <PageGrid>
      <aside>
        <RoomSearch
          wifi={wifi}
          setWifi={setWifi}
          smoking={smoking}
          setSmoking={setSmoking}
          breakfast={breakfast}
          setBreakfast={setBreakfast}
          handleMinPrice={handleMinPrice}
          handleMaxPrice={handleMaxPrice}
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
