import type { Room } from "@/types";
import RoomCard from "@/components/RoomCard";

const RoomIndex = ({ rooms }: { rooms: Room[] }) => {
  return rooms.length > 0 ? (
    <div className="flex flex-col gap-y-5">
      {rooms.map((room: Room) => (
        <RoomCard key={`${room.id}-${room.name}`} room={room} />
      ))}
    </div>
  ) : (
    <p>お部屋が見つかりませんでした。</p>
  );
};

export default RoomIndex;
