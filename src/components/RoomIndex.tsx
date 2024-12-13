import { FC } from "react";

import type { IRoom } from "@/types";
import RoomCard from "@/components/RoomCard";

interface Props {
  rooms: IRoom[];
}

const RoomIndex: FC<Props> = ({ rooms }) => {
  if (rooms.length === 0) return <p>お部屋が見つかりませんでした。</p>;

  return (
    <div className="flex flex-col gap-y-5">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
};

export default RoomIndex;
