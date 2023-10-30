import { STATUS } from "@/types/global";
import {
  ErrorIcon,
  SuccessIcon,
  WarningIcon,
  Spinner,
  CloseIcon,
} from "./Icons";

interface ISnackBar {
  type: STATUS;
  message: string;
  open: boolean;
  closeSnackBar: () => void;
  floating?: boolean;
}

export default function SnackBar({
  type,
  message,
  open,
  closeSnackBar,
  floating = true
}: ISnackBar) {
  const snackBarStyles = {
    loading: "bg-blue-50",
    success: "bg-hippieGreen-50",
    error: "bg-red-50",
    warning: "bg-yellow-50",
    idle: "hidden",
  };

  const snackBarIcons = {
    loading: <Spinner />,
    success: <SuccessIcon />,
    error: <ErrorIcon />,
    warning: <WarningIcon />,
    idle: <></>,
  };

  const snackBarTexts = {
    loading: "text-blue-400",
    success: "text-hippieGreen-700",
    error: "text-red-700",
    warning: "text-yellow-700",
    idle: "hidden",
  };

  if (!open) return null;
  return (
    <div
      className={`
      ${snackBarStyles[type]}
        w-full
        sm:w-96
        h-auto
        sm:h-12
        flex
        items-center
        rounded-sm
        px-4 py-4

        ${floating && (` 
          top-0
          sm:top-2 
          left-2/4 
          absolute 
          transform 
          -translate-x-2/4
        `)}
      `}
    >
      <span>{snackBarIcons[type]}</span>
      <p className={`${snackBarTexts[type]} ml-2`}>{message}</p>
      <span onClick={closeSnackBar} className="ml-auto">
        <CloseIcon className={`${snackBarTexts[type]} hover:cursor-pointer`} />
      </span>
    </div>
  );
}
