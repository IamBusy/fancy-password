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

export default class QRCode extends Component {

    propTypes: {
        cancelButtonVisible: React.PropTypes.bool,
        cancelButtonTitle: React.PropTypes.string,
        onSucess: React.PropTypes.func,
        onCancel: React.PropTypes.func,
    };

    _onPressCancel() {
        var $this = this;
        requestAnimationFrame(function() {
            $this.props.navigator.pop();
            if ($this.props.onCancel) {
                $this.props.onCancel();
            }
        });
    }

    _onBarCodeRead(result) {
        var $this = this;
        console.log(result);

        if (this.barCodeFlag) {
            this.barCodeFlag = false;

            setTimeout(function() {
                VibrationIOS.vibrate();
                $this.props.navigator.pop();
                $this.props.onSucess(result.data);
            }, 1000);
        }
    }

    render() {
        this.barCodeFlag = true;
        return (
            <View style={styles.container}>
                <Camera onBarCodeRead={this._onBarCodeRead} style={styles.camera} aspect="fit">
                    <View style={styles.rectangleContainer}>
                        <View style={styles.rectangle}/>
                    </View>
                </Camera>
            </View>

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
