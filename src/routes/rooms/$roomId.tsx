import { createFileRoute, notFound } from "@tanstack/react-router";

import { getRoomById } from "@/api/room";
import { useAuth } from "@/contexts/authContext";
import LoginForm from "@/components/LoginForm";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  ADULT_MIN_COUNT,
  ADULT_NUM_OPTION_LIST,
  CHILD_MIN_COUNT,
  CHILD_NUM_OPTION_LIST,
} from "@/consts/search";
import {
  calcDateFromToday,
  calcDaysDiff,
  formatDateToString,
  isValidDate,
} from "@/utils/date";

const Room = () => {
  const { userLoggedIn } = useAuth();
  const { room } = Route.useLoaderData();

  const initialState = {
    checkInDate: calcDateFromToday(1),
    checkOutDate: calcDateFromToday(2),
    adultNum: String(ADULT_MIN_COUNT),
    childNum: String(CHILD_MIN_COUNT),
  };

  const currentUrlParams = new URLSearchParams(window.location.search);
  const checkInDateParam = currentUrlParams.get("check_in");
  const checkOutDateParam = currentUrlParams.get("check_out");
  const adultNumParam = currentUrlParams.get("adult_num");
  const childNumParam = currentUrlParams.get("child_num");

  const checkInDateValue =
    checkInDateParam && isValidDate(checkInDateParam)
      ? new Date(checkInDateParam)
      : initialState.checkInDate;
  const [checkInDate] = useState<Date>(checkInDateValue);

  const checkOutDateValue =
    checkOutDateParam && isValidDate(checkOutDateParam)
      ? new Date(checkOutDateParam)
      : initialState.checkOutDate;
  const [checkOutDate] = useState<Date>(checkOutDateValue);

  const adultNumValue =
    adultNumParam && ADULT_NUM_OPTION_LIST.includes(Number(adultNumParam))
      ? adultNumParam
      : initialState.adultNum;
  const [adultNum] = useState<string>(adultNumValue);

  const childNumValue =
    childNumParam && CHILD_NUM_OPTION_LIST.includes(Number(childNumParam))
      ? childNumParam
      : initialState.childNum;
  const [childNum] = useState<string>(childNumValue);

  const calcRoomPrice =
    room.price * calcDaysDiff(checkInDateValue, checkOutDateValue);
  const [totalPrice] = useState<string>(calcRoomPrice.toLocaleString());

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
            <p className="font-bold text-xl">{totalPrice}円</p>
          </div>
        </div>
        <div>
          <div className="grid gap-y-7">
            <div className="grid gap-y-2">
              <p className="text-gray-500">宿泊日</p>
              <div className="flex justify-between">
                <div className="grid gap-y-2">
                  <p className="text-lg">
                    {formatDateToString(checkInDate)} 〜{" "}
                    {formatDateToString(checkOutDate)}
                  </p>
                </div>
                <p className="underline">編集</p>
              </div>
            </div>
            <div className="grid gap-y-2">
              <p className="text-gray-500">宿泊人数</p>
              <div className="flex justify-between">
                <div>
                  <p className="text-lg">大人：{adultNum}名</p>
                  <p className="text-lg">小人：{childNum}名</p>
                </div>
                <p className="underline">編集</p>
              </div>
            </div>
          </div>

          {userLoggedIn ? (
            <Button
              type="submit"
              size="xl"
              className="w-full bg-sky-500 hover:bg-sky-400 mt-10 text-md"
            >
              この内容で予約する
            </Button>
          ) : (
            <>
              <hr className="my-6" />
              <div>
                <h2 className="text-2xl mb-6">
                  予約するにはログインまたは登録してください
                </h2>
                <LoginForm />
              </div>
            </>
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
