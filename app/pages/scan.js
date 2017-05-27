/**
 * Created by william on 10/05/2017.
 */
import React,{ Component } from 'react';
import {
    Animated,
    StyleSheet,
    Platform,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
    Image,
    TextInput,
    Button,
    TouchableHighlight
} from 'react-native';

import Camera from 'react-native-camera';
import { runOnce } from '../utils/helper';

export default class QRCode extends Component {
    static navigationOptions = {
        title: 'QR Code',
    };

    constructor(props) {
        super(props);
        this.timers = [];
        this.barCodeFlag = true;
        this._onBarCodeRead = this._onBarCodeRead.bind(this);
        this._onPressCancel = this._onPressCancel.bind(this);
        const { goBack, state } = props.navigation;

        this.callback = runOnce(function (result) {
            const { onSuccess } = state.params;
            goBack();
            onSuccess(result.data);
        });
    }

    propTypes: {
        cancelButtonVisible: React.PropTypes.bool,
        cancelButtonTitle: React.PropTypes.string,
        onSucess: React.PropTypes.func,
        onCancel: React.PropTypes.func,
    };

    _onPressCancel() {
        const { goBack } = this.props.navigation;
        goBack();
    }

    _onBarCodeRead(result) {
        const { goBack, state } = this.props.navigation;
        console.log(result.data);
        this.callback(result);

    }

    render() {
        this.barCodeFlag = true;
        return (
            <Camera onBarCodeRead={this._onBarCodeRead} style={styles.camera} aspect="fit">
                <View style={styles.rectangleContainer}>
                    <View style={styles.rectangle}/>
                </View>
            </Camera>

        );
    }
};


let styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    camera: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        marginLeft:0,
        paddingLeft:0,
    },

    rectangle: {
        height: 250,
        width: 250,
        borderWidth: 2,
        borderColor: '#00FF00',
        backgroundColor: 'transparent',
    },

    cancelButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 3,
        padding: 15,
        width: 100,
        bottom: 10,
    },
    cancelButtonText: {
        fontSize: 17,
        fontWeight: '500',
        color: '#0097CE',
    },
});
