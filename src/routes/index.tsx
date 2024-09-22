import { useState } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SelectSingleEventHandler } from "react-day-picker";

import type { Room, SortType } from "@/types";
import { reservationList } from "@/consts";
import {
  calcDateFromToday,
  formatDateToString,
  isValidDate,
  setHoursToMidnight,
} from "@/utils/date";
import { getRooms } from "@/api/room";
import PageGrid from "@/components/PageGrid";
import RoomSearch from "@/components/RoomSearch";
import RoomIndex from "@/components/RoomIndex";
import RoomSort from "@/components/RoomSort";
import {
  ADULT_MIN_COUNT,
  CHILD_MIN_COUNT,
  ADULT_NUM_OPTION_LIST,
  CHILD_NUM_OPTION_LIST,
  MIN_PRICE_OPTION_LIST,
  MAX_PRICE_OPTION_LIST,
} from "@/consts/search";

const Index = () => {
  const initialState = {
    checkInDate: calcDateFromToday(1),
    checkOutDate: calcDateFromToday(2),
    adultNum: String(ADULT_MIN_COUNT),
    childNum: String(CHILD_MIN_COUNT),
    minPrice: String(0),
    maxPrice: String(0),
  };

  const currentUrlParams = new URLSearchParams(window.location.search);
  const checkInDateParam = currentUrlParams.get("check_in");
  const checkOutDateParam = currentUrlParams.get("check_out");
  const adultNumParam = currentUrlParams.get("adult_num");
  const childNumParam = currentUrlParams.get("child_num");
  const minPriceParam = currentUrlParams.get("min_price");
  const maxPriceParam = currentUrlParams.get("max_price");

  const checkInDateValue =
    checkInDateParam && isValidDate(checkInDateParam)
      ? new Date(checkInDateParam)
      : initialState.checkInDate;
  const [checkInDate, setCheckInDate] = useState<Date>(checkInDateValue);

  const checkOutDateValue =
    checkOutDateParam && isValidDate(checkOutDateParam)
      ? new Date(checkOutDateParam)
      : initialState.checkOutDate;
  const [checkOutDate, setCheckOutDate] = useState<Date>(checkOutDateValue);

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

  const minPriceValue =
    minPriceParam && MIN_PRICE_OPTION_LIST.includes(Number(minPriceParam))
      ? minPriceParam
      : initialState.minPrice;
  const [minPrice, setMinPrice] = useState<string>(minPriceValue);

  const maxPriceValue =
    maxPriceParam && MAX_PRICE_OPTION_LIST.includes(Number(maxPriceParam))
      ? maxPriceParam
      : initialState.maxPrice;
  const [maxPrice, setMaxPrice] = useState<string>(maxPriceValue);

  const [sortType, setSortType] = useState<SortType>(1);

  const [filterOptions, setFilterOptions] = useState(initialState);

  const router = useRouter();

  const { data, status } = useQuery({
    queryKey: ["rooms"],
    queryFn: getRooms,
  });

  const handleCheckInDateChange: SelectSingleEventHandler = (day) => {
    if (!day) return;

    const checkInDateAtMidnight = new Date(setHoursToMidnight(day));
    setCheckInDate(checkInDateAtMidnight);
  };

  const handleCheckOutDateChange: SelectSingleEventHandler = (day) => {
    if (!day) return;

    const checkOutDateAtMidnight = new Date(setHoursToMidnight(day));
    setCheckOutDate(checkOutDateAtMidnight);
  };

  const clearConditions = () => {
    setCheckInDate(initialState.checkInDate);
    setCheckOutDate(initialState.checkOutDate);
    setAdultNum(initialState.adultNum);
    setChildNum(initialState.childNum);
    setMinPrice(initialState.minPrice);
    setMaxPrice(initialState.maxPrice);
  };

  // 検索のチェックイン・チェックアウト期間の間に、すでに予約された日があるか判定する
  const checkReservationWithinPeriod = (roomId: string): boolean => {
    const roomReservations = reservationList.filter((reservation) => {
      return reservation.roomId === roomId;
    });

    if (!roomReservations) return false;

    const reservationsWithinPeriod = roomReservations.filter((reservation) => {
      const reservedCheckInDateAtMidnight = setHoursToMidnight(
        reservation.checkInDate
      );
      const reservedCheckOutDateAtMidnight = setHoursToMidnight(
        reservation.checkOutDate
      );

      const { checkInDate, checkOutDate } = filterOptions;

      return !(
        checkOutDate <= reservedCheckInDateAtMidnight ||
        reservedCheckOutDateAtMidnight <= checkInDate
      );
    });

    return reservationsWithinPeriod.length > 0;
  };

  if (status !== "success") return;

  const filterRooms = () =>
    data.filter((room: Room) => {
      const reservedWithinPeriod = checkReservationWithinPeriod(room.id);
      if (reservedWithinPeriod) return;

      const { adultNum, childNum, minPrice, maxPrice } = filterOptions;

      const adultNumNumber = Number(adultNum);
      const childNumNumber = Number(childNum);
      const minPriceNumber = Number(minPrice);
      const maxPriceNumber = Number(maxPrice);

      // TODO: prettierが丸括弧を自動除去しないように設定変更した上でリファクタ
      if (room.capacity < adultNumNumber + childNumNumber) return;
      if (minPriceNumber !== 0 && room.price < minPriceNumber) return;
      if (maxPriceNumber !== 0 && maxPriceNumber < room.price) return;

      return true;
    });

  const sortRooms = () => {
    const filteredRooms = filterRooms();
    const sortedRooms = filteredRooms.sort((a, b) =>
      sortType === 1 ? a.price - b.price : b.price - a.price
    );

    return sortedRooms;
  };

  const sortedRooms = sortRooms();

  const handleRoomSearch = () => {
    router.navigate({
      to: "/",
      search: {
        check_in: formatDateToString(checkInDate),
        check_out: formatDateToString(checkOutDate),
        adult_num: Number(adultNum),
        child_num: Number(childNum),
        min_price: Number(minPrice),
        max_price: Number(maxPrice),
      },
    });

    setFilterOptions({
      checkInDate,
      checkOutDate,
      adultNum,
      childNum,
      minPrice,
      maxPrice,
    });
  };

  return (
    <PageGrid>
      <aside>
        <RoomSearch
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          adultNum={adultNum}
          childNum={childNum}
          minPrice={minPrice}
          maxPrice={maxPrice}
          handleCheckInDateChange={handleCheckInDateChange}
          handleCheckOutDateChange={handleCheckOutDateChange}
          setAdultNum={setAdultNum}
          setChildNum={setChildNum}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          handleRoomSearch={handleRoomSearch}
          clearConditions={clearConditions}
        />
      </aside>
      <div className="relative">
        <RoomSort sortType={sortType} setSortType={setSortType} />
        <RoomIndex
          rooms={sortedRooms}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          adultNum={adultNum}
          childNum={childNum}
        />
      </div>
    </PageGrid>
  );
};

export const Route = createFileRoute("/")({
  component: Index,
});
