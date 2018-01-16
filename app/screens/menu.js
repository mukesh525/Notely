import React from "react";
import PropTypes from "prop-types";
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity
} from "react-native";
import Icon2 from "react-native-vector-icons/Entypo";
import Icon1 from "react-native-vector-icons/Feather";
const window = Dimensions.get("window");
const uri = "https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png";

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: "gray",
    flexDirection: "column",
    padding: 20
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

export default function Menu({ onItemSelected }) {
  return (
    <ScrollView scrollsToTop={false} style={styles.menu}>
      <View style={{ backgroundColor: "transparent", height: 500 }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            width: 150,
            height: 50,
            alignItems: "center",
            marginTo: 10,
            justifyContent: "space-between",
            backgroundColor: "transparent"
          }}
        >
          <Text onPress={() => onItemSelected("About")} style={styles.item}>
            FILTER
          </Text>
          <Icon2 name="cross" size={25} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            width: 150,
            height: 50,
            alignItems: "center",
            marginTop: 5,
            justifyContent: "space-between",
            backgroundColor: "transparent"
          }}
        >
          <Text onPress={() => onItemSelected("Hearted")} style={styles.item}>
            Hearted
          </Text>
          <Icon1 name="check" size={25} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            width: 150,
            height: 50,
            alignItems: "center",
            marginTop: 5,
            justifyContent: "space-between",
            backgroundColor: "transparent"
          }}
        >
          <Text onPress={() => onItemSelected("Favorite")} style={styles.item}>
            Favorite
          </Text>
          <Icon1 name="check" size={25} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            width: 150,
            height: 50,
            alignItems: "center",
            marginTop: 5,
            justifyContent: "space-between",
            backgroundColor: "transparent"
          }}
        >
          <Text onPress={() => onItemSelected("About")} style={styles.item}>
            Poem
          </Text>
          <Icon2 name="cross" size={25} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            width: 150,
            height: 50,
            alignItems: "center",
            marginTop: 5,
            justifyContent: "space-between",
            backgroundColor: "transparent"
          }}
        >
          <Text onPress={() => onItemSelected("About")} style={styles.item}>
            Story
          </Text>
          <Icon2 name="cross" size={25} color="#ccc" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "transparent",
          height: 40,
          width: 140,
          borderColor: "#fff",
          borderWidth: 1,
          marginRight: 180,
          alignItems: "center",
          alignSelf: "center"
        }}
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

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired
};
