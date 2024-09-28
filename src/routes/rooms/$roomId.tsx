import { useState } from "react";
import { DateRange, SelectRangeEventHandler } from "react-day-picker";
import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";

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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Room = () => {
  const { userLoggedIn } = useAuth();
  const { room } = Route.useLoaderData();
  const navigate = useNavigate();

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
  const [adultNum, setAdultNum] = useState<string>(adultNumValue);

  const childNumValue =
    childNumParam && CHILD_NUM_OPTION_LIST.includes(Number(childNumParam))
      ? childNumParam
      : initialState.childNum;
  const [childNum, setChildNum] = useState<string>(childNumValue);

  const calcRoomPrice =
    room.price * calcDaysDiff(checkInDateValue, checkOutDateValue);
  const [totalPrice, setTotalPrice] = useState<number>(calcRoomPrice);

  const handleDateChange: SelectRangeEventHandler = (range) => {
    const { from, to } = range ?? {};

    setDate({ from, to });

    if (from && to) {
      navigate({
        search: {
          check_in: formatDateToString(from),
          check_out: formatDateToString(to),
        },
      });

      setTotalPrice(room.price * calcDaysDiff(from, to));
    }
  };

  const handleGuestNumChange = (
    key: "adult_num" | "child_num",
    value: string
  ) => {
    currentUrlParams.set(key, value);

    navigate({
      search: {
        adult_num: +value,
        child_num: +value,
      },
    });

    if (key === "adult_num") {
      setAdultNum(value);
    } else {
      setChildNum(value);
    }
  };

  const guestNumOptions = (type: "adult" | "child") => {
    const optionList =
      type === "adult" ? ADULT_NUM_OPTION_LIST : CHILD_NUM_OPTION_LIST;

    return optionList.map((num) => {
      const numWithUnit = `${num}名`;

      return (
        <SelectItem value={String(num)} key={numWithUnit}>
          {numWithUnit}
          {num === 10 ? "〜" : ""}
        </SelectItem>
      );
    });
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
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <p className="underline cursor-pointer grow-0">編集</p>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <div className="w-[200px] p-4 grid grid-cols-2 gap-x-3">
                        <div className="grid gap-1">
                          <Label htmlFor="adultNum" className="text-xs">
                            大人人数
                          </Label>
                          <Select
                            value={adultNum}
                            defaultValue="1"
                            onValueChange={(value) =>
                              handleGuestNumChange("adult_num", value)
                            }
                          >
                            <SelectTrigger id="adultNum" className="rounded-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {guestNumOptions("adult")}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-1">
                          <Label htmlFor="childNum" className="text-xs">
                            子供人数
                          </Label>
                          <Select
                            value={childNum}
                            defaultValue="0"
                            onValueChange={(value) =>
                              handleGuestNumChange("child_num", value)
                            }
                          >
                            <SelectTrigger id="childNum" className="rounded-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {guestNumOptions("child")}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
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
