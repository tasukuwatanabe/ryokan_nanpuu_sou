import { createNumArray } from "@/utils";

export const adultNumOptionList = createNumArray(1, 10);

export const childNumOptionList = createNumArray(0, 10);

export const minPriceOptionList = createNumArray(0, 10).map(
  (num) => num * 10000
);

export const maxPriceOptionList = createNumArray(0, 10).map(
  (num) => num * 10000
);
