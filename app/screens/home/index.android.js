import React, { Component } from "react";
import {
  AppRegistry,
  Dimensions,
  ListView,
  StyleSheet,
  Text,
  AsyncStorage,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  View
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "@action/";

import { Actions } from "react-native-router-flux";
import TimeAgo from "react-native-timeago";
var dateFormat = require("dateformat");
import SplashScreen from "react-native-smart-splash-screen";

import { SwipeListView, SwipeRow } from "react-native-swipe-list-view";
import SideMenu from "react-native-side-menu";
import Menu from "../menu";

import Icon1 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/FontAwesome";
import ActionButton from "react-native-action-button";
import Icon3 from "react-native-vector-icons/Ionicons";

import { Items } from "../data.js";

export class App extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.props.getIntialData(Items);
    //console.log(this.props.getData());
    this.state = {
      listType: "FlatList",
      isOpen: false,
      selectedItem1: "About"
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  compare = (a, b) => {
    let comparison = 0;

    if (a.time < b.time) {
      comparison = 1;
    } else if (b.time > a.time) {
      comparison = -1;
    }

    return comparison;
  };

  onMenuItemSelected = item => {
    console.log("on mneu select get called");
    this.setState({
      isOpen: false,
      selectedItem: item
    });
    console.log(item);
  };

  componentDidMount() {
    SplashScreen.close({
      animationType: SplashScreen.animationType.scale,
      duration: 850,
      delay: 500
    });
  }

  closeRow(rowMap, rowKey) {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  }

  componentWillReceiveProps(nextProps) {
    // console.log("new Props");
    // console.log(newProps);

    if (nextProps.data.type == "view" || nextProps.data.type == "new") {
      Actions.edit();
    }

    if (nextProps.data) {
      this.setState({ listViewData: nextProps.data.data });
    }
  }

  deleteRow(rowMap, rowKey) {
    this.closeRow(rowMap, rowKey);

    this.props.deleteRow(rowMap, this.state.listViewData, rowKey);
    //this.setState({ listViewData: newData });
  }

  setStar(rowMap, rowKey) {
    this.closeRow(rowMap, rowKey);
    this.props.updateStar(rowMap, this.state.listViewData, rowKey);
  }

  saveData(array) {
    console.log(array.length);
    return AsyncStorage.setItem("data", JSON.stringify(array))
      .then(json => console.log("sucess saved!"))
      .catch(error => console.log("error!"));
  }

  // getData = () => {
  //   return AsyncStorage.getItem("data")
  //     .then(req => JSON.parse(req))
  //     .then(json => this.props.getData(json.length > 0 ? json : Items))
  //     .catch(error => console.log("error!"));
  // };

  setHeart(rowMap, rowKey) {
    this.closeRow(rowMap, rowKey);
    this.props.updateHeart(rowMap, this.state.listViewData, rowKey);
  }

  onRowDidOpen = (rowKey, rowMap) => {
    console.log("This row opened", rowKey);
    setTimeout(() => {
      this.closeRow(rowMap, rowKey);
    }, 2000);
  };

  getTime = data => {
    const time = data.item.time;
    return <TimeAgo time={time} interval={20000} />;
  };

  render() {
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;

    return (
      <SideMenu
        openMenuOffset={180}
        menu={menu}
        disableGestures={true}
        menuPosition="right"
        isOpen={this.state.isOpen}
        edgeHitWidth={30}
        onChange={isOpen => this.updateMenuState(isOpen)}
      >
        <StatusBar backgroundColor="#CCC" barStyle="light-content" />
        <View style={styles.container}>
          <View
            style={{
              height: "100%",
              height: "10%",
              backgroundColor: "#CCC",
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <TouchableOpacity
              style={{
                alignSelf: "center",
                marginLeft: 10
              }}
            >
              <Text
                style={{
                  color: "#000",
                  fontSize: 26,
                  fontWeight: "normal",
                  fontFamily: "TimesNewRomB"
                }}
              >
                Notely
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ alignSelf: "center", marginRight: 10 }}
              onPress={this.toggle}
            >
              <Icon1 name="filter-variant" size={35} color="#000" />
            </TouchableOpacity>
          </View>
          <SwipeListView
            useFlatList
            data={this.state.listViewData}
            renderItem={(data, rowMap) => (
              <TouchableHighlight
                onPress={() => this.props.peformEdit(rowMap, data.index)}
                style={styles.rowFront}
                underlayColor={"#FFF"}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                    height: "100%"
                  }}
                >
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      width: "72%",
                      alignItems: "flex-start",
                      marginLeft: "5%",

                      height: "100%",
                      backgroundColor: "transparent"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#000",
                        fontWeight: "bold"
                      }}
                    >
                      {data.item.name}
                    </Text>

                    <Text
                      style={{
                        fontSize: 15,
                        color: "#ccc"
                      }}
                    >
                      {data.item.desc}
                    </Text>

                    <Text
                      style={{
                        fontSize: 12,
                        color: "#ccc",
                        marginTop: 5
                      }}
                    >
                      {/* {dateFormat(data.item.time, "mmm d, yy, h:MM TT")} */}
                      {this.getTime(data)}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "28%",
                      height: "100%",
                      backgroundColor: "transparent"
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        width: "40%",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                      onPress={_ => this.setStar(rowMap, data.index)}
                    >
                      <Icon2
                        name="star"
                        size={26}
                        color={data.item.isStar ? "yellow" : "#ccc"}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        width: "60%",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "flex-start"
                      }}
                      onPress={_ => this.setHeart(rowMap, data.index)}
                    >
                      <Icon2
                        name="heart"
                        size={26}
                        color={data.item.isHeart ? "red" : "#ccc"}
                      />
                    </TouchableOpacity>
                  </View>

                  {/* <Text>I am {data.item.text} in a SwipeListView</Text> */}
                </View>
              </TouchableHighlight>
            )}
            renderHiddenItem={(data, rowMap) => (
              <View style={styles.rowBack}>
                <TouchableOpacity
                  style={[styles.backRightBtn, styles.backRightBtnRight]}
                  onPress={_ => this.deleteRow(rowMap, data.item.key)}
                >
                  <Icon name="delete" size={25} color="#FFF" />
                  <Text style={styles.backTextWhite}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
            leftOpenValue={0}
            disableRightSwipe={true}
            rightOpenValue={-150 / 2}
            onRowDidOpen={this.onRowDidOpen}
          />
        </View>

        <ActionButton
          buttonColor="rgba(231,76,60,1)"
          onPress={() => this.props.createNew()}
        />
      </SideMenu>
    );
  }
}

export default connect(
  store => ({
    ...store
  }),
  dispatch => bindActionCreators(ActionCreators, dispatch)
)(App);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1
  },
  standalone: {
    marginTop: 30,
    marginBottom: 30
  },
  standaloneRowFront: {
    alignItems: "center",
    backgroundColor: "red",
    justifyContent: "center",
    height: 50
  },
  standaloneRowBack: {
    alignItems: "center",
    backgroundColor: "#8BC645",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15
  },
  backTextWhite: {
    color: "#FFF",
    fontSize: 12
  },
  rowFront: {
    alignItems: "center",
    backgroundColor: "#FFF",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    justifyContent: "center",
    height: 100
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75
  },
  backRightBtnLeft: {
    backgroundColor: "blue",
    right: 75
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0
  },
  controls: {
    alignItems: "center",
    marginBottom: 30
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 5
  },
  switch: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    paddingVertical: 10,
    width: Dimensions.get("window").width / 4
  }
});
