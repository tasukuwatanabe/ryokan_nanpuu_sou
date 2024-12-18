import { FC } from "react";

import type { Room, RoomSearch } from "@/types";
import RoomCard from "@/components/RoomCard";

interface Props {
  rooms: Room[];
  search: RoomSearch;
  params: RoomSearch;
}

const RoomIndex: FC<Props> = ({ rooms, search, params }) => {
  if (rooms.length === 0) return <p>お部屋が見つかりませんでした。</p>;

  return (
    <div className="flex flex-col gap-y-5">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} search={search} params={params} />
      ))}
    </div>
  );
};

export default RoomIndex;
