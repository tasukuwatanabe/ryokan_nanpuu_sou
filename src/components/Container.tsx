import { ChildrenPropsType } from "@/types";

const Container = ({ children }: ChildrenPropsType) => {
  return (
    <div className="px-4 md:px-6 mx-auto w-full max-w-[1000px] grid gap-y-6">
      {children}
    </div>
  );
};

export default Container;
