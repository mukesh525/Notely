import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import React, { Component } from "react";
import Icon2 from "react-native-vector-icons/Entypo";
import Icon1 from "react-native-vector-icons/Feather";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "@action/";
import { Actions } from "react-native-router-flux";

export class ControlPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHeart: false,
      isStar: false
    };
  }

  onFilter = () => {
    this.props.filterData(this.props.data.data, this.state);
    this.props.closeDrawer();
  };

  render() {
    let { closeDrawer } = this.props;
    return (
      <ScrollView scrollsToTop={false} style={styles.menu}>
        <View style={{ backgroundColor: "transparent", height: 500 }}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              width: "100%",
              height: 50,
              alignItems: "center",
              marginTo: 10,
              justifyContent: "space-between",
              backgroundColor: "transparent"
            }}
          >
            <Text onPress={() => console.log("test")} style={styles.item}>
              FILTER
            </Text>
            <Icon2 name="cross" size={25} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              width: "100%",
              height: 50,
              alignItems: "center",
              marginTop: 5,
              justifyContent: "space-between",
              backgroundColor: "transparent"
            }}
            onPress={() => this.setState({ isHeart: !this.state.isHeart })}
          >
            <Text
              style={[
                styles.item,
                { color: this.state.isHeart ? "#00D9B7" : "#fff" }
              ]}
            >
              Hearted
            </Text>
            <Icon1
              name="check"
              size={25}
              color={this.state.isHeart ? "#00D9B7" : "#fff"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              width: "100%",
              height: 50,
              alignItems: "center",
              marginTop: 5,
              justifyContent: "space-between",
              backgroundColor: "transparent"
            }}
            onPress={() => this.setState({ isStar: !this.state.isStar })}
          >
            <Text
              style={[
                styles.item,
                { color: this.state.isStar ? "#00D9B7" : "#fff" }
              ]}
            >
              Favorite
            </Text>
            <Icon1
              name="check"
              size={25}
              color={this.state.isStar ? "#00D9B7" : "#fff"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              width: "100%",
              height: 50,
              alignItems: "center",
              marginTop: 5,
              justifyContent: "space-between",
              backgroundColor: "transparent"
            }}
          >
            <Text onPress={() => console.log("test")} style={styles.item}>
              Poem
            </Text>
            <Icon1 name="check" size={25} color="#ccc" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              width: "100%",
              height: 50,
              alignItems: "center",
              marginTop: 5,
              justifyContent: "space-between",
              backgroundColor: "transparent"
            }}
          >
            <Text style={styles.item}>Story</Text>
            <Icon1 name="check" size={25} color="#ccc" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: "transparent",
            height: 40,
            width: 140,
            borderColor: "#fff",
            borderWidth: 1,
            marginRight: 10,
            alignItems: "center",
            alignSelf: "center"
          }}
          onPress={() => this.onFilter()}
        >
          <Text
            style={[
              styles.item,
              { alignSelf: "center", marginTop: 0, paddingTop: 5 }
            ]}
          >
            APPLY
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

export default connect(
  store => ({
    ...store
  }),
  dispatch => bindActionCreators(ActionCreators, dispatch)
)(ControlPanel);

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: "100%",
    height: window.height,
    backgroundColor: "#4E4E4E",
    flexDirection: "column",
    padding: 8,
    paddingTop: 20
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1
  },
  name: {
    position: "absolute",
    left: 70,
    top: 20
  },
  item: {
    fontSize: 20,
    marginTop: 0,
    color: "#FFF",
    fontWeight: "300",
    paddingTop: 0
  }
});
