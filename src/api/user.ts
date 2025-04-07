import { get,post} from './http';

export  const updateConfig=(data:any)=>post('/user/update',data)
export  const getConfig=()=>get('/user/config')

