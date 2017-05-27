/**
 * Created by william on 10/05/2017.
 */
import React, { Component} from 'react';
import Signin from './pages/signin';
import Main from './pages/main';
import Edit from './pages/edit';
import Scan from './pages/scan';
import Auth from './pages/authorization';
import { StackNavigator } from 'react-navigation';

const MainApp = StackNavigator({
    Main: { screen: Main },
    Scan: { screen: Scan },
    Edit: { screen: Edit },
    Auth: { screen: Auth },
});

export default class App extends Component {
    constructor(props){
        super(props);
        this.state={
            isLoggedIn : false,
        };

        this.trySignin = this.trySignin.bind(this);
    }


    trySignin(masterPwd) {

        this.setState({isLoggedIn:true});
    }

    render(){
        let defaultName = 'Main';
        let defaultComponent = Main;

        if(! this.state.isLoggedIn) {
            return <Signin signin={this.trySignin}/>
        }

        return (
            <MainApp/>
        );

    }
}
