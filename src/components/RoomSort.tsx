import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

import { SortType } from "../types";
import { ReactNode } from "@tanstack/react-router";

const UL_SortList = styled.ul`
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

const LI_SortItem = styled.li`
  font-size: 14px;
  line-height: 1.1;
  padding-inline: 10px;
  border-left: 1px solid #d0d0d0;

  &:last-of-type {
    border-right: 1px solid #d0d0d0;
  }

  &:not(.active) {
    color: #ad9b3c;
    cursor: pointer;
    text-decoration: underline;
  }
`;

interface RoomSortT {
  sortType: SortType;
  setSortType: Dispatch<SetStateAction<SortType>>;
}

const SortList = ({ sortType, setSortType }: RoomSortT) => {
  const RoomSortItem = ({
    sort,
    children,
  }: {
    sort: SortType;
    children: ReactNode;
  }) => {
    return (
      <LI_SortItem
        className={sortType === sort ? "active" : ""}
        onClick={() => setSortType(sort)}
      >
        {children}
      </LI_SortItem>
    );
  };

  return (
    <UL_SortList>
      <RoomSortItem sort={1}>料金が安い順</RoomSortItem>
      <RoomSortItem sort={-1}>料金が高い順</RoomSortItem>
    </UL_SortList>
  );
};

export default SortList;
