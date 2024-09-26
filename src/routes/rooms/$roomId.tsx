import { useState } from "react";
import { DateRange, SelectRangeEventHandler } from "react-day-picker";
import { createFileRoute, notFound, useRouter } from "@tanstack/react-router";

import { getRoomById } from "@/api/room";
import { useAuth } from "@/contexts/authContext";
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
import LoginForm from "@/components/LoginForm";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const Room = () => {
  const { userLoggedIn } = useAuth();
  const { room } = Route.useLoaderData();
  const router = useRouter();

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
  const checkOutDateValue =
    checkOutDateParam && isValidDate(checkOutDateParam)
      ? new Date(checkOutDateParam)
      : initialState.checkOutDate;

  const [date, setDate] = useState<DateRange | undefined>({
    from: checkInDateValue,
    to: checkOutDateValue,
  });

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
  const [totalPrice, setTotalPrice] = useState<number>(calcRoomPrice);

  const handleDateChange: SelectRangeEventHandler = (range) => {
    const { from, to } = range ?? {};

    setDate({ from, to });

    if (from && to) {
      router.navigate({
        search: {
          check_in: formatDateToString(from),
          check_out: formatDateToString(to),
        },
      });

      setTotalPrice(room.price * calcDaysDiff(from, to));
    }
  };

  return (
    <>
      <h1 className="text-xl">確認と予約</h1>
      <div className="grid grid-cols-1 md:grid-cols-roomPageGrid gap-6 items-start">
        <div className="border p-4 rounded-sm">
          <div className="grid grid-cols-roomPageCardGrid gap-3">
            <img
              className="block w-[100px] h-[100px] object-cover rounded-lg"
              src={`/room/${room.image}`}
              alt={room.name}
            />
            <div>
              <h2 className="text-lg mb-1">{room.name}</h2>
              <p className="text-sm text-gray-500">{room.description}</p>
            </div>
          </div>
          <hr className="my-5" />
          <div className="flex justify-between px-2">
            <p>合計額</p>
            <p className="text-xl">{totalPrice.toLocaleString()}円</p>
          </div>
        </div>
        <div className="grid gap-y-6 md:gap-y-12">
          <div className="grid gap-y-5 md:gap-y-7">
            <div className="grid gap-y-2">
              <p className="text-gray-500">宿泊日</p>
              <div className="flex justify-between">
                <div className="grid gap-y-2">
                  <p className="text-lg flex gap-x-1">
                    <span className="block min-w-[95px]">
                      {date?.from && formatDateToString(date.from)}
                    </span>
                    <span> 〜 </span>
                    <span className="block min-w-[95px]">
                      {date?.to && formatDateToString(date.to)}
                    </span>
                  </p>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <p className="underline cursor-pointer">編集</p>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={handleDateChange}
                      numberOfMonths={1}
                    />
                  </PopoverContent>
                </Popover>
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
              className="w-full bg-sky-500 hover:bg-sky-400 text-md"
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
    </>
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
