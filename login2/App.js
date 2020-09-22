import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  TextInput,
  RefreshControl,
} from "react-native";
import ListItem, { Separator } from "./component/FlatList";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      value: "",
      ref: false,
    };
  }
  componentDidMount = () => {
    this.getData();
  };
  getData = () => {
    axios.get("http://markmydoctor.hu:4789/").then((res) => {
      this.setState({ list: res.data.reverse(), ref: false });
    });
  };
  onDelete = (e) => {
    axios.delete("http://markmydoctor.hu:4789/" + e._id).then((res) => {
      this.setState({ list: this.state.list.filter((d) => d._id !== e._id) });
    });
  };
  onChangeText = (t) => {
    this.setState({ value: t });
  };
  onAdd = (t) => {
    const l = { text: this.state.value, done: false };
    let id;
    axios.post("http://markmydoctor.hu:4789/add", l).then((res) => {
      id = res.data;
      const l = { _id: id, text: this.state.value };
      this.setState({ list: [l, ...this.state.list] });
      this.setState({ value: "" });
    });
    /* const l = { id: Math.random().toString(), text: this.state.value };
    this.setState({ list: [l, ...this.state.list] });
    this.setState({ value: "" }); */
  };
  onDone = (item) => {
    axios.post("http://markmydoctor.hu:4789/update/" + item._id).then((res) => {
      let i = this.state.list.findIndex((obj) => obj._id === item._id);
      this.state.list[i].done = true;
      this.setState({ list: this.state.list });
    });
  };

  render() {
    const asd = () => {
      this.setState({ ref: true }, () => {
        this.getData();
      });
    };

    return (
      <SafeAreaView style={styles.container}>
        {/* <ScrollView
          refreshControl={
            <RefreshControl refreshing={this.state.ref} onRefresh={asd} />
          }
        > */}
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.onChangeText(text)}
          value={this.state.value}
          onSubmitEditing={(text) => this.onAdd(text)}
        />
        <FlatList
          data={this.state.list}
          refreshing={this.state.ref}
          onRefresh={asd}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ListItem
              {...item}
              onSwipe={() => this.onDelete(item)}
              onDone={() => this.onDone(item)}
            />
          )}
          ItemSeparatorComponent={() => <Separator />}
        />
        {/* </ScrollView> */}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
  },
  input: {
    fontSize: 30,
    marginHorizontal: 50,
    height: 60,
    paddingLeft: 10,
    borderRadius: 30,
    borderColor: "#010",
    borderWidth: 1,
    textAlign: "center",
    marginBottom: 20,
  },
});
