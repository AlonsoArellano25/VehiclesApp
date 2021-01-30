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

export const addUser = (usuario) => ({
  type: ADD_USER,
  payload: usuario,
});

export const addVehice = (vehiculo) => ({
  type: ADD_VEHICLE,
  payload: vehiculo,
});

export const userLogged = (email) => ({
  type: USER_LOGGED,
  payload: email,
});

export const addObservation = () => ({
  type: ADD_OBSERVATION,
});

export const removeObservation = () => ({
  type: REMOVE_OBSERVATION,
});

export const addObsAccepted = () => ({
  type: ADD_OBSACCEPTED,
});

export const removeObsAccepted = () => ({
  type: REMOVE_OBSACCEPTED,
});
export const addObsRejected = () => ({
  type: ADD_OBSREJECTED,
});

export const removeObsRejected = () => ({
  type: REMOVE_OBSREJECTED,
});

export const obtainUserID = (userId) => ({
  type: OBTAIN_USERID,
  payload: userId,
});
