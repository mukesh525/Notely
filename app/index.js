import React, { Component } from "react";
import { View, Text } from "react-native";

import Router from "./router";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducer, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import configureStore from "@lib/configureStore";



let store = configureStore();

export default class Index extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <Router />
        </View>
      </Provider>
    );
  }
}
