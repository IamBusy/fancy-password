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
        const { params } = this.props.navigation.state;
        Server.start();
        Server.addRouter({
            "url": '/'+params.token,
            "server": (request) => {
                return {
                    username: params.password.username,
                    password: params.password.password,
                }
            }
        })
    }

    render(){
        const { params } = this.props.navigation.state;
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