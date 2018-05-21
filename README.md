# react-native-custom-picker
JS实现的底部弹出选择框，适用于Android和IOS双平台。可以高度自定义样式
JS implementation of the bottom pop-up selection box for Android and IOS dual platform.Can be highly customized.

## Install

```sh
npm i react-native-custon-picker-avery --save
```

## Usage

弹窗ITEM布局可以自定义,样式也可自定义，可定制化程度较高。
You can customized picker layout and StyleSheet.

See `SampleApp` for an example how to use this component.

```jsx

import WheelPicker from 'react-native-custom-picker-avery'

[..]

class SampleApp extends Component {

    constructor() {
        super();

        this.state = {
            textInputValue: '',
            data: [{text: 1}, {text: 2}, {text: 3}],
        }
    }
    
    renderItem = (item, index) => (
        <View>
            <Text>item.text</Text>
        </View>
    );

    render() {
        return (
            <View style={{flex:1, justifyContent:'space-around', padding:50}}>
                <Text>显示picker</Text>
                <WheelPicker
                    ref={wheelPicker => {
                        this.wheelPicker = wheelPicker;
                    }}
                    data={this.state.data}
                    renderItem={this.renderItem}
                    itemHeight={scaleSize(60)}
                    onChangeSelected={(item) => {
                        console.log('selectedItem:  ', item.text);
                    }}
                    onConfirmTextClick={(item) => {
                        console.log('click confirm:  ', item.text);
                    }}
                />
            </View>
        );
    }
}
```

## Props

* `data - []` required, array of objects with a unique key and label
* `style - object` optional, style definitions for the root element
* `onChange - function` optional, callback function, when the users has selected an option
* `initValue - string` optional, text that is initially shown on the button
* `cancelText - string` optional, text of the cancel button
* `selectStyle - object` optional, style definitions for the select element (available in default mode only!)
* `selectTextStyle - object` optional, style definitions for the select element (available in default mode only!)
* `overlayStyle - object` optional, style definitions for the overly/background element
* `sectionStyle - object` optional, style definitions for the section element
* `sectionTextStyle - object` optional, style definitions for the select text element
* `optionStyle - object` optional, style definitions for the option element
* `optionTextStyle - object` optional, style definitions for the option text element
* `cancelStyle - object` optional, style definitions for the cancel element
* `cancelTextStyle - object` optional, style definitions for the cancel text element
