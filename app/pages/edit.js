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
import Icon from 'react-native-vector-icons/Ionicons';
import Constant from '../constant';
import Input from '../components/Input';


export default class Edit extends Component {
    static navigationOptions = (props) => {
        let navigation = props.navigation;
        if(navigation.state.params && navigation.state.params.mode == Constant.editType.EDIT) {
            return {
                title: 'Edit'
            }
        } else {
            return {
                title: 'Add'
            }
        }
    };

    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        let account = {
            name: '',
            username: '',
            password: '',
            url: '',
            note: '',
        };

        if( params && params.mode == Constant.editType.EDIT ) {
            Object.assign(account, params?params.account:{});
        }

        this.state = {
            ...account
        }

    }

    render(){
        const { params } = this.props.navigation.state;
        return (
            <View style={styles.container}>
                <Input
                    label={'Name'}
                    value = {this.state.name}
                />
                <Input
                    label={'Username'}
                    value = {this.state.username}
                />
                <Input
                    label={'Password'}
                    value = {this.state.password}
                />
                <Input
                    label={'Url'}
                    value = {this.state.url}
                />
                <Input
                    label={'Note'}
                    value = {this.state.note}
                />
                {
                    ( params && params.mode == Constant.editType.EDIT ) && (
                        <Button
                            style={styles.button}
                            title="Learn More"
                        />)
                }
                {
                    ( params && params.mode == Constant.editType.ADD ) && (
                        <Button
                            style={styles.button}
                            title="Learn More"
                        />)
                }


            </View>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        marginLeft: 10,
        marginRight: 10
    },
    input:{
        height:80
    },
    icon: {
        marginLeft:10,
        marginRight:5,
    },
    button: {
        marginTop:10,
    }
});