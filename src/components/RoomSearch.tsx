import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { calcDateFromToday } from "@/utils/date";
import {
  ADULT_NUM_OPTION_LIST,
  CHILD_NUM_OPTION_LIST,
  PRICE_OPTION_LIST,
} from "@/consts/search";
import { IRoomSearch } from "@/types";
import React from "react";
import { SelectSingleEventHandler } from "react-day-picker";

interface Props {
  roomSearch: IRoomSearch;
  setRoomSearch: React.Dispatch<React.SetStateAction<IRoomSearch>>;
  handleReset: () => void;
}

const RoomSearchNew = ({ roomSearch, setRoomSearch, handleReset }: Props) => {
  const { checkInDate, checkOutDate, adultNum, childNum, minPrice, maxPrice } =
    roomSearch;

  const adultNumOptions = ADULT_NUM_OPTION_LIST.map((num) => {
    const numWithUnit = `${num}名`;

    return (
      <SelectItem value={String(num)} key={numWithUnit}>
        {numWithUnit}
        {num === 10 ? "〜" : ""}
      </SelectItem>
    );
  });

  const childNumOptions = CHILD_NUM_OPTION_LIST.map((num) => {
    const numWithUnit = `${num}名`;

    return (
      <SelectItem value={String(num)} key={numWithUnit}>
        {numWithUnit}
        {num === 10 ? "〜" : ""}
      </SelectItem>
    );
  });

  const makePriceSelectItem = (price: number, text: string) => (
    <SelectItem value={String(price)} key={text}>
      {text}
    </SelectItem>
  );

  const minPriceSelectItemList = PRICE_OPTION_LIST.map((price) => {
    const text = price === 0 ? "下限なし" : `${price}円`;
    return makePriceSelectItem(price, text);
  });

  const maxPriceSelectItemList = PRICE_OPTION_LIST.map((price) => {
    const text = price === 0 ? "上限なし" : `${price}円`;
    return makePriceSelectItem(price, text);
  });

  const handleCheckInChange: SelectSingleEventHandler = (day) => {
    setRoomSearch({
      ...roomSearch,
      checkInDate: day,
    });
  };

  return (
    <div className="grid w-full items-start gap-6 overflow-auto">
      <div className="grid gap-6 rounded-sm border px-4 pt-6 pb-5">
        <div className="grid grid-cols-2 gap-x-3">
          <div className="grid gap-1">
            <Label htmlFor="checkInDate" className="text-xs">
              チェックイン
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "px-3 block rounded-sm",
                    !checkInDate && "text-muted-foreground"
                  )}
                >
                  <div className="flex items-center font-normal">
                    {checkInDate ? (
                      format(checkInDate, "yyyy/MM/dd")
                    ) : (
                      <span>日付を選択</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4" />
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={checkInDate}
                  onSelect={handleCheckInChange}
                  fromDate={calcDateFromToday(1)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid gap-1">
            <Label htmlFor="checkOutDate" className="text-xs">
              チェックアウト
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "px-3 block rounded-sm",
                    !checkInDate && "text-muted-foreground"
                  )}
                >
                  <div className="flex items-center font-normal">
                    {checkOutDate ? (
                      format(checkOutDate, "yyyy/MM/dd")
                    ) : (
                      <span>日付を選択</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4" />
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={checkOutDate}
                  onSelect={() => {}}
                  fromDate={calcDateFromToday(2)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-3">
          <div className="grid gap-1">
            <Label htmlFor="adultNum" className="text-xs">
              大人人数
            </Label>
            <Select
              value={String(adultNum)}
              defaultValue="1"
              onValueChange={() => {}}
            >
              <SelectTrigger id="adultNum" className="rounded-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>{adultNumOptions}</SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1">
            <Label htmlFor="childNum" className="text-xs">
              子供人数
            </Label>
            <Select
              value={String(childNum)}
              defaultValue="0"
              onValueChange={() => {}}
            >
              <SelectTrigger id="childNum" className="rounded-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>{childNumOptions}</SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-3">
          <div className="grid gap-1">
            <Label htmlFor="minPrice" className="text-xs">
              下限料金
            </Label>
            <Select value={String(minPrice)} onValueChange={() => {}}>
              <SelectTrigger id="minPrice" className="rounded-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>{minPriceSelectItemList}</SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1">
            <Label htmlFor="maxPrice" className="text-xs">
              上限料金
            </Label>
            <Select value={String(maxPrice)} onValueChange={() => {}}>
              <SelectTrigger id="minPrice" className="rounded-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>{maxPriceSelectItemList}</SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-3 mt-2">
          <Button
            onClick={handleReset}
            variant="outline"
            className="rounded-sm"
          >
            条件をクリア
          </Button>
          <Button
            onClick={() => {}}
            className="bg-sky-500 hover:bg-sky-400 rounded-sm"
          >
            部屋を検索
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoomSearchNew;
