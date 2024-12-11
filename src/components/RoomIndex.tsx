import type { IRoom } from "@/types";
import RoomCard from "@/components/RoomCard";

interface Props {
  rooms: IRoom[];
}

const RoomIndex = ({ rooms }: Props) => {
  return rooms.length > 0 ? (
    <div className="flex flex-col gap-y-5">
      {rooms.map((room: IRoom) => (
        <RoomCard key={`${room.id}-${room.name}`} room={room} />
      ))}
    </div>
  ) : (
    <p>お部屋が見つかりませんでした。</p>
  );
};

export default RoomIndex;
