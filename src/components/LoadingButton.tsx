import { FC, ReactNode } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "./ui/button";

type Props = {
  disabled: boolean;
  loading: boolean;
  submitted: boolean;
  onSubmit: () => void;
};

type buttonStatus = "default" | "loading" | "success";

const LoadingButton: FC<Props> = ({
  disabled,
  loading,
  submitted,
  onSubmit,
}) => {
  const commonStyle = "w-full border text-md";
  const styleMap: Record<buttonStatus, string> = {
    default: `${commonStyle} border-sky-500 bg-sky-500 hover:bg-sky-400`,
    loading: `${commonStyle} text-gray-400 border-gray-400 bg-white hover:bg-white hover:cursor-default`,
    success: `${commonStyle} text-green-500 border-green-500 bg-white hover:bg-white hover:cursor-default`,
  };

  const contentMap: Record<buttonStatus, ReactNode | string> = {
    default: "この内容で予約する",
    loading: (
      <>
        <Loader2 className="animate-spin mr-1.5" />
        しばらくお待ちください
      </>
    ),
    success: "予約が完了しました！",
  };

  const status = loading ? "loading" : submitted ? "success" : "default";

  return (
    <Button
      type="submit"
      size="xl"
      className={styleMap[status]}
      disabled={disabled}
      onClick={onSubmit}
    >
      {contentMap[status]}
    </Button>
  );
};

export default LoadingButton;
