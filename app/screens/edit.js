/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Icon2 from "react-native-vector-icons/Ionicons";
import { ActionCreators } from "@action/";
import { Actions } from "react-native-router-flux";
import TimeAgo from "react-native-timeago";

export class Edit extends Component<{}> {
  constructor(props) {
    super(props);

    this.state = {
      position: this.props.data.position,
      type: this.props.data.type,
      data: this.props.data.data,
      obj: this.props.data.data[this.props.data.position],
      titleText:
        this.props.data.type != "new"
          ? this.props.data.data[this.props.data.position].name
          : "",
      descText:
        this.props.data.type != "new"
          ? this.props.data.data[this.props.data.position].desc
          : ""
    };

    console.log(this.state);
  }

  componentWillReceiveProps(nextProps) {
    console.log("new Props");
    console.log(nextProps.data.data.length);

    if (nextProps.data.type == "update") {
      this.setState({
        data: nextProps.data.data,
        type: nextProps.data.type,
        position: nextProps.data.position
      });
    }

    if (nextProps.data.type == "new") {
      this.setState({
        data: [],
        type: nextProps.data.type,
        position: 0,
        titleText: "",
        descText: "",
        key: nextProps.data.length
      });
    }

    if (nextProps.data && nextProps.data.type != "new") {
      this.setState({
        position: nextProps.data.position,
        data: nextProps.data.data,
        obj: nextProps.data.data[nextProps.data.position],
        titleText: nextProps.data.data[nextProps.data.position].name,
        descText: nextProps.data.data[nextProps.data.position].desc
      });
    }
  }

  undo = () => {
    if (this.props.data.type == "new") {
      this.setState({ titleText: "", descText: "" });
    } else {
      this.setState({
        titleText: this.state.obj.name,
        descText: this.state.obj.desc
      });
    }
  };

  saveData = type => {
    var newdata = {
      name: this.state.titleText,
      desc: this.state.descText,
      isStar: false,
      isHeart: false,
      time: new Date()
    };
    this.props.saveData(this.state.data, type, this.state.position, newdata);
    if (type == "new") {
      Actions.pop();
    } else {
      this.setState({ type: "view" });
    }
  };

  getUpdateView() {
    return (
      <View style={styles.container}>
        <View
          style={{
            width: "100%",
            height: "10%",
            backgroundColor: "transparent",
            flexDirection: "row"
          }}
        >
          <View
            style={{
              width: "50%",
              height: "100%",
              backgroundColor: "transparent"
            }}
          >
            <TouchableOpacity
              style={{
                width: "40%",
                height: "100%",
                justifyContent: "center",
                alignItems: "flex-start",
                marginLeft: 15
              }}
              onPress={_ => Actions.pop()}
            >
              <Icon2 name="md-arrow-back" size={25} color={"#000"} />
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: "50%",
              height: "100%",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              flexDirection: "row"
            }}
          >
            <TouchableOpacity
              style={{
                width: "20%",
                height: "100%",
                justifyContent: "center",
                alignItems: "flex-start",
                marginLeft: 7
              }}
              onPress={_ => this.undo()}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: "#000"
                }}
              >
                Undo
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: "20%",
                height: "100%",
                justifyContent: "center",
                alignItems: "flex-start",
                marginLeft: 7
              }}
              onPress={_ =>
                this.saveData(
                  (this.state.type = "new" ? this.state.type : "edit")
                )
              }
            >
              <Text
                style={{
                  fontSize: 15,
                  color: "#000"
                }}
              >
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{ width: "100%", height: "90%", backgroundColor: "white" }}
        >
          <TextInput
            style={{
              width: "100%",
              fontSize: 25,
              marginTop: 5,
              fontWeight: "bold",
              color: "#000",
              textAlign: "center"
            }}
            onChangeText={text => this.setState({ titleText: text })}
            placeholder="Heading"
            value={this.state.titleText}
            underlineColorAndroid="rgba(0,0,0,0)"
          />

          <TextInput
            style={{
              fontSize: 20,
              marginTop: 5,
              fontWeight: "normal",
              color: "#000",
              width: "100%",
              textAlign: "center"
            }}
            onChangeText={text => this.setState({ descText: text })}
            placeholder="Desciption"
            value={this.state.descText}
            underlineColorAndroid="rgba(0,0,0,0)"
          />
        </View>
      </View>
    );
  }

  getView() {
    return (
      <View style={styles.container}>
        <View
          style={{
            width: "100%",
            height: "10%",
            backgroundColor: "transparent",
            flexDirection: "row"
          }}
        >
          <View
            style={{
              width: "50%",
              height: "100%",
              backgroundColor: "transparent"
            }}
          >
            <TouchableOpacity
              style={{
                width: "40%",
                height: "100%",
                justifyContent: "center",
                alignItems: "flex-start",
                marginLeft: 15
              }}
              onPress={_ => Actions.pop()}
            >
              <Icon2 name="md-arrow-back" size={25} color={"#000"} />
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: "50%",
              height: "100%",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              flexDirection: "row"
            }}
          >
            <TouchableOpacity
              style={{
                width: "20%",
                height: "100%",
                justifyContent: "center",
                alignItems: "flex-start",
                marginLeft: 7
              }}
              onPress={_ => this.setState({ type: "edit" })}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: "#000"
                }}
              >
                Edit
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            width: "100%",
            height: "20%",
            backgroundColor: "transparent",

            flexDirection: "column",
            marginLeft: 10
          }}
        >
          <Text
            style={{
              fontSize: 23,
              fontWeight: "bold",
              color: "#000"
            }}
          >
            {this.state.obj.name}
          </Text>

          <Text
            style={{
              fontSize: 15,
              marginTop: 15,
              fontWeight: "normal",
              color: "#000"
            }}
          >
            <TimeAgo time={this.state.obj.time} interval={20000} />
            {/*  */}
          </Text>
        </View>

        <View
          style={{ width: "100%", height: "70%", backgroundColor: "white" }}
        >
          <Text
            style={{
              fontSize: 13,
              width: "100%",
              height: "100%",
              marginLeft: 10,
              color: "#000"
            }}
          >
            {this.state.obj.desc}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    //return this.getUpdateView();
    return this.state.type != "view" ? this.getUpdateView() : this.getView();
  }
}

export default connect(
  store => ({
    ...store
  }),
  dispatch => bindActionCreators(ActionCreators, dispatch)
)(Edit);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#CCC"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
