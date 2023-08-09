import { STATUS } from "@/types/global"

const initialState = {
  status: 'loading' as STATUS,
  message: '',
  snackbarOpen: false
}

export default initialState