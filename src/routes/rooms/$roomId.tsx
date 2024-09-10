import { createFileRoute, notFound } from "@tanstack/react-router";
import { getRoomById } from "@/api/room";

const Room = () => {
  const { room } = Route.useLoaderData();

  return (
    <div className="grid grid-cols-roomPageGrid gap-10">
      <div className="border p-4">
        <div className="grid grid-cols-roomPageCardGrid gap-3">
          <img
            className="block w-[100px] h-[100px] object-cover rounded-lg"
            src={`/room/${room.image}`}
            alt={room.name}
          />
          <div>
            <h2 className="text-lg font-bold mb-1">{room.name}</h2>
            <p>{room.description}</p>
          </div>
        </div>
        <hr className="my-5" />
        <div className="flex justify-between px-2">
          <span>合計額</span>
          <span className="font-bold text-xl">¥32,800</span>
        </div>
      </div>
      <div>
        <div>
          <h2 className="text-xl font-bold mb-2">{room.name}</h2>
          <p>{room.description}</p>
        </div>
        <hr className="my-5" />
        <div className="flex flex-col gap-y-4">
          <div className="flex justify-between">
            <span>宿泊日</span>
            <span>10月1日〜10月3日</span>
          </div>
          <div className="flex justify-between">
            <span>宿泊人数</span>
            <div className="flex flex-col">
              <span>大人：2名</span>
              <span>小人：3名</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/rooms/$roomId")({
  component: Room,
  loader: async ({ params: { roomId } }) => {
    const room = await getRoomById(roomId);
    if (!room) throw notFound();

    return { room };
  },
});
