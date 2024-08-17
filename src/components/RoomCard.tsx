import { type Room } from "../types";
import styled from "styled-components";

const DIV_RoomCard = styled.div`
  display: grid;
  grid-template-columns: 250px auto;
  height: 180px;
  border-radius: 7px;
  border: 1px solid #c1c1c1;
  overflow: hidden;
`;

const IMG_Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DIV_TextCase = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 12px;
`;

const DIV_TextTop = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  row-gap: 10px;
`;

const DIV_TextBottom = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  column-gap: 30px;
`;

const P_Name = styled.p`
  font-size: 20px;
  font-family: "Sawarabi Mincho", serif;
  font-weight: 700;
`;

const P_Description = styled.p`
  font-size: 14px;
  color: #666;
`;

const SPAN_PricePerAdult = styled.span`
  font-size: 0.8rem;
  line-height: 1;
  white-space: nowrap;
`;

const SPAN_Price = styled.span`
  font-size: 1.2rem;
  margin-right: 2px;
`;

interface RoomProps {
  room: Room;
}

const RoomCard = ({ room }: RoomProps) => {
  const { name, price, description, image } = room;

  return (
    <DIV_RoomCard>
      <div>
        <IMG_Image src={`/room/${image}`} alt={name} />
      </div>
      <DIV_TextCase>
        <DIV_TextTop>
          <P_Name>{name}</P_Name>
          <P_Description>{description}</P_Description>
        </DIV_TextTop>
        <DIV_TextBottom>
          <SPAN_PricePerAdult>
            大人1人あたり：<SPAN_Price>{price}</SPAN_Price>円
          </SPAN_PricePerAdult>
        </DIV_TextBottom>
      </DIV_TextCase>
    </DIV_RoomCard>
  );
};

export default RoomCard;
