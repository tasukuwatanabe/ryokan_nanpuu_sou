import { ChildrenPropsType } from "@/types";

const PageGrid = ({ children }: ChildrenPropsType) => {
  return (
    <div className="grid grid-cols-1 gap-y-10 md:grid-cols-pageGrid md:gap-x-5 lg:gap-x-8">
      {children}
    </div>
  );
};

export default PageGrid;
