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
    Button
} from 'react-native';

import db from '../utils/db';
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


        //db.connect(env.database_name);
        db.queryInfo().then(() => {},()=>{
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
        }
        const { onSignin } = this.props;
        //db.create(password);
        onSignin([]);
    }

    signin(pwd) {
        const { onSignin } = this.props;
        db.queryPasswords(pwd).then(records => {
            onSignin(records);
        });
    }

    componentDidMount() {
        // Register the alert located on this master page
        // This MessageBar will be accessible from the current (same) component, and from its child component
        // The MessageBar is then declared only once, in your main component.
        MessageBarManager.registerMessageBar(this.refs.alert);
    }

    componentWillUnmount() {
        // Remove the alert located on this master page from the manager
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
                                        onChangeText={(text) => this.setState({password:text})}
                                        placeholder={"Master Password"}
                                    />
                                    <Button
                                        onPress={()=>{this.signin(this.state.password)}}
                                        title={"Sign in!"}
                                    >
                                    </Button>
                                </View>
                            ):(
                                <View style={{marginTop:50}}>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={(text) => this.setState({password:text})}
                                        placeholder={"Enter Master Password"}
                                    />
                                    <TextInput
                                        style={styles.input}
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

