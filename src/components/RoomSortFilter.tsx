import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

import { SortType } from "../types";

const UL_FilterList = styled.ul`
  display: flex;
  justify-content: flex-end;
  list-style-type: none;
  @media screen and (max-width: 767px) {
    margin-bottom: 15px;
  }
  @media screen and (min-width: 768px) {
    position: absolute;
    top: -30px;
    right: 0;
  }
`;

const LI_FilterItem = styled.li`
  font-size: 14px;
  line-height: 1.2;
  padding-inline: 10px;
  border-left: 1px solid #f0f0f0;

  &:last-of-type {
    border-right: 1px solid #f0f0f0;
  }

  &:not(.active) {
    color: #ad9b3c;
    cursor: pointer;
    text-decoration: underline;
  }
`;

interface RoomSortFilterT {
  sortType: SortType;
  setSortType: Dispatch<SetStateAction<SortType>>;
}

const RoomSortFilter = ({ sortType, setSortType }: RoomSortFilterT) => {
  return (
    <UL_FilterList>
      <LI_FilterItem
        className={sortType === 1 ? "active" : ""}
        onClick={() => setSortType(1)}
      >
        料金が安い順
      </LI_FilterItem>
      <LI_FilterItem
        className={sortType === -1 ? "active" : ""}
        onClick={() => setSortType(-1)}
      >
        料金が高い順
      </LI_FilterItem>
    </UL_FilterList>
  );
};

export default RoomSortFilter;
