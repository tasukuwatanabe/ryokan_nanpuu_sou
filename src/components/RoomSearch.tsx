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

const DIV_CheckboxCase = styled.div`
  display: flex;
  flex-direction: column;
`;

const LABEL_CheckboxLabel = styled.label`
  display: flex;
  column-gap: 5px;
  cursor: pointer;
`;

interface FacilityCheckItem {
  label: string;
  value: boolean;
  onChange: () => void;
}

const Checkbox = ({ label, value, onChange }: FacilityCheckItem) => {
  return (
    <LABEL_CheckboxLabel>
      <input type="checkbox" checked={value} onChange={onChange} />
      {label}
    </LABEL_CheckboxLabel>
  );
};

interface RoomSearchProps {
  checkInDate: Date;
  handleCheckInDate: React.ChangeEventHandler<HTMLInputElement>;
  checkOutDate: Date;
  handleCheckOutDate: React.ChangeEventHandler<HTMLInputElement>;
  wifi: boolean;
  setWifi: React.Dispatch<React.SetStateAction<boolean>>;
  smoking: boolean;
  setSmoking: React.Dispatch<React.SetStateAction<boolean>>;
  breakfast: boolean;
  setBreakfast: React.Dispatch<React.SetStateAction<boolean>>;
  handleMinPrice: React.ChangeEventHandler<HTMLSelectElement>;
  handleMaxPrice: React.ChangeEventHandler<HTMLSelectElement>;
}

const RoomSearch = ({
  checkInDate,
  handleCheckInDate,
  checkOutDate,
  handleCheckOutDate,
  wifi,
  setWifi,
  smoking,
  setSmoking,
  breakfast,
  setBreakfast,
  handleMinPrice,
  handleMaxPrice,
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
              onChange={handleCheckInDate}
            />
          </div>
          <div>
            <SPAN_SearchItemLabel>チェックアウト</SPAN_SearchItemLabel>
            <input
              type="date"
              name="checkOutDate"
              value={formatDateToJST(checkOutDate)}
              onChange={handleCheckOutDate}
            />
          </div>
        </DIV_DateWrap>
      </div>
      <div>
        <SPAN_SearchItemLabel>予算</SPAN_SearchItemLabel>
        <DIV_PriceWrap>
          <select onChange={handleMinPrice}>
            <option value={0}>下限なし</option>
            <option value={5000}>5000円</option>
            <option value={10000}>10000円</option>
            <option value={15000}>15000円</option>
            <option value={20000}>20000円</option>
            <option value={25000}>25000円</option>
            <option value={30000}>30000円</option>
          </select>
          <span>〜</span>
          <select onChange={handleMaxPrice}>
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
      <div>
        <SPAN_SearchItemLabel>設備・サービス</SPAN_SearchItemLabel>
        <DIV_CheckboxCase>
          <Checkbox
            label="Wifi"
            value={wifi}
            onChange={() => setWifi((state) => !state)}
          />
          <Checkbox
            label="禁煙"
            value={smoking}
            onChange={() => setSmoking((state) => !state)}
          />
          <Checkbox
            label="朝食付き"
            value={breakfast}
            onChange={() => setBreakfast((state) => !state)}
          />
        </DIV_CheckboxCase>
      </div>
    </DIV_SearchCase>
  );
};

export default RoomSearch;
