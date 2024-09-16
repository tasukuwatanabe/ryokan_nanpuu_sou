import { createNumArray } from "@/utils";

export const ADULT_MIN_COUNT = 1;

export const CHILD_MIN_COUNT = 0;

export const ADULT_NUM_OPTION_LIST = createNumArray(1, 10);

export const CHILD_NUM_OPTION_LIST = createNumArray(0, 10);

export const MIN_PRICE_OPTION_LIST = createNumArray(0, 10).map(
  (num) => num * 10000
);

export const MAX_PRICE_OPTION_LIST = createNumArray(0, 10).map(
  (num) => num * 10000
);
