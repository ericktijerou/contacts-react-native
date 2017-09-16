import React, { Component, PropTypes, ContextTypes } from 'react';
import { ToastAndroid, ScrollView, Platform, Animated, Easing, View, StyleSheet } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap, TabViewPage } from 'react-native-tab-view';

import routes from '../routes';

import Container from '../Container';
import MaleList from '../User/MaleList.react';
import FemaleList from '../User/FemaleList.react';

// components
import {
    ActionButton,
    Avatar,
    ListItem,
    Toolbar,
    Icon,
} from '../react-native-material-ui/src';

const propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
};

const contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};

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
            searchText: '',
            toolbarHidden: false,
            active: 'people',
            moveAnimated: new Animated.Value(0),
        };
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
        return (
            <Toolbar
                key="toolbar"
                leftElement="menu"
                rightElement={{
                    menu: { labels: ['Item 1', 'Item 2'] },
                }}
                onLeftElementPress={() => this.props.navigator.pop()}
                centerElement={this.props.route.title}
                style={{
                    container: { elevation:0 },
                }}
            />
        );
    }

    _handleIndexChange = index => this.setState({ index });


    _renderScene = SceneMap({
       '1': () => <MaleList route={this.props.route} navigator={this.props.navigator} style={styles.container}/>,
       '2': () => <FemaleList route={this.props.route} navigator={this.props.navigator} style={styles.container}/>,
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
                    style= {{
                        container: { elevation: 10 },
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
