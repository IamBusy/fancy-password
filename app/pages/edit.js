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
import Constant from '../constant';
import Input from '../components/Input';
let MessageBarAlert = require('react-native-message-bar').MessageBar;
let MessageBarManager = require('react-native-message-bar').MessageBarManager;
import db from '../utils/db';


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

    componentDidMount() {
        MessageBarManager.registerMessageBar(this.refs.alert);
    }

    componentWillUnmount() {
        MessageBarManager.unregisterMessageBar();
    }

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

    _validate(pwd) {
        let required = (s) => {
            return !(s=='' || s== null);
        };
        let showError = (msg) => {
            MessageBarManager.showAlert({
                title: 'Error',
                message: msg,
                alertType: 'error',
            });
        };
        if(!required(pwd.name)) {
            showError('Name is required');
        } else if(!required(pwd.username)) {
            showError('Username is required');
        } else if(!required(pwd.password)) {
            showError('Password is required');
        } else {
            return true;
        }
        return false;
    }

    add() {
        if(this._validate(this.state)) {
            const { params } = this.props.navigation.state;
            const { goBack } = this.props.navigation;
            db.insertPassword(this.state)
                .then(info => {
                    goBack();
                    params.onAdd(info);
                });
        }

    }

    edit() {
        if(this._validate(this.state)) {
            const { params } = this.props.navigation.state;
            const { goBack } = this.props.navigation;
            db.updatePassword(this.state)
                .then(info => {
                    goBack();
                    params.onEdit(this.state);
                });

        }
    }

    render(){
        const { params } = this.props.navigation.state;
        return (
            <View style={{flex:1}}>
                <MessageBarAlert ref="alert" />
                <View style={styles.container}>
                    <Input
                        label={'Name'}
                        value = {this.state.name}
                        onChangeText={(text) => { this.setState({name: text}) }}
                    />
                    <Input
                        label={'Username'}
                        value = {this.state.username}
                        onChangeText={(text) => { this.setState({username: text}) }}
                    />
                    <Input
                        label={'Password'}
                        value = {this.state.password}
                        onChangeText={(text) => { this.setState({password: text}) }}
                    />
                    <Input
                        label={'Url'}
                        value = {this.state.url}
                        onChangeText={(text) => { this.setState({url: text}) }}
                    />
                    <Input
                        label={'Note'}
                        value = {this.state.note}
                        onChangeText={(text) => { this.setState({note: text}) }}
                    />
                    {
                        ( params && params.mode == Constant.editType.EDIT ) && (
                            <Button
                                style={styles.button}
                                onPress={()=>this.edit()}
                                title="Confirm"
                            />)
                    }
                    {
                        ( params && params.mode == Constant.editType.ADD ) && (
                            <Button
                                style={styles.button}
                                onPress={()=>this.add()}
                                title="Add"
                            />)
                    }
                </View>
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