import { STATUS } from "@/types/global";
import { ErrorIcon, SuccessIcon, WarningIcon, Spinner, CloseIcon } from "./Icons";

interface ISnackBar {
  type: STATUS,
  message: string,
  open: boolean,
  closeSnackBar: () => void
}

export default function SnackBar({ type, message, open, closeSnackBar }: ISnackBar) {

  console.log(`${type} ${message}`)

  const snackBarStyles = {
    loading: 'bg-blue-100',
    success: 'bg-green-100',
    error: 'bg-red-100',
    warning: 'bg-yellow-100'
  }

  const snackBarIcons = {
    loading: (<Spinner />),
    success: (<SuccessIcon />),
    error: (<ErrorIcon />),
    warning: (<WarningIcon />),
  }

  return (
    <div className={`
      w-96
      h-12
      items-center
      flex
      absolute top-2 left-2/4 transform -translate-x-2/4
      ${!open && 'hidden'}
      ${snackBarStyles[type]}
      px-4 py-2 
      rounded-sm
      transition ease-out delay-150
    `}>
      <span>
        {snackBarIcons[type]}
      </span>
      <p className="text-gray-600 ml-2">{message}</p>
      <span onClick={closeSnackBar} className="ml-auto">
        <CloseIcon className="text-black hover:cursor-pointer" />
      </span>
    </div>
  )
}