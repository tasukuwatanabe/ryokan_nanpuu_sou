import { ChildrenPropsType } from "@/types";

const Wrapper = ({ children }: ChildrenPropsType) => {
  return <div className="min-h-[100vh] flex flex-col">{children}</div>;
};

export default Wrapper;
