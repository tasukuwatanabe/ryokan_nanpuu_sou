import { FC } from "react";
import { Link } from "@tanstack/react-router";

import type { Room, RoomSearch } from "@/types";
import { formatDateToString } from "@/utils/date";

interface Props {
  room: Room;
  search: RoomSearch;
  params: RoomSearch;
}

const RoomCard: FC<Props> = ({ room, params }) => {
  const {
    id: roomId,
    name: roomName,
    price: roomPrice,
    description: roomDescription,
    image: roomImage,
  } = room;

  const { checkInDate, checkOutDate, adultNum, childNum } = params;

  return (
    <Link
      to="/rooms/$roomId"
      params={{ roomId: String(roomId) }}
      search={{
        checkInDate: checkInDate && formatDateToString(checkInDate, "hyphen"),
        checkOutDate:
          checkOutDate && formatDateToString(checkOutDate, "hyphen"),
        adultNum,
        childNum,
      }}
      className="height-[180px] rounded-sm overflow-hidden border border-gray-300 md:grid md:grid-cols-cardGrid duration-200 hover:opacity-60"
    >
      <div>
        <img
          className="block w-full h-full object-cover"
          src={`/room/${roomImage}`}
          alt={roomName}
        />
      </div>
      <div className="flex flex-col gap-y-2 p-3">
        <div className="flex flex-col flex-grow gap-y-2">
          <p className="text-lg">{roomName}</p>
          <p className="text-sm text-gray-500">{roomDescription}</p>
        </div>
        <div className="flex justify-end gap-x-7">
          <span className="text-xs">
            大人1人あたり：<span className="text-xl mr-1">{roomPrice}</span>円
          </span>
        </div>
      </div>
    </Link>
  );
};

export default RoomCard;
