import React, { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import PageGrid from "../components/PageGrid";
import RoomCard from "../components/RoomCard";
import styled from "styled-components";

const roomsData = [
  {
    id: 1,
    name: "梅の間",
    price: 9800,
    description: "海が一望できる",
    image: "example_1.jpg",
  },
  {
    id: 2,
    name: "竹の間",
    price: 15800,
    description: "山が一望できる",
    image: "example_2.jpg",
  },
  {
    id: 3,
    name: "松の間",
    price: 19800,
    description: "夕焼けが楽しめる",
    image: "example_3.jpg",
  },
  {
    id: 4,
    name: "鶴の間",
    price: 29800,
    description: "海が一望できる",
    image: "example_4.jpg",
  },
];

const DIV_RoomList = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

const DIV_PriceRange = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  column-gap: 5px;
`;

const Index = () => {
  const [rooms, setRooms] = useState(roomsData);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

  useEffect(() => {
    setRooms(roomsData);
  }, []);

  const handleMinPrice: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setMinPrice(Number(e.target.value));
  };

  const handleMaxPrice: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setMaxPrice(Number(e.target.value));
  };

  return (
    <PageGrid>
      <aside>
        <div>
          <span>予算</span>
          <DIV_PriceRange>
            <select onChange={handleMinPrice}>
              <option value={0}>下限なし</option>
              <option value={5000}>5000円</option>
              <option value={10000}>10000円</option>
              <option value={15000}>15000円</option>
              <option value={20000}>20000円</option>
              <option value={25000}>25000円</option>
              <option value={30000}>30000円</option>
            </select>
            <span>〜</span>
            <select onChange={handleMaxPrice}>
              <option value={undefined}>上限なし</option>
              <option value={5000}>5000円</option>
              <option value={10000}>10000円</option>
              <option value={15000}>15000円</option>
              <option value={20000}>20000円</option>
              <option value={25000}>25000円</option>
              <option value={30000}>30000円</option>
            </select>
          </DIV_PriceRange>
        </div>
      </aside>
      <main>
        <DIV_RoomList>
          {rooms &&
            rooms.map((room) => {
              if (room.price < minPrice) return;
              if (maxPrice && room.price > maxPrice) return;

              return <RoomCard key={room.name} room={room} />;
            })}
        </DIV_RoomList>
      </main>
    </PageGrid>
  );
};

export const Route = createFileRoute("/")({
  component: Index,
});
