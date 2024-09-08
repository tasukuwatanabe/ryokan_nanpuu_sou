import { Link } from "@tanstack/react-router";

import type { Room } from "@/types";

interface RoomProps {
  room: Room;
}

const RoomCard = ({ room }: RoomProps) => {
  console.log(room);
  const { id, name, price, description, image } = room;

  return (
    <Link
      to="/rooms/$roomId"
      className="height-[180px] rounded-sm overflow-hidden border border-gray-300 md:grid md:grid-cols-cardGrid duration-200 hover:opacity-60"
      params={{ roomId: id }}
    >
      <div>
        <img
          className="block w-full h-full object-cover"
          src={`/room/${image}`}
          alt={name}
        />
      </div>
      <div className="flex flex-col gap-y-2 p-3">
        <div className="flex flex-col flex-grow gap-y-2">
          <p className="text-lg font-bold">{name}</p>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <div className="flex justify-end gap-x-7">
          <span className="text-xs">
            大人1人あたり：<span className="text-xl mr-1">{price}</span>円
          </span>
        </div>
      </div>
    </Link>
  );
};

export default RoomCard;
