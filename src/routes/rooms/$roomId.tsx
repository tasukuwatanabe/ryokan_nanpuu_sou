import { createFileRoute, notFound } from "@tanstack/react-router";
import { getRoomById } from "@/api/room";

const Room = () => {
  const { room } = Route.useLoaderData();

  return (
    <div>
      <p>/rooms/{room.id}</p>
      <ul>
        <li>{room.name}</li>
        <li>{room.price}</li>
        <li>{room.description}</li>
      </ul>
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
