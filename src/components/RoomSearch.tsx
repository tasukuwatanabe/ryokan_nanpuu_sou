import styled from "styled-components";

const DIV_PriceRange = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  column-gap: 5px;
`;

const DIV_SearchCase = styled.div`
  padding: 15px;
  background-color: rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

const SPAN_SearchItemLabel = styled.span`
  font-size: 14px;
  display: block;
  font-weight: 600;
  margin-bottom: 5px;
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
        <SPAN_SearchItemLabel>予算</SPAN_SearchItemLabel>
        <DIV_PriceRange>
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
        </DIV_PriceRange>
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
