/**
 * Created by william on 10/05/2017.
 */
import React, { Component } from 'react';
import SettingsList from 'react-native-settings-list';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
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
                    <Text style={{alignSelf:'center',marginTop:20,marginBottom:10,fontWeight:'bold',fontSize:16}}></Text>
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
                    <ActionButton buttonColor="rgba(231,76,60,1)">
                        <ActionButton.Item buttonColor='#9b59b6' title="Add Account" onPress={() => console.log("notes tapped!")}>
                            <Icon name="md-create" style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                        <ActionButton.Item buttonColor='#3498db' title="Scan" onPress={() => {}}>
                            <Icon name="md-qr-scanner" style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                    </ActionButton>
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
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
});