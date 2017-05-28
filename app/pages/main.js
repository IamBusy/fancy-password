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
import Constant from '../constant';


export default class Main extends Component {
    static navigationOptions = {
        title: 'Home',
    };

    constructor(props) {
        super(props);
        this.tryScan = this.tryScan.bind(this);
        const { params } = this.props.navigation.state;
        this.state = {
            passwords : params.passwords,
        };
        this.onAddPwd = this.onAddPwd.bind(this);
        this.onEditPwd = this.onEditPwd.bind(this);
    }

    tryScan(content) {
        console.log(content);
        const { navigate } = this.props.navigation;
        navigate('Auth');
    }

    onAddPwd(pwd) {
        let pwds = this.state.passwords;
        pwds.push(pwd);
        this.setState({
            passwords:pwds,
        });
    }

    onEditPwd(pwd) {
        let pwds = this.state.passwords;
        for(let i=0;i<pwds.length;i++) {
            if(pwds[i].id == pwd.id) {
                pwds[i] = pwd;
            }
        }
        this.setState({
            passwords:pwds,
        });
    }

    actionToAdd(mode,info) {
        const { navigate } = this.props.navigation;
        navigate('Edit', {
            mode: mode,
            account: info,
            onAdd:this.onAddPwd,
            onEdit:this.onEditPwd });
    }


    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{backgroundColor:'#EFEFF4',flex:1}}>
                <View style={{backgroundColor:'#EFEFF4',flex:1}}>
                    <SettingsList borderColor='#c8c7cc' defaultItemSize={60}>
                        {
                            this.state.passwords.map( pwd => (
                                <SettingsList.Item
                                    key={pwd.id}
                                    icon={
                                        <Icon name={'ios-'+randomIcon()} style={styles.imageStyle} size={35}  color="#4F8EF7" />
                                    }
                                    hasNavArrow={true}
                                    title={pwd.name}
                                    onPress={() => this.actionToAdd(Constant.editType.EDIT,pwd)}
                                    titleInfo={pwd.username.length > 10? pwd.username.substr(0,10)+'...': pwd.username}
                                />
                            ))
                        }
                    </SettingsList>
                    <ActionButton buttonColor="rgba(231,76,60,1)">
                        <ActionButton.Item buttonColor='#9b59b6' title="Add Account" onPress={()=>this.actionToAdd(Constant.editType.ADD,{})}>
                            <Icon name="md-create" style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                        <ActionButton.Item buttonColor='#3498db' title="Scan" onPress={() => navigate('Scan',{ onSuccess: this.tryScan })}>
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