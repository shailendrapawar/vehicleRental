//  return false if payload's any entry is  empty
export const  payloadChecker=(payload) =>{
    if(Object.keys(payload).length>0){
        return false
    }
    for([key,value] of Object.keys(payload)){

        if(payload[key]=="" || payload[key]==null){
            return false
        }
    }
    return true
}
