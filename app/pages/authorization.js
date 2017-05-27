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
import Icon from 'react-native-vector-icons/Ionicons';
import Server from '../utils/server';

export default class Auth extends Component {
    static navigationOptions = {
        title: 'Authorization',
    };

    constructor(props) {
        super(props);
        this.auth = this.auth.bind(this);
        this.is = false;
    }

    // Confirm to authorize
    auth(account) {
        Server.start();
        Server.addRouter({
            "url": '/token',
            "server": (request) => {
                return {
                    hello: 'world',
                }
            }
        })
    }

    render(){
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
                        {'QQ.com'}
                    </Text>
                    <Text style={{marginTop:12}} >
                        using the account:
                        <Text style={styles.account}>{'1342247033@qq.com'}</Text>
                    </Text>
                </View>
                <View  style={{marginTop:50}}>
                    <Button
                        onPress={()=>{this.auth({})}}
                        title={"Confirm"}
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