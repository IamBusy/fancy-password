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
    NetInfo,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Server from '../utils/server';
import Request from '../utils/request';

import { NetworkInfo } from 'react-native-network-info';


export default class Auth extends Component {
    static navigationOptions = {
        title: 'Authorization',
    };

    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;

        this.auth = this.auth.bind(this);

        this.is = false;
        Request.get('mobile_linked.php',{
            token:params.token,
        });

        NetInfo.fetch().done(
            (connectionInfo) => { console.log('network info',connectionInfo); }
        );

        this.state = {
            ip:'0.0.0.0',
            isAuthing: false,
            btnTitle: 'Confirm',
        };

    }

    componentDidMount() {
        NetInfo.fetch().done(
            (connectionInfo) => { this.setState({connectionInfo}); }
        );
    }

    // Confirm to authorize
    auth(isAuth) {
        const { params } = this.props.navigation.state;
        const { goBack } = this.props.navigation;

        let port = 10080;

        if( ! isAuth ) {
            Request.post('port_info.php',{
                ip: '0.0.0.0',
                port:'0',
                token: params.token,
            }).then(() => {
                goBack();
            });
            return ;
        }

        this.setState({isAuthing: true, btnTitle:'Authorizing...'});

        NetworkInfo.getIPAddress(ip => {
            console.log('local ip:',ip);
            Request.post('port_info.php',{
                ip: ip,
                port:port,
                token: params.token,
            }).then(() => {
                Server.start({port});
                Server.addRouter({
                    "url": '/'+params.token,
                    "server": (request) => {
                        // Only can be abtained once
                        setTimeout(() => {
                            goBack();
                            Server.stop();
                        },500);
                        return {
                            username: params.password.username,
                            password: params.password.password,
                        };
                    }
                });
            });
        });

    }

    render(){
        const { params } = this.props.navigation.state;
        //const {ip} = this.state;
        //console.log(this.state);
        let ip = this.state.ip;

        return (
            <View style={styles.container}>
                <View style={{alignItems:'center',marginTop:60}}>
                    <Icon name={'md-link'} style={styles.icon} size={100}  color="#4F8EF7" />
                </View>
                <View style={{marginTop:50,alignItems:'center'}}>
                    <Text>
                        You are trying to log on to
                    </Text>
                    <Text style={styles.url}>
                        {params.password.url}
                    </Text>
                    <Text style={{marginTop:12}} >
                        using the account:
                        <Text style={styles.account}>{params.password.username}</Text>
                    </Text>
                </View>
                <View  style={{marginTop:50}}>
                    <Button
                        onPress={()=>{this.auth(true)}}
                        title={this.state.btnTitle}
                        disabled={this.state.isAuthing}
                    >
                    </Button>
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
    separator: {
        marginBottom: 30
    },
    url: {
        fontSize: 24,
        marginTop: 8,
    },
    account: {
        fontSize: 16,
        marginTop: 8,
    }
});