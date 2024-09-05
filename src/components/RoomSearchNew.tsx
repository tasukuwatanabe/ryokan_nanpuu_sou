import { addDaysToDate, formatDateToString } from "@/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RoomSearchProps {
  checkInDate: Date | "";
  checkOutDate: Date | "";
  adultNum: number;
  childNum: number;
  minPrice: number;
  maxPrice: number;
  handleCheckInDateChange: React.ChangeEventHandler<HTMLInputElement>;
  handleCheckOutDateChange: React.ChangeEventHandler<HTMLInputElement>;
  handleMinPriceChange: React.ChangeEventHandler<HTMLSelectElement>;
  handleMaxPriceChange: React.ChangeEventHandler<HTMLSelectElement>;
  handleAdultNumChange: React.ChangeEventHandler<HTMLSelectElement>;
  handleChildNumChange: React.ChangeEventHandler<HTMLSelectElement>;
  handleRoomSearch: () => void;
  clearConditions: () => void;
}

const RoomSearchNew = ({
  checkInDate,
  checkOutDate,
  adultNum,
  childNum,
  minPrice,
  maxPrice,
  handleCheckInDateChange,
  handleCheckOutDateChange,
  handleAdultNumChange,
  handleChildNumChange,
  handleMinPriceChange,
  handleMaxPriceChange,
  handleRoomSearch,
  clearConditions,
}: RoomSearchProps) => {
  const calcDateFromToday = (additionalDays: number = 0): string => {
    const targetDate = addDaysToDate(new Date(), additionalDays);
    return formatDateToString(targetDate);
  };

  const adultNumOptions = [...Array(10).keys()].map((num) => {
    const numPlusOne = num + 1;
    const numPlusOneWithUnit = `${numPlusOne}名`;
    return (
      <SelectItem value={String(numPlusOne)} key={numPlusOneWithUnit}>
        {numPlusOneWithUnit}
        {numPlusOne === 10 ? "〜" : ""}
      </SelectItem>
    );
  });

  const childNumOptions = [...Array(11).keys()].map((num) => {
    const numWithUnit = `${num}名`;
    return (
      <SelectItem value={String(num)} key={numWithUnit}>
        {numWithUnit}
        {num === 10 ? "〜" : ""}
      </SelectItem>
    );
  });

  return (
    <div className="grid w-full items-start gap-6 overflow-auto">
      <div className="grid gap-6 rounded-lg border px-4 pt-6 pb-5">
        <div className="grid grid-cols-2 gap-x-3">
          <div className="grid gap-1">
            <Label htmlFor="checkInDate" className="text-xs font-bold">
              チェックイン
            </Label>
            <Input id="checkInDate" type="number" placeholder="0.4" />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="checkOutDate" className="text-xs font-bold">
              チェックアウト
            </Label>
            <Input id="checkOutDate" type="number" placeholder="0.4" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-3">
          <div className="grid gap-1">
            <Label htmlFor="adultNum" className="text-xs font-bold">
              大人人数
            </Label>
            <Select>
              <SelectTrigger id="adultNum" className="">
                <SelectValue placeholder="人数を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>{adultNumOptions}</SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1">
            <Label htmlFor="childNum" className="text-xs font-bold">
              子供人数
            </Label>
            <Select>
              <SelectTrigger id="childNum" className="">
                <SelectValue placeholder="人数を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>{childNumOptions}</SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-3">
          <div className="grid gap-1">
            <Label htmlFor="minPrice" className="text-xs font-bold">
              下限料金
            </Label>
            <Input id="minPrice" type="number" placeholder="0" />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="maxPrice" className="text-xs font-bold">
              上限料金
            </Label>
            <Input id="maxPrice" type="number" placeholder="100000" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-3 mt-2">
          <Button onClick={clearConditions} variant="outline">
            条件をクリア
          </Button>
          <Button
            onClick={handleRoomSearch}
            className="bg-sky-500 hover:bg-sky-400"
          >
            部屋を検索
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoomSearchNew;
