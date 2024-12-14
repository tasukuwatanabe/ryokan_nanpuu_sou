import { FC } from "react";
import { Link } from "@tanstack/react-router";

import type { IRoom, IRoomSearch } from "@/types";
import { formatDateToString } from "@/utils/date";

interface Props {
  room: IRoom;
  search: IRoomSearch;
}

const RoomCard: FC<Props> = ({ room, search }) => {
  const {
    id: roomId,
    name: roomName,
    price: roomPrice,
    description: roomDescription,
    image: roomImage,
  } = room;

  const { checkInDate, checkOutDate, adultNum, childNum } = search;

  return (
    <Link
      to="/rooms/$roomId"
      params={{ roomId: String(roomId) }}
      search={{
        in: formatDateToString(checkInDate, "hyphen"),
        out: formatDateToString(checkOutDate, "hyphen"),
        adult: adultNum,
        child: childNum,
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
