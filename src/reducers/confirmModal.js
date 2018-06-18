
const initState = {
    show: false,
    task: null

}

// export default function showModal(state = initState, action){
//     const payload = action.payload;
//     if(payload && payload.show){
//         state = {...state, ...payload}
//     } else {
//         //state=false
//         return state={...state, show:false}
//     }
//     return state;
//}


export default function confirmModal(state = initState, action){
    const {type,payload} = action;

    switch(type){
        case 'CANCELED_MODAL':{
            return {
                ...state,
                ...payload
            }
        }

        case 'SHOW_MODAL':{
            return {
                ...state,
                ...payload
            }
        }

        default: 
           return state
    }
    return state
}