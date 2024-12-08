import type { IRoom } from "@/types";
import RoomCard from "@/components/RoomCard";

interface PropsType {
  rooms: IRoom[];
  checkInDate: Date;
  checkOutDate: Date;
  adultNum: number;
  childNum: number;
}

const RoomIndex = ({
  rooms,
  checkInDate,
  checkOutDate,
  adultNum,
  childNum,
}: PropsType) => {
  return rooms.length > 0 ? (
    <div className="flex flex-col gap-y-5">
      {rooms.map((room: IRoom) => (
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
