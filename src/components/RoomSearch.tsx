import { addDaysToDate, formatDateToString } from "@/utils";
import { Button } from "@/components/ui/button";

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

const RoomSearch = ({
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
      <option value={numPlusOne} key={numPlusOneWithUnit}>
        {numPlusOneWithUnit}
        {numPlusOne === 10 ? "〜" : ""}
      </option>
    );
  });

  const childNumOptions = [...Array(11).keys()].map((num) => {
    const numWithUnit = `${num}名`;
    return (
      <option value={num} key={numWithUnit}>
        {numWithUnit}
        {num === 10 ? "〜" : ""}
      </option>
    );
  });

  return (
    <div className="p-4 bg-zinc-200 flex flex-col gap-y-4">
      <div className="grid grid-cols-2 gap-x-3">
        <div>
          <span className="text-xs block font-bold mb-1">チェックイン</span>
          <input
            type="date"
            className="w-full h-[35px]"
            name="checkInDate"
            value={formatDateToString(checkInDate)}
            onChange={handleCheckInDateChange}
            min={calcDateFromToday(1)}
          />
        </div>
        <div>
          <span className="text-xs block font-bold mb-1">チェックアウト</span>
          <input
            type="date"
            className="w-full h-[35px]"
            name="checkOutDate"
            value={formatDateToString(checkOutDate)}
            onChange={handleCheckOutDateChange}
            min={calcDateFromToday(2)}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-3">
        <div>
          <span className="text-xs block font-bold mb-1">大人人数</span>
          <select
            className="w-full h-[35px]"
            value={adultNum}
            onChange={handleAdultNumChange}
          >
            {adultNumOptions}
          </select>
        </div>
        <div>
          <span className="text-xs block font-bold mb-1">子供人数</span>
          <select
            className="w-full h-[35px]"
            value={childNum}
            onChange={handleChildNumChange}
          >
            {childNumOptions}
          </select>
        </div>
      </div>
      <div>
        <span className="text-xs block font-bold mb-1">予算</span>
        <div className="grid grid-cols-searchPriceGrid gap-x-1 items-center">
          <select
            className="w-full h-[35px]"
            value={minPrice}
            onChange={handleMinPriceChange}
          >
            <option value={0}>下限なし</option>
            <option value={5000}>5000円</option>
            <option value={10000}>10000円</option>
            <option value={15000}>15000円</option>
            <option value={20000}>20000円</option>
            <option value={25000}>25000円</option>
            <option value={30000}>30000円</option>
          </select>
          <span className="text-xs text-center">〜</span>
          <select
            className="w-full h-[35px]"
            value={maxPrice}
            onChange={handleMaxPriceChange}
          >
            <option value={0}>上限なし</option>
            <option value={5000}>5000円</option>
            <option value={10000}>10000円</option>
            <option value={15000}>15000円</option>
            <option value={20000}>20000円</option>
            <option value={25000}>25000円</option>
            <option value={30000}>30000円</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-3 mt-3">
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
  );
};

export default RoomSearch;
