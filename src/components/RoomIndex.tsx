import { FC } from "react";

import type { IRoom, IRoomSearch } from "@/types";
import RoomCard from "@/components/RoomCard";

interface Props {
  rooms: IRoom[];
  search: IRoomSearch;
}

const RoomIndex: FC<Props> = ({ rooms, search }) => {
  if (rooms.length === 0) return <p>お部屋が見つかりませんでした。</p>;

  return (
    <div className="flex flex-col gap-y-5">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} search={search} />
      ))}
    </div>
  );
};

export default RoomIndex;
