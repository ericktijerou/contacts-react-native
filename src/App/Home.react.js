import React, { Component, PropTypes, ContextTypes } from 'react';
import { ToastAndroid, ScrollView, Platform, Animated, Easing, View, StyleSheet } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap, TabViewPage } from 'react-native-tab-view';

import routes from '../routes';

import Container from '../Container';
import UserList from '../User/UserList.react';

// components
import {
    ActionButton,
    Avatar,
    ListItem,
    Toolbar,
    Icon,
} from 'react-native-material-ui/src';

const propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
};

const contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};

const FirstRoute = () => <UserList style={styles.container}/>;

class Home extends Component {
    constructor(props) {
        super(props);

        this.offset = 0;
        this.scrollDirection = 0;

        this.state = {
            index: 0,
            routes: [
              { key: '1', title: 'Male' },
              { key: '2', title: 'Female' },
            ],
            selected: [],
            searchText: '',
            toolbarHidden: false,
            active: 'people',
            moveAnimated: new Animated.Value(0),
        };
    }
    onAvatarPressed = (value) => {
        const { selected } = this.state;

        const index = selected.indexOf(value);

        if (index >= 0) {
            // remove item
            selected.splice(index, 1);
        } else {
            // add item
            selected.push(value);
        }

        this.setState({ selected });
    }
    show = () => {
        Animated.timing(this.state.moveAnimated, {
            toValue: 0,
            duration: 225,
            easing: Easing.bezier(0.0, 0.0, 0.2, 1),
            useNativeDriver: Platform.OS === 'android',
        }).start();
    }
    hide = () => {
        Animated.timing(this.state.moveAnimated, {
            toValue: 56, // because the bottom navigation bar has height set to 56
            duration: 195,
            easing: Easing.bezier(0.4, 0.0, 0.6, 1),
            useNativeDriver: Platform.OS === 'android',
        }).start();
    }
    renderToolbar = () => {
        if (this.state.selected.length > 0) {
            return (
                <Toolbar
                    key="toolbar"
                    leftElement="clear"
                    onLeftElementPress={() => this.setState({ selected: [] })}
                    centerElement={this.state.selected.length.toString()}
                    rightElement={['delete']}
                    style={{
                        container: { backgroundColor: 'white' },
                        titleText: { color: 'rgba(0,0,0,.87)' },
                        leftElement: { color: 'rgba(0,0,0,.54)' },
                        rightElement: { color: 'rgba(0,0,0,.54)' },
                    }}
                />
            );
        }
        return (
            <Toolbar
                key="toolbar"
                leftElement="menu"
                onLeftElementPress={() => this.props.navigator.pop()}
                centerElement={this.props.route.title}
                searchable={{
                    autoFocus: true,
                    placeholder: 'Search',
                    onChangeText: value => this.setState({ searchText: value }),
                    onSearchClosed: () => this.setState({ searchText: '' }),
                }}
                style={{
                    container: { elevation:0 },
                }}
            />
        );
    }

    _handleIndexChange = index => this.setState({ index });


    _renderScene = SceneMap({
       '1': FirstRoute,
       '2': FirstRoute,
     });


    render() {
        const { palette } = this.context.uiTheme;
        return (
            <Container>
                {this.renderToolbar()}
                <TabViewAnimated
                  navigationState={this.state}
                  renderScene={this._renderScene}
                  renderHeader={props => <TabBar {...props} style={{ backgroundColor: palette.primaryColor}} indicatorStyle={{ backgroundColor: '#fff'}}/>}
                  onIndexChange={this._handleIndexChange}
                />
                <ActionButton
                    actions={[
                        { icon: 'email', label: 'Email' },
                        { icon: 'phone', label: 'Phone' },
                        { icon: 'sms', label: 'Text' },
                        { icon: 'favorite', label: 'Favorite' },
                    ]}
                    hidden={this.state.bottomHidden}
                    icon="chat"
                    transition="speedDial"
                    onPress={(action) => {
                        if (Platform.OS === 'android') {
                            ToastAndroid.show(action, ToastAndroid.SHORT);
                        }
                    }}
                />
            </Container>


        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

Home.propTypes = propTypes;
Home.contextTypes = contextTypes;

export default Home;
