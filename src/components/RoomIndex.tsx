import type { Room } from "@/types";
import RoomCard from "@/components/RoomCard";

interface RoomIndexProps {
  rooms: Room[];
  checkInDate: Date;
  checkOutDate: Date;
  adultNum: string;
  childNum: string;
}

const RoomIndex = ({
  rooms,
  checkInDate,
  checkOutDate,
  adultNum,
  childNum,
}: RoomIndexProps) => {
  return rooms.length > 0 ? (
    <div className="flex flex-col gap-y-5">
      {rooms.map((room: Room) => (
        <RoomCard
          key={`${room.id}-${room.name}`}
          room={room}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          adultNum={adultNum}
          childNum={childNum}
        />
      ))}
    </div>
  ) : (
    <p>お部屋が見つかりませんでした。</p>
  );
};

export default RoomIndex;
