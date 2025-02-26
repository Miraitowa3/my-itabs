import { get,post} from './http';

export  const getWxCode=()=>get('/wx/qrcode')
export  const wxLogin=(data:any)=>post('/wx/login',data)
