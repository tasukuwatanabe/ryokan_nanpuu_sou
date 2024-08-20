import styled from "styled-components";

import { formatDateToJST } from "../utils";
import Button from "./button/Button";

const DIV_SearchCase = styled.div`
  padding: 15px;
  background-color: rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  row-gap: 20px;

  input,
  select {
    width: 100%;
    height: 35px;
  }
`;

const DIV_FlexStart = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 130px);
`;

const DIV_DateWrap = styled(DIV_FlexStart)`
  column-gap: 10px;
`;

const DIV_GuestsWrap = styled(DIV_FlexStart)`
  column-gap: 10px;
`;

const DIV_PriceWrap = styled(DIV_FlexStart)`
  grid-template-columns: 1fr 15px 1fr;
  align-items: center;
  column-gap: 7px;
`;

const DIV_ButtonWrap = styled(DIV_FlexStart)`
  column-gap: 10px;
  margin-top: 15px;
`;

const SPAN_SearchItemLabel = styled.span`
  font-size: 13px;
  display: block;
  font-weight: 600;
  margin-bottom: 4px;
`;

interface RoomSearchProps {
  checkInDate: Date | "";
  checkOutDate: Date | "";
  handleCheckInDateChange: React.ChangeEventHandler<HTMLInputElement>;
  handleCheckOutDateChange: React.ChangeEventHandler<HTMLInputElement>;
  handleMinPriceChange: React.ChangeEventHandler<HTMLSelectElement>;
  handleMaxPriceChange: React.ChangeEventHandler<HTMLSelectElement>;
  handleAdultNumChange: React.ChangeEventHandler<HTMLSelectElement>;
  handleChildNumChange: React.ChangeEventHandler<HTMLSelectElement>;
}

const RoomSearch = ({
  checkInDate,
  checkOutDate,
  handleCheckInDateChange,
  handleCheckOutDateChange,
  handleAdultNumChange,
  handleChildNumChange,
  handleMinPriceChange,
  handleMaxPriceChange,
}: RoomSearchProps) => {
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
    <DIV_SearchCase>
      <DIV_DateWrap>
        <div>
          <SPAN_SearchItemLabel>チェックイン</SPAN_SearchItemLabel>
          <input
            type="date"
            name="checkInDate"
            value={formatDateToJST(checkInDate)}
            onChange={handleCheckInDateChange}
          />
        </div>
        <div>
          <SPAN_SearchItemLabel>チェックアウト</SPAN_SearchItemLabel>
          <input
            type="date"
            name="checkOutDate"
            value={formatDateToJST(checkOutDate)}
            onChange={handleCheckOutDateChange}
          />
        </div>
      </DIV_DateWrap>
      <DIV_GuestsWrap>
        <div>
          <SPAN_SearchItemLabel>大人人数</SPAN_SearchItemLabel>
          <select onChange={handleAdultNumChange}>{adultNumOptions}</select>
        </div>
        <div>
          <SPAN_SearchItemLabel>子供人数</SPAN_SearchItemLabel>
          <select onChange={handleChildNumChange}>{childNumOptions}</select>
        </div>
      </DIV_GuestsWrap>
      <div>
        <SPAN_SearchItemLabel>予算</SPAN_SearchItemLabel>
        <DIV_PriceWrap>
          <select onChange={handleMinPriceChange}>
            <option value={0}>下限なし</option>
            <option value={5000}>5000円</option>
            <option value={10000}>10000円</option>
            <option value={15000}>15000円</option>
            <option value={20000}>20000円</option>
            <option value={25000}>25000円</option>
            <option value={30000}>30000円</option>
          </select>
          <span>〜</span>
          <select onChange={handleMaxPriceChange}>
            <option value={undefined}>上限なし</option>
            <option value={5000}>5000円</option>
            <option value={10000}>10000円</option>
            <option value={15000}>15000円</option>
            <option value={20000}>20000円</option>
            <option value={25000}>25000円</option>
            <option value={30000}>30000円</option>
          </select>
        </DIV_PriceWrap>
      </div>
      <DIV_ButtonWrap>
        <Button text="条件をクリア" />
        <Button text="部屋を検索" $primary />
      </DIV_ButtonWrap>
    </DIV_SearchCase>
  );
};

export default RoomSearch;
