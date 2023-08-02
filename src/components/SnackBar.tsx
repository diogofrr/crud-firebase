import { STATUS } from "@/types/global";
import { ErrorIcon, SuccessIcon, WarningIcon } from "./Icons";
import Spinner from "./Spinner";

interface ISnackBar {
  type: STATUS,
  message: string
}

export default function SnackBar({ type, message }: ISnackBar) {

  const snackBarStyles = {
    loading: 'bg-blue-100',
    success: 'bg-green-100',
    error: 'bg-red-100',
    warning: 'bg-yellow-100'
  }

  const snackBarIcons = {
    loading: (<Spinner width="w-6" height="h-6" />),
    success: (SuccessIcon),
    error: (ErrorIcon),
    warning: (WarningIcon),
  }

  return (
    <div className={`
    w-72
    h-12
    items-center
    flex
    absolute top-2 left-2/4 transform -translate-x-2/4
    ${snackBarStyles[type]}
    px-4 py-2 
    rounded-sm 
    `}>
      <span>
        {snackBarIcons[type]}
      </span>
      <p className="text-gray-600 ml-2">{message}</p>
    </div>
  )
}