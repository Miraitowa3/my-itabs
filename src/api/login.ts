import { get} from './http';

export  const getWxCode=()=>get('/wx/qrcode')
