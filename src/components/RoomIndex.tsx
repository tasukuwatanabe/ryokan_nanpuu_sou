import styled from "styled-components";

import type { Room } from "../types";
import RoomCard from "../components/RoomCard";
// import { useQuery } from "@tanstack/react-query";
// import { roomList } from "../consts";

const DIV_RoomList = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

// const RoomIndex = ({ sortType }: { sortType: SortType }) => {
const RoomIndex = ({ rooms }: { rooms: Room[] }) => {
  // const { status, data } = useQuery({
  //   queryKey: ["rooms"],
  //   queryFn: () => roomList,
  // });

  // if (status !== "success") return;

  // const sortRooms = (rooms: Room[] = [], sortType: SortType = "asc"): Room[] =>
  //   rooms.sort((a, b) =>
  //     sortType === "asc" ? a.price - b.price : b.price - a.price
  //   );

  // const sortedRooms = sortRooms(data, sortType);

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
