import { createFileRoute, notFound } from "@tanstack/react-router";

import { getRoomById } from "@/api/room";
import { useAuth } from "@/contexts/authContext";
import LoginForm from "@/components/LoginForm";
import { Button } from "@/components/ui/button";

const Room = () => {
  const { userLoggedIn } = useAuth();
  const { room } = Route.useLoaderData();

  return (
    <div>
      <h1 className="text-2xl mb-8">確認と予約</h1>
      <div className="grid grid-cols-roomPageGrid gap-x-10 items-start">
        <div className="border p-4 rounded-sm">
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
            <p>合計額</p>
            <p className="font-bold text-xl">¥32,800</p>
          </div>
        </div>
        <div>
          <div>
            <h2 className="text-2xl mb-2">{room.name}</h2>
            <p>{room.description}</p>
          </div>
          <hr className="my-6" />
          <div className="grid gap-y-7">
            <div className="grid gap-y-2">
              <p className="text-gray-500">宿泊日</p>
              <div className="flex justify-between">
                <div className="grid gap-y-2">
                  <p className="text-lg">10月1日〜10月3日</p>
                </div>
                <p className="underline">編集</p>
              </div>
            </div>
            <div className="grid gap-y-2">
              <p className="text-gray-500">宿泊人数</p>
              <div className="flex justify-between">
                <div>
                  <p className="text-lg">大人：2名</p>
                  <p className="text-lg">小人：3名</p>
                </div>
                <p className="underline">編集</p>
              </div>
            </div>
          </div>

          {userLoggedIn ? (
            <>
              <hr className="my-6" />
              <div>
                <h2 className="text-2xl mb-6">
                  予約するにはログインまたは登録してください
                </h2>
                <LoginForm />
              </div>
            </>
          ) : (
            <Button
              type="submit"
              size="xl"
              className="w-full bg-sky-500 hover:bg-sky-400 mt-10 text-md"
            >
              この内容で予約する
            </Button>
          )}
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
