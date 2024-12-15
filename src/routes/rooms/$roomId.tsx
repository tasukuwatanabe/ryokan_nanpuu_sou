import { useEffect, useState } from "react";
import { DateRange, SelectRangeEventHandler } from "react-day-picker";
import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";

import { ROOM_LIST } from "@/consts/room";
import {
  ADULT_NUM_OPTION_LIST,
  CHILD_NUM_OPTION_LIST,
  INITIAL_SEARCH_DATA,
} from "@/consts/search";
import { calcDaysDiff, formatDateToString } from "@/utils/date";
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
import type { RoomReservation, GuestCategory } from "@/types";

const Room = () => {
  const { room } = Route.useLoaderData();
  const navigate = useNavigate();
  const searchParams = Route.useSearch();

  const [reservation, setReservation] = useState<RoomReservation>({
    checkInDate: INITIAL_SEARCH_DATA.checkInDate,
    checkOutDate: INITIAL_SEARCH_DATA.checkOutDate,
    adultNum: INITIAL_SEARCH_DATA.adultNum,
    childNum: INITIAL_SEARCH_DATA.childNum,
  });

  const reservationRange: DateRange = {
    from: reservation.checkInDate,
    to: reservation.checkOutDate,
  };

  useEffect(() => {
    const {
      in: checkInParam,
      out: checkOutParam,
      adult: adultParam,
      child: childParam,
    } = searchParams;

    setReservation({
      checkInDate: checkInParam && new Date(checkInParam),
      checkOutDate: checkOutParam && new Date(checkOutParam),
      adultNum: adultParam && +adultParam,
      childNum: childParam && +childParam,
    });
  }, [searchParams]);

  const getTotalPrice = ({
    checkInDate,
    checkOutDate,
    adultNum,
    childNum,
  }: RoomReservation): string => {
    const totalPrice =
      checkInDate && checkOutDate
        ? room.price *
          calcDaysDiff(checkInDate, checkOutDate) *
          (adultNum + childNum)
        : 0;

    return totalPrice.toLocaleString();
  };
  const totalPrice = getTotalPrice(reservation);

  const handleDateChange: SelectRangeEventHandler = (range) => {
    const { from, to } = range ?? {};

    setReservation((prev) => ({
      ...prev,
      checkInDate: from,
      checkOutDate: to,
    }));

    navigate({
      search: (prev: RoomReservation) => ({
        ...prev,
        in: formatDateToString(from, "hyphen"),
        out: formatDateToString(to, "hyphen"),
      }),
      replace: true,
    });
  };

  const handleGuestNumChange = (key: GuestCategory, value: string) => {
    navigate({
      search: (prev: RoomReservation) => ({
        ...prev,
        [key]: +value,
      }),
      replace: true,
    });
  };

  const guestNumOptions = (type: GuestCategory) => {
    const optionList: { [type in GuestCategory]: number[] } = {
      adult: ADULT_NUM_OPTION_LIST,
      child: CHILD_NUM_OPTION_LIST,
    };

    return optionList[type].map((num) => {
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
            <p className="text-xl">{totalPrice}円</p>
          </div>
        </div>
        <div className="grid gap-y-8">
          <div className="grid gap-y-5 md:gap-y-7">
            <div className="grid gap-y-2">
              <p className="text-gray-500">宿泊日</p>
              <div className="flex justify-between">
                <div className="grid gap-y-2">
                  <p className="text-lg flex gap-x-1">
                    <span className="block min-w-[95px]">
                      {formatDateToString(reservation.checkInDate)}
                    </span>
                    <span> 〜 </span>
                    <span className="block min-w-[95px]">
                      {formatDateToString(reservation.checkOutDate)}
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
                      defaultMonth={reservation.checkInDate}
                      selected={reservationRange}
                      onSelect={handleDateChange}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="grid gap-y-2">
              <p className="text-gray-500">宿泊人数</p>
              <div className="flex justify-between">
                <div>
                  <p className="text-lg">大人：{reservation.adultNum}名</p>
                  <p className="text-lg">小人：{reservation.childNum}名</p>
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
                            value={String(reservation.adultNum)}
                            defaultValue={String(INITIAL_SEARCH_DATA.adultNum)}
                            onValueChange={(value) =>
                              handleGuestNumChange("adult", value)
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
                            value={String(reservation.childNum)}
                            defaultValue={String(INITIAL_SEARCH_DATA.childNum)}
                            onValueChange={(value) =>
                              handleGuestNumChange("child", value)
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
          <Button
            type="submit"
            size="xl"
            className="w-full bg-sky-500 hover:bg-sky-400 text-md"
            disabled={!(reservation.checkInDate && reservation.checkOutDate)}
          >
            この内容で予約する
          </Button>
        </div>
      </div>
    </>
  );
};

const reservationSearchSchema = z.object({
  in: z.string().default(""),
  out: z.string().default(""),
  adult: z.number().default(INITIAL_SEARCH_DATA.adultNum),
  child: z.number().default(INITIAL_SEARCH_DATA.childNum),
});

export const Route = createFileRoute("/rooms/$roomId")({
  component: Room,
  validateSearch: zodValidator(reservationSearchSchema),
  loader: ({ params: { roomId } }) => {
    const room = ROOM_LIST.find((roomItem) => roomItem.id === Number(roomId));
    if (!room) throw notFound();

    return { room };
  },
});
