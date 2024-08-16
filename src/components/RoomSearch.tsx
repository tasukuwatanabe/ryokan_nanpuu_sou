import styled from "styled-components";

import { formatDateToJST } from "../utils";

const DIV_FlexStart = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const DIV_DateWrap = styled(DIV_FlexStart)`
  column-gap: 10px;
`;

const DIV_PriceWrap = styled(DIV_FlexStart)`
  column-gap: 7px;
`;

const DIV_SearchCase = styled.div`
  padding: 15px;
  background-color: rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

const SPAN_SearchItemLabel = styled.span`
  font-size: 13px;
  display: block;
  font-weight: 600;
  margin-bottom: 4px;
`;

interface RoomSearchProps {
  checkInDate: Date;
  handleCheckInDateChange: React.ChangeEventHandler<HTMLInputElement>;
  checkOutDate: Date;
  handleCheckOutDateChange: React.ChangeEventHandler<HTMLInputElement>;
  handleMinPriceChange: React.ChangeEventHandler<HTMLSelectElement>;
  handleMaxPriceChange: React.ChangeEventHandler<HTMLSelectElement>;
}

const RoomSearch = ({
  checkInDate,
  handleCheckInDateChange,
  checkOutDate,
  handleCheckOutDateChange,
  handleMinPriceChange,
  handleMaxPriceChange,
}: RoomSearchProps) => {
  return (
    <DIV_SearchCase>
      <div>
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
      </div>
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
    </DIV_SearchCase>
  );
};

export default RoomSearch;
