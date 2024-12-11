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
import { SelectSingleEventHandler } from "react-day-picker";

interface Props {
  roomSearch: IRoomSearch;
  onChange: (key: keyof IRoomSearch, value: any) => void;
  handleSearchReset: () => void;
}

const RoomSearchNew: React.FC<Props> = ({
  roomSearch,
  onChange,
  handleSearchReset,
}) => {
  const { checkInDate, checkOutDate, adultNum, childNum, minPrice, maxPrice } =
    roomSearch;

  const makeGuestNumSelectList = (list: number[]) =>
    list.map((num, i) => {
      const postfix = i === list.length - 1 ? "〜" : "";
      const numWithUnit = `${num}名${postfix}`;

      return (
        <SelectItem value={String(num)} key={numWithUnit}>
          {numWithUnit}
        </SelectItem>
      );
    });

  const makePriceSelectList = (list: number[], defaultText: string) =>
    list.map((price) => {
      const text = price === 0 ? defaultText : `${price}円`;

      return (
        <SelectItem value={String(price)} key={text}>
          {text}
        </SelectItem>
      );
    });

  const adultNumSelectList = makeGuestNumSelectList(ADULT_NUM_OPTION_LIST);

  const childNumSelectList = makeGuestNumSelectList(CHILD_NUM_OPTION_LIST);

  const minPriceSelectItemList = makePriceSelectList(
    PRICE_OPTION_LIST,
    "下限なし"
  );
  const maxPriceSelectItemList = makePriceSelectList(
    PRICE_OPTION_LIST,
    "上限なし"
  );

  const handleCheckInChange: SelectSingleEventHandler = (day) =>
    onChange("checkInDate", day);

  const handleCheckOutChange: SelectSingleEventHandler = (day) =>
    onChange("checkOutDate", day);

  const handleAdultNumChange = (value: string) => onChange("adultNum", value);

  const handleChildNumChange = (value: string) => onChange("childNum", value);

  const handleMinPriceChange = (value: string) => onChange("minPrice", value);

  const handleMaxPriceChange = (value: string) => onChange("maxPrice", value);

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
                  onSelect={handleCheckOutChange}
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
              onValueChange={handleAdultNumChange}
            >
              <SelectTrigger id="adultNum" className="rounded-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>{adultNumSelectList}</SelectGroup>
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
              onValueChange={handleChildNumChange}
            >
              <SelectTrigger id="childNum" className="rounded-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>{childNumSelectList}</SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-3">
          <div className="grid gap-1">
            <Label htmlFor="minPrice" className="text-xs">
              下限料金
            </Label>
            <Select
              value={String(minPrice)}
              onValueChange={handleMinPriceChange}
            >
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
            <Select
              value={String(maxPrice)}
              onValueChange={handleMaxPriceChange}
            >
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
            onClick={handleSearchReset}
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
