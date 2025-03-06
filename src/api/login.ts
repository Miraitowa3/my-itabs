import { get,post} from './http';

export  const getWxCode=()=>get('/wx/qrcode')
export  const wxLogin=(data:any)=>post('/wx/login',data)
export  const sendVerifyCode=(data:any)=>post('/user/sendVerifyCode',data)
export  const register=(data:any)=>post('/user/register',data)
export  const login=(data:any)=>post('/user/login',data)

