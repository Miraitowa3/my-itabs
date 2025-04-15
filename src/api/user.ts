import { get,post} from './http';

export  const updateConfig=(data:any)=>post('/user/update',data)
export  const getConfig=(params:any)=>get('/user/config',{params})
export  const getHistory=()=>get('/user/history')

export  const delhistory=(data:any)=>post('/user/delhistory',data)


