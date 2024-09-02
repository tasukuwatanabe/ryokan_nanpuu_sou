import { ChildrenPropsType } from "@/types";

const Container = ({ children }: ChildrenPropsType) => {
  return <div className="p-5 mx-auto max-w-[1000px]">{children}</div>;
};

export default Container;
