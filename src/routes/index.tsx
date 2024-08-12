import { useEffect, useState } from "react";
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

const Index = () => {
  const [rooms, setRooms] = useState(roomsData);

  useEffect(() => {
    setRooms(roomsData);
  }, []);

  return (
    <PageGrid>
      <aside>Room Filter</aside>
      <main>
        <DIV_RoomList>
          {rooms &&
            rooms.map((room) => <RoomCard key={room.name} room={room} />)}
        </DIV_RoomList>
      </main>
    </PageGrid>
  );
};

export const Route = createFileRoute("/")({
  component: Index,
});
