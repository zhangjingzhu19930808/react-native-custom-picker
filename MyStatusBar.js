import React from 'react';
import { StatusBar, Platform } from 'react-native';

const MyStatusBar = props => {
    let barTestStyle = 'dark-content';
    if (Platform.OS === 'android' && Platform.Version <= 22) {
        barTestStyle = 'light-content';
    }
    return (
        <StatusBar
            backgroundColor={'transparent'}
            translucent
            barStyle={barTestStyle}
            {...props}
        />
    );
};

export default MyStatusBar;
