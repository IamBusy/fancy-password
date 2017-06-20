/**
 * Created by william on 10/05/2017.
 */
import React,{ Component } from 'react';
import { sha256 } from 'react-native-sha256';
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
    Button
} from 'react-native';

import db from '../utils/db';
import env from '../env';
let MessageBarAlert = require('react-native-message-bar').MessageBar;
let MessageBarManager = require('react-native-message-bar').MessageBarManager;

export default class Singin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: null,
            confirm_password: null,
            hasBuilt : true,
        };
        this.infoDB = null;



        db.connect(env.database_name);
        db.hasInited().then(() => {},()=>{
            this.setState({hasBuilt: false});
        });
        // db(env.database_name).then((d)=>{
        //     this.infoDB = d;
        //
        //     this.infoDB.executeSql('SELECT * FROM info;',[],(records)=>{
        //         console.log(records);
        //         if(records.rows.length == 0) {
        //             this.setState({hasBuilt: false});
        //             //setTimeout(()=>console.log(this.state),0);
        //             //this.state.hasBuilt = false;
        //         }
        //     })
        // });
        this.init = this.init.bind(this);
    }

    init() {
        let password = this.state.password,
            confirm_password = this.state.confirm_password;
        console.log(password);
        console.log(confirm_password);
        let message = null;
        if(! password || password == '') {
            message = 'Password is required!';
        } else if(password != confirm_password) {
            message = "These passwords don't match. Try again?";
        }
        if(message != null) {
            MessageBarManager.showAlert({
                title: 'Error',
                message: message,
                alertType: 'error',
            });
            return ;
        }
        const { onSignin } = this.props;
        db.connect(env.database_name);
        db.create(password)
            .then(succ=> {
                onSignin([]);
            });

    }

    signin(pwd) {
        const {onSignin} = this.props;
        db.queryInfo(pwd)
            .then(co => {
                return db.queryPasswords(pwd);
            })
            .then(pwds => {
                console.log('query passwords',pwds);
                onSignin(pwds);
            })
            .catch(function () {
                MessageBarManager.showAlert({
                    title: 'Error',
                    message: 'Password is incorrect!',
                    alertType: 'error',
                });
            });

    }
    componentDidMount() {
        MessageBarManager.registerMessageBar(this.refs.alert);
    }

    componentWillUnmount() {
        MessageBarManager.unregisterMessageBar();
    }


    render(){
        return (
            <View style={styles.container}>
                <MessageBarAlert ref="alert" />
                <View style={styles.content}>
                    <View style={{alignItems:'center',marginTop:60}}>
                        <Image source={require('../images/lock.png')} />
                    </View>

                    {
                        this.state.hasBuilt?(
                                <View style={{marginTop:50}}>
                                    <TextInput
                                        style={styles.input}
                                        secureTextEntry={true}
                                        onChangeText={(text) => this.setState({password:text})}
                                        placeholder={"Master Password"}
                                    />
                                    <Button
                                        onPress={()=>{this.signin(this.state.password)}}
                                        title={"Sign in!"}
                                    >
                                    </Button>
                                    {/*<Button*/}
                                        {/*onPress={()=>{this.init(this.state.password)}}*/}
                                        {/*title={"Init !"}*/}
                                    {/*>*/}
                                    {/*</Button>*/}
                                </View>
                            ):(
                                <View style={{marginTop:50}}>
                                    <TextInput
                                        style={styles.input}
                                        secureTextEntry={true}
                                        onChangeText={(text) => this.setState({password:text})}
                                        placeholder={"Enter Master Password"}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        secureTextEntry={true}
                                        onChangeText={(text) => this.setState({confirm_password:text})}
                                        placeholder={"Enter Master Password Again"}
                                    />
                                    <Button
                                        onPress={()=>{this.init(this.state.password)}}
                                        title={"Init !"}
                                    >
                                    </Button>
                                </View>)
                    }

                </View>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,

    },
    content: {
        marginLeft: 10,
        marginRight: 10
    },
    input:{
        height:80
    }
});

