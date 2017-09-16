import { View, StyleSheet, Text, BackHandler, ScrollView } from 'react-native';
import React, { Component, PropTypes } from 'react';
import { Avatar } from "react-native-elements";
import { Card, ListItem, Toolbar } from '../react-native-material-ui/src';
import Container from '../Container';

const styles = StyleSheet.create({
    textContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    imageContainer: {
      paddingVertical: 20,
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }
});

const propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
};

class DetailSpec extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.route.user,
        };
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backPressed);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
    }

    backPressed = () => {
        this.props.navigator.pop();
        return true;
    }

    capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render() {
        return (
            <Container>
                <Toolbar
                    leftElement="arrow-back"
                    onLeftElementPress={() => this.props.navigator.pop()}
                    centerElement={this.capitalizeFirstLetter(this.state.user.name.first)}
                />
                <ScrollView>
                <View style={styles.imageContainer}>
                  <Avatar
                    xlarge
                    rounded
                    source={{uri: `${this.state.user.picture.large}`}}
                    activeOpacity={0.7}
                  />
                </View>
                <Card>
                    <ListItem
                        centerElement={{
                            primaryText: `${this.capitalizeFirstLetter(this.state.user.name.title)}. ${this.capitalizeFirstLetter(this.state.user.name.first)} ${this.capitalizeFirstLetter(this.state.user.name.last)}`,
                            secondaryText: `${this.capitalizeFirstLetter(this.state.user.location.street)}, ${this.capitalizeFirstLetter(this.state.user.location.city)}, ${this.capitalizeFirstLetter(this.state.user.location.state)}`,
                        }}
                    />
                    <View style={styles.textContainer}>
                        <Text>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                            accusantium doloremque laudantium,
                            totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et
                            quasi architecto beatae vitae dicta sunt explicabo.
                        </Text>
                    </View>
                </Card>
                <Card>
                    <ListItem
                        centerElement={{
                            primaryText: `${this.state.user.login.username}`,
                            secondaryText: `${this.state.user.email}`,
                        }}
                    />
                    <View style={styles.textContainer}>
                        <Text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                            ut aliquip ex ea commodo consequat.
                        </Text>
                    </View>
                </Card>
                </ScrollView>

            </Container>
        );
    }
}

DetailSpec.propTypes = propTypes;

export default DetailSpec;
