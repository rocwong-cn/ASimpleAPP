import React from 'react';
import {View, Text, StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
    },
    instructions: {
        textAlign: "center",
        color: "#333333",
        marginBottom: 5,
    },
});

export default class extends React.Component {

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <Text>Login page 1</Text>
            </View>
        );
    }
}
