import React, { Component, PropTypes } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, RefreshControl, Alert } from "react-native";
import { List, SearchBar, Avatar } from "react-native-elements";
import { ListItem } from 'react-native-material-ui';
import routes from '../routes';

const propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
};

class MaleList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      visible: false,
      refreshing: false
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = 'https://randomuser.me/api/?results=10&nat=us&gender=male';
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.results : [...this.state.data, ...res.results],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  onAvatarPressed = (item) => {
    Alert.alert( this.capitalizeFirstLetter(`${item.name.first}:`), 'Hello! Take a look at my profile.', [{text: 'OK', onPress: () => console.log('OK Pressed')}], { cancelable: false } )
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    return (
      <List style={styles.container} containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              style={{ leftElementContainer: { width: 50 }}}
              divider
              centerElement={{
                  primaryText: this.capitalizeFirstLetter(`${item.name.first}`) + ` `+ this.capitalizeFirstLetter(`${item.name.last}`),
                  secondaryText: `${item.login.username}`,
              }}
              leftElement= {
                <Avatar
                  medium
                  rounded
                  source={{uri: `${item.picture.medium}`}}
                  activeOpacity={0.7}
                />
              }
              onLeftElementPress={() => this.onAvatarPressed(item)}
              onPress={() => this.props.navigator.push(routes.userDetail)}
            />
          )}
          keyExtractor={item => item.email}
          ListFooterComponent={this.renderFooter}
          refreshControl={
            <RefreshControl
              onRefresh={this.handleRefresh}
              refreshing={this.state.refreshing}
              colors={["green", "gold", "red", "blue"]}
            />
          }
        />
      </List>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

MaleList.propTypes = propTypes;

export default MaleList;
