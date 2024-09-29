import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { getRooms } from "@/api/room";
import { useAuth } from "@/contexts/authContext";
import { doDeleteUser } from "@/firebase/auth";
import { formatDateToString } from "@/utils/date";
import { reservationList } from "@/consts";

const MyPage = () => {
  const { currentUser } = useAuth();

  if (!currentUser) return;

  const { isLoading, data: roomList } = useQuery({
    queryKey: ["rooms"],
    queryFn: getRooms,
  });

  if (isLoading) return;

  const reservationWithRoomData =
    (roomList &&
      reservationList
        .filter((reservation) => reservation.userId === currentUser.uid)
        .map((reservation) => {
          const roomData = roomList
            .filter((room) => reservation.roomId === room.id)
            .map((room) => ({
              name: room.name,
              image: room.image,
            }))[0];

          return { ...reservation, room: roomData };
        })) ??
    [];

  return (
    <div className="flex flex-col gap-y-12">
      <div className="flex flex-col gap-y-4">
        <h2 className="text-xl">現在の予約</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reservationWithRoomData.length > 0 ? (
            reservationWithRoomData.map((reservation, index) => (
              <div key={index} className="border p-4 rounded-sm">
                <div className="flex gap-4">
                  <img
                    className="block w-[100px] h-[100px] object-cover rounded-lg"
                    src={`/room/${reservation.room.image}`}
                    alt={reservation.room.name}
                  />
                  <div className="flex flex-col w-full gap-y-1.5">
                    <h3 className="text-md md:text-lg">
                      {reservation.room.name}
                    </h3>
                    <div className="text-sm md:text-md flex flex-col gap-y-0.5 text-gray-500">
                      <p className="flex gap-x-0.5">
                        <span>
                          {formatDateToString(reservation.checkInDate)}
                        </span>
                        <span>〜</span>
                        <span>
                          {formatDateToString(reservation.checkOutDate)}
                        </span>
                      </p>
                      <p className="flex gap-x-2 md:gap-x-3">
                        <span>大人{reservation.adultNum}名</span>
                        <span>小人{reservation.childNum}名</span>
                      </p>
                      <p className="">{reservation.price.toLocaleString()}円</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>予約はまだありません。</p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-y-4">
        <h2 className="text-xl">アカウント</h2>
        <div className="flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-2">
            <p>メールアドレス： {currentUser.email}</p>
          </div>
          <p
            onClick={() => doDeleteUser(currentUser)}
            className="cursor-pointer text-red-500 underline"
          >
            アカウントの削除
          </p>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/_auth/mypage")({
  component: MyPage,
});
