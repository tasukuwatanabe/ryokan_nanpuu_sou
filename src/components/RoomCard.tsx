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
  padding: 10px 15px;
`;

const DIV_TextTop = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  row-gap: 10px;
`;

const DIV_TextBottom = styled.div`
  text-align: right;
`;

const P_Name = styled.span`
  font-size: 20px;
  font-family: "Sawarabi Mincho", serif;
  font-weight: 700;
`;

const SPAN_PricePerAdult = styled.span`
  font-size: 0.8rem;
`;

const SPAN_Price = styled.span`
  font-size: 1.4rem;
  margin-inline: 5px;
`;

interface RoomProps {
  room: Room;
}

const RoomCard = ({ room }: RoomProps) => {
  const { name, price, image } = room;

  return (
    <DIV_RoomCard>
      <div>
        <IMG_Image src={`/room/${image}`} alt={name} />
      </div>
      <DIV_TextCase>
        <DIV_TextTop>
          <P_Name>{name}</P_Name>
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
