/**
 * Created by william on 10/05/2017.
 */
import React, { Component } from 'react';
import SettingsList from 'react-native-settings-list';
import Icon from 'react-native-vector-icons/Ionicons';
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

import { randomIcon } from '../utils/random';
import passwords from '../mock/password';


export default class PwdItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <View style={{backgroundColor:'#EFEFF4',flex:1}}>
                <View style={{borderBottomWidth:1, backgroundColor:'#f7f7f8',borderColor:'#c8c7cc'}}>
                    <Text style={{alignSelf:'center',marginTop:30,marginBottom:10,fontWeight:'bold',fontSize:16}}>Settings</Text>
                </View>
                <View style={{backgroundColor:'#EFEFF4',flex:1}}>
                    <SettingsList borderColor='#c8c7cc' defaultItemSize={60}>
                        <SettingsList.Header headerStyle={{marginTop:15}}/>
                        {
                            passwords.map( pwd => (
                                <SettingsList.Item
                                    key={pwd.name}
                                    icon={
                                        <Icon name={'ios-'+randomIcon()} style={styles.imageStyle} size={35}  color="#4F8EF7" />
                                    }
                                    hasNavArrow={true}
                                    title={pwd.name}
                                    titleInfo={pwd.account.length > 10? pwd.account.substr(0,10)+'...': pwd.account}
                                />
                            ))
                        }
                    </SettingsList>
                </View>
            </View>
        )
    }


}
const styles = StyleSheet.create({
    imageStyle:{
        marginLeft:15,
        alignSelf:'center',
        height:30,
        width:30
    },
    titleInfoStyle:{
        fontSize:16,
        color: '#8e8e93'
    }
});