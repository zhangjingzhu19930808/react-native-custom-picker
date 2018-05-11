# react-native-custom-picker
JS实现的底部弹出选择框，适用于Android和IOS双平台。

## Install

```sh
npm i react-native-custon-picker-avery --save
```

## Usage
以下内容还未更新， 是错误的
You can either use this component as an wrapper around your existing component or use it in its default mode. In default mode a customizable button is rendered.

See `SampleApp` for an example how to use this component.

```jsx

import ModalPicker from 'react-native-modal-picker'

[..]

class SampleApp extends Component {

    constructor() {
        super();

        this.state = {
            textInputValue: ''
        }
    }

    render() {
        let index = 0;
        const data = [
            { key: index++, section: true, label: 'Fruits' },
            { key: index++, label: 'Red Apples' },
            { key: index++, label: 'Cherries' },
            { key: index++, label: 'Cranberries' },
            { key: index++, label: 'Pink Grapefruit' },
            { key: index++, label: 'Raspberries' },
            { key: index++, section: true, label: 'Vegetables' },
            { key: index++, label: 'Beets' },
            { key: index++, label: 'Red Peppers' },
            { key: index++, label: 'Radishes' },
            { key: index++, label: 'Radicchio' },
            { key: index++, label: 'Red Onions' },
            { key: index++, label: 'Red Potatoes' },
            { key: index++, label: 'Rhubarb' },
            { key: index++, label: 'Tomatoes' }
        ];

        return (
            <View style={{flex:1, justifyContent:'space-around', padding:50}}>

                <ModalPicker
                    data={data}
                    initValue="Select something yummy!"
                    onChange={(option)=>{ alert(`${option.label} (${option.key}) nom nom nom`) }} />

                <ModalPicker
                    data={data}
                    initValue="Select something yummy!"
                    onChange={(option)=>{ this.setState({textInputValue:option.label})}}>
                    
                    <TextInput
                        style={{borderWidth:1, borderColor:'#ccc', padding:10, height:30}}
                        editable={false}
                        placeholder="Select something yummy!"
                        value={this.state.textInputValue} />
                        
                </ModalPicker>
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
