import styled from "styled-components";

import { type Room } from "../types";
import RoomCard from "../components/RoomCard";
import { Link } from "@tanstack/react-router";

const DIV_RoomList = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

interface RoomIndexProps {
  rooms: Room[] | [];
}

const RoomIndex = ({ rooms }: RoomIndexProps) =>
  rooms.length > 0 ? (
    <DIV_RoomList>
      {rooms.map((room) => (
        <Link to={`/rooms/${room.id}`}>
          <RoomCard key={`${room.id}-${room.name}`} room={room} />
        </Link>
      ))}
    </DIV_RoomList>
  ) : (
    <p>お部屋が見つかりませんでした。</p>
  );

export default RoomIndex;
