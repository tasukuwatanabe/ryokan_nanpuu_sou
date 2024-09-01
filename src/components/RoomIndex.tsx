import styled from "styled-components";

import type { Room } from "@/types";
import RoomCard from "@/components/RoomCard";

const DIV_RoomList = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

const RoomIndex = ({ rooms }: { rooms: Room[] }) => {
  return rooms.length > 0 ? (
    <DIV_RoomList>
      {rooms.map((room: Room) => (
        <RoomCard key={`${room.id}-${room.name}`} room={room} />
      ))}
    </DIV_RoomList>
  ) : (
    <p>お部屋が見つかりませんでした。</p>
  );
};

export default RoomIndex;
