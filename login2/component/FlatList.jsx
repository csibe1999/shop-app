import React from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";

export const Separator = () => <View style={styles.separator} />;
const RightActions = (progress, dragX) => {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });
  return (
    <View style={styles.RightActions}>
      <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
        <FontAwesomeIcon size={22} color={"#fff"} icon={faTrash} />
      </Animated.Text>
    </View>
  );
};
const LeftActions = (progress, dragX) => {
  const scale = dragX.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });
  return (
    <View style={styles.LeftActions}>
      <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
        <FontAwesomeIcon size={22} color={"#fff"} icon={faCheck} />
      </Animated.Text>
    </View>
  );
};

const ListItem = ({ text, done, onSwipe, onDone }) => (
  <Swipeable
    renderRightActions={RightActions}
    renderLeftActions={LeftActions}
    onSwipeableRightOpen={() => onSwipe()}
    onSwipeableLeftOpen={() => onDone()}
  >
    <View style={styles.container}>
      <Text
        onPress={() => onDone()}
        style={!done ? styles.text : styles.textdone}
      >
        {text}
      </Text>
    </View>
  </Swipeable>
);
export default ListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: "center",
  },
  text: {
    color: "#4a4a4a",
    fontSize: 30,
    fontWeight: "bold",
  },
  textdone: {
    color: "green",
    fontSize: 30,
    fontWeight: "bold",
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: "#e4e4e4",
    marginLeft: 10,
  },
  RightActions: {
    backgroundColor: "red",
    justifyContent: "center",
    width: 100,
    /* flex: 1, */
    alignItems: "flex-end",
    marginVertical: 10,
  },
  LeftActions: {
    backgroundColor: "green",
    justifyContent: "center",
    width: 100,
    /* flex: 1, */
    marginVertical: 10,
  },
  actionText: {
    color: "white",
    fontWeight: "600",
    padding: 30,
  },
});
