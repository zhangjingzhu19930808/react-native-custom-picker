/**
 * @author Avery_zjz
 * @time 2018.4.13
 * this component is a wheel picker, can be used in android &ios
 * */
import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { scaleSize } from './ScreenUtil';
import Wheel from './Wheel';
import propTypes from 'prop-types';

export default class WheelPicker extends PureComponent {

    static propTypes = {
        data: propTypes.array.isRequired, // 渲染数据
        renderItem: propTypes.func.isRequired, // 渲染Item组件
        itemHeight: propTypes.number, // 定义滑动item高度
        wheelPanelHeight: propTypes.number, // 定义滚轮面板高度
        topBarHeight: propTypes.number,
        onConfirmTextClick: propTypes.func,
        onCancelTextClick: propTypes.func,
        maskContainerStyle: propTypes.object,
        contentContainerStyle: propTypes.object,
        topBarStyle: propTypes.object,
        centerTitleStyle: propTypes.object,
        cancelComponent: propTypes.func,
        cancelText: propTypes.string,
        centerText: propTypes.string,
        confirmText: propTypes.string,
        confirmComponent: propTypes.func,
        centerComponent: propTypes.func,
        itemContainerStyle: propTypes.object,
        topLineStyle: propTypes.object,
        bottomLineStyle: propTypes.object,
        onChangeSelected: propTypes.func,
        wheelBackgroundColor: propTypes.string,
    };

    static defaultProps = {
        wheelPanelHeight: Dimensions.get('window').height * 0.3,
        topBarHeight: scaleSize(80),
    };

    constructor(props) {
        super(props);
        this.state = {
            showPicker: new Animated.Value(0),
            data: props.data,
        };
    }

    componentWillMount() {
        this.opacityAnimate = this.state.showPicker.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 0, 1],
        });
        this.bottomAnimate = this.state.showPicker.interpolate({
            inputRange: [0, 1],
            outputRange: [-Dimensions.get('window').height, 0],
        });
        // setTimeout(() => {
        //     this.showPicker();
        // }, 2000);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            this.setState({
                data: nextProps.data,
            });
        }
    }

    showPicker = () => {
        Animated.timing(this.state.showPicker, {
            toValue: 1,
            duration: 300,
        }).start();
    };

    disMissPicker = () => {
        Animated.timing(this.state.showPicker, {
            toValue: 0,
            duration: 300,
        }).start();
    };

    textClickCallBack = (callBack) => {
        this.disMissPicker();
        const dataItem = this.props.data[this.wheel.getDateIndex()];
        if (callBack) callBack(dataItem);
    };

    render = () => {
        console.log('wheelPanelHeight: ', this.props.wheelPanelHeight);
        console.log('itemHeight: ', this.props.itemHeight);
        console.log('final: ', (this.props.wheelPanelHeight - this.props.itemHeight) / 2);
        return (
            // 遮罩层
            <Animated.View
                style={[
                    {
                        height: Dimensions.get('window').height,
                        opacity: this.opacityAnimate,
                        bottom: this.bottomAnimate,
                        backgroundColor: 'rgba(0,0,0,0.3)'
                    },
                    styles.select_mask,
                    this.props.maskContainerStyle,
                ]}
            >
                <TouchableOpacity
                    onPress={() => {
                        this.disMissPicker();
                    }}
                    style={{ flex: 1 }}
                />
                {/* content */}
                <View style={[styles.select_content, this.props.contentContainerStyle]}>
                    {/* topBar */}
                    <View
                        style={[
                            { height: this.props.topBarHeight },
                            styles.select_topBar, { flexDirection: 'row' },
                            this.props.topBarStyle
                        ]}
                    >
                        <TouchableOpacity
                            activeOpacity={this.props.calcelActiveOpacity || 0.9}
                            style={this.props.cancelContainerStyle}
                            onPress={() => {
                                this.textClickCallBack(this.props.onCancelTextClick);
                            }}
                        >
                            {
                                this.props.cancelComponent || (
                                    <Text>
                                        {this.props.cancelText || '取消'}
                                    </Text>
                                )
                            }
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={this.props.calcelActiveOpacity || 0.9}
                            style={this.props.cancelContainerStyle}
                            onPress={() => {
                                this.textClickCallBack(this.props.onCenterComponentClick);
                            }}
                        >
                            {
                                this.props.centerComponent || (
                                    <Text
                                        style={this.props.centerTitleStyle}
                                    >
                                        {this.props.centerText || '请选择'}
                                    </Text>
                                )
                            }
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={this.props.calcelActiveOpacity || 0.9}
                            style={this.props.cancelContainerStyle}
                            onPress={() => {
                                this.textClickCallBack(this.props.onConfirmTextClick);
                            }}
                        >
                            {
                                this.props.confirmComponent || (
                                    <Text>
                                        {this.props.confirmText || '确认'}
                                    </Text>
                                )
                            }
                        </TouchableOpacity>
                    </View>
                    {/* wheels */}
                    <View
                        style={{ height: this.props.wheelPanelHeight }}
                    >
                        <Wheel
                            ref={wheel => { this.wheel = wheel; }}
                            renderItem={this.props.renderItem}
                            itemHeight={this.props.itemHeight}
                            data={this.state.data}
                            wheelStyle={this.props.wheelStyle}
                            wheelPanelHeight={this.props.wheelPanelHeight}
                            itemContainerStyle={this.props.itemContainerStyle}
                            onChangeSelected={this.props.onChangeSelected}
                            wheelBackgroundColor={this.props.wheelBackgroundColor}
                        />
                        {/* top line */}
                        <View
                            style={[
                                { top: (this.props.wheelPanelHeight - this.props.itemHeight) / 2 },
                                styles.select_line,
                                this.props.topLineStyle,
                            ]}
                        />
                        {/* bottom line */}
                        <View
                            style={[
                                { top: (this.props.wheelPanelHeight + this.props.itemHeight) / 2 },
                                styles.select_line,
                                this.props.bottomLineStyle,
                            ]}
                        />
                    </View>
                </View>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    select_mask: {
        flex: 1,
        position: 'absolute',
    },
    select_content: {
        width: Dimensions.get('window').width,
    },
    select_topBar: {
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#FFFFFF',
        borderColor: '#9B9B9B',
        borderTopWidth: scaleSize(1),
        borderBottomWidth: scaleSize(1),
        width: Dimensions.get('window').width,
    },
    select_line: {
        backgroundColor: '#d5d5d5',
        height: scaleSize(1),
        width: Dimensions.get('window').width,
        position: 'absolute',
    },
});
