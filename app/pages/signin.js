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

export default class Singin extends Component {
    render(){
        return (
            <View style={styles.container}>
                <View style={{alignItems:'center',marginTop:60}}>
                    <Image source={require('../images/lock.png')} />
                </View>
                <View style={{marginTop:50}}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({password:text})}

                        placeholder={"Master Password"}
                    />
                    <Button
                        onPress={()=>{}}
                        title={"登录"}
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
    }
});

