import React, { PureComponent } from 'react';
import { View, PanResponder, Animated, Dimensions } from 'react-native';
import propTypes from 'prop-types';

let startTime = 0;
const deceleration = 0.0006;

export default class WheelPicker extends PureComponent {

    static propTypes = {
        data: propTypes.array.isRequired,
        renderItem: propTypes.func.isRequired,
        itemHeight: propTypes.number.isRequired,
        // animatedHeight: propTypes.number.isRequired,
        wheelStyle: propTypes.object,
        itemContainerStyle: propTypes.object,
        wheelPanelHeight: propTypes.number,
        onChangeSelected: propTypes.func,
        wheelBackgroundColor: propTypes.string,
    };

    static defaultProps = {
        renderItem: null,
        wheelPanelHeight: Dimensions.get('window').height * 0.3,
    };

    constructor(props) {
        super(props);
        this.initialTop = (props.wheelPanelHeight - props.itemHeight) / 2;
        this.currentY = this.initialTop;
        this.state = {
            top: new Animated.Value(this.initialTop),
        };
        this.sensitivity = this.props.sensitivity || 0.5;
        this.index = 0;
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            // 要求成为响应者：
            onStartShouldSetPanResponder: () => true,
            onStartShouldSetPanResponderCapture: () => true,
            onMoveShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: () => true,

            onPanResponderGrant: () => {
                this.state.top.stopAnimation();
                startTime = new Date().getTime();
                // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！

                // gestureState.{x,y} 现在会被设置为0
            },
            onPanResponderMove: (evt, gestureState) => {
                this.state.top.setValue(this.currentY + gestureState.dy);
                // this.setState({
                //     top: ,
                // });
            },
            onPanResponderRelease: (evt, gestureState) => {
                const time = new Date().getTime() - startTime;
                const endTop = 0 - ((this.props.itemHeight * this.props.data.length)
                    - ((this.props.wheelPanelHeight + this.props.itemHeight) / 2)) || 0;
                if (time < 300) {
                    const distance = gestureState.dy * (this.sensitivity || 1);
                    const speed = Math.abs(distance) / time;
                    const speed2 = (this.factor || 1) * speed;
                    const destination = this.currentY + (((speed2 * speed2) / (2 * deceleration)) * (distance < 0 ? -1 : 1));
                    this.currentY = destination;
                }
                this.currentY += gestureState.dy;
                const index = ~~((this.initialTop - this.currentY) / this.props.itemHeight);
                const outItem = ((this.initialTop - this.currentY) % this.props.itemHeight) || 0;
                if (this.currentY > this.initialTop) {  // 下拉回弹
                    this.currentY = this.initialTop;
                    this.index = 0;
                } else if (this.currentY < endTop) {  // 上拉回弹
                    this.currentY = endTop;
                    this.index = this.props.data.length - 1;
                } else if (outItem > this.props.itemHeight / 2) {
                    // 如果超出部分 > itemHeight 一半
                    this.currentY -= (this.props.itemHeight - outItem);
                    this.index = index + 1;
                } else {
                    this.currentY += outItem;
                    this.index = index;
                }
                if (this.props.onChangeSelected) this.props.onChangeSelected(this.props.data[this.index]);
                Animated.spring(this.state.top, { toValue: this.currentY }).start();
                // if (this.currentY < this.props.animatedHeight)
                // this.setState({
                //     top: this.currentY + gestureState.dy,
                // });
                // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
                // 一般来说这意味着一个手势操作已经成功完成。
            },
            onPanResponderTerminationRequest: () => true,
            onPanResponderTerminate: () => {
                // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
                // Animated.spring(this.state.top, { toValue: { x: 0, y: 0 } }).start();
            },
            onShouldBlockNativeResponder: () => true,
        });
    }

    getDateIndex = () => this.index;

    render = () => (
        <View
            style={[
                {
                    flex: 1,
                    backgroundColor: this.props.wheelBackgroundColor || '#FFF',
                },
                this.props.wheelStyle
            ]}
            {...this._panResponder.panHandlers}
        >
            <Animated.View
                style={{
                    position: 'absolute',
                    top: this.state.top,
                }}
            >
                {
                    this.props.data && this.props.data.map((item, index) => (
                        <View
                            style={[
                                {
                                    height: this.props.itemHeight,
                                    width: Dimensions.get('window').width,
                                    justifyContent: 'center',
                                },
                                this.props.itemContainerStyle,
                            ]}
                            key={index}
                        >
                            { this.props.renderItem(item, index) }
                        </View>
                    ))
                }
            </Animated.View>
        </View>
    );
}
