// export const LOGIN_REQUEST ='LOGIN_REQUEST';
// export const LOGIN_SUCESS ='LOGIN_SUCESS';
// export const LOGIN_ERROR ='LOGIN_ERROR';

import * as types from "./types";

export function getIntialData(data) {
  return {
    type: types.GET_INITIAL,
    data: data
  };
}

export function getData() {
  return {
    type: types.GET_SUCESS
  };
}

export function getUpdatedData() {
  return {
    type: types.UPDATE_SUCESS
  };
}

export function filterData(data, condition) {}

export function deleteRow(rowMap, data, rowKey) {
  return dispatch => {
    const newData = data;
    for (var i = 0; i < data.length; i++) {
      if (data[i].key == rowKey) {
        newData.splice(i, 1);
      }
    }

    dispatch({
      type: types.GET_SUCESS,
      data: newData
    });
  };
}

export function updateStar(rowMap, data, rowKey) {
  return dispatch => {
    const newData = data;
    newData[rowKey].isStar = !newData[rowKey].isStar;
    dispatch({
      type: types.GET_SUCESS,
      data: newData
    });
  };
}

export function updateHeart(rowMap, data, rowKey) {
  return dispatch => {
    const newData = data;
    newData[rowKey].isHeart = !newData[rowKey].isHeart;
    dispatch({
      type: types.GET_SUCESS,
      data: newData
    });
  };
}

export function saveData(data, type, position, obj) {
  return dispatch => {
    const newData = data;
    if (type == "edit") {
      newData[position] = obj;
    } else {
      newData.push(obj);
    }
    dispatch({
      type: types.GET_SUCESS,
      data: newData
    });
  };
}

export function peformEdit(rowMap, rowKey) {
  return dispatch => {
    dispatch({
      type: types.UPDATE_REQUEST,
      position: rowKey
    });
  };
}

export function createNew() {
  return dispatch => {
    dispatch({
      type: types.CREATE_REQUEST
    });
  };
}
