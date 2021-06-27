import { ADD_ADDRESS, ALL_ADDRESS,EMPTY_ADDRESS,SELECT_ADDRESS} from '../actions/types';
      
      const initialState = {
        totalLocaton:0,
        locations:[],
        selectedLocation:null,
      };
      
function addressReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case ADD_ADDRESS:
            let newLocation = {
                locationId:payload.location.locationId,
                locationState:payload.location.locationState,
                locationAddress:payload.location.locationAddress,
                locationLocalGovt:payload.location.locationLocalGovt
            }

            state.locations.push(newLocation)
            console.log('Addedd -> ',newLocation)
            return {
            ...state, totalLocaton:state.locations, selectedLocation: newLocation
            }
        case SELECT_ADDRESS:
            let newLocationSelect = null
            for(let i=0, j = state.locations.length; i <j; i++){
                if(state.locations[i].locationId === payload){
                    newLocationSelect = state.locations[i]
                    break
                }
            }
            return {
            ...state, totalLocaton:state.locations, selectedLocation: newLocationSelect
            }
        case ALL_ADDRESS:
            state.selectedLocation = payload.locations.length > 0 ? payload.locations[0]:null
            return {
                ...state, locations:payload.locations, totalLocaton:payload.locations.length
            }
        case EMPTY_ADDRESS:
        return {
            ...state, locations:[], totalLocaton:0, selectedLocation:null
        }
        default:
        return state;
    }
}
      
      
      export default addressReducer;