import {
  ADD_USER,
  ADD_VEHICLE,
  USER_LOGGED,
  ADD_OBSERVATION,
  REMOVE_OBSERVATION,
  ADD_OBSACCEPTED,
  REMOVE_OBSACCEPTED,
  ADD_OBSREJECTED,
  REMOVE_OBSREJECTED,
  OBTAIN_USERID,
} from './actionTypes';

const initialState = {
  usuarios: [],
  vehiculos: [],
  usuario: '',
  quantityObs: 0,
  quantityObsAccepted: 0,
  quantityObsRejected: 0,
  usuarioID: '',
};

export const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {...state, usuarios: [...state.usuarios, action.payload]};
    case ADD_VEHICLE:
      return {...state, vehiculos: [...state.vehiculos, action.payload]};
    case USER_LOGGED:
      return {...state, usuario: [action.payload]};
    case ADD_OBSERVATION:
      return {...state, quantityObs: state.quantityObs + 1};
    case REMOVE_OBSERVATION:
      return {...state, quantityObs: state.quantityObs - 1};
    case ADD_OBSACCEPTED:
      return {...state, quantityObsAccepted: state.quantityObsAccepted + 1};
    case REMOVE_OBSACCEPTED:
      return {...state, quantityObsAccepted: state.quantityObsAccepted - 1};
    case ADD_OBSREJECTED:
      return {...state, quantityObsRejected: state.quantityObsRejected + 1};
    case REMOVE_OBSREJECTED:
      return {...state, quantityObsRejected: state.quantityObsRejected - 1};
    case OBTAIN_USERID:
      return {...state, usuarioID: [action.payload]};
    default:
      return state;
  }
};
