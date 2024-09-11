import { ChildrenPropsType } from "@/types";

const Container = ({ children }: ChildrenPropsType) => {
  return <div className="px-4 md:px-6 mx-auto max-w-[1000px]">{children}</div>;
};

export default Container;
