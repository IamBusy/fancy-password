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


export default class App extends Component {
    constructor(props){
        super(props);
        this.state={
            isLoggedIn : false,
            passwords: [],
        };

        this.MainApp = null;

        this.trySignin = this.trySignin.bind(this);
    }


    trySignin(pwds) {
        this.MainApp = StackNavigator({
            Main: { screen: Main },
            Scan: { screen: Scan },
            Edit: { screen: Edit },
            Auth: { screen: Auth },
        }, {
            initialRouteParams : {
                passwords: pwds,
            },
        });

        this.setState({isLoggedIn:true});
    }

    render(){
        let MainApp = this.MainApp;
        console.log(MainApp);

        if(! this.state.isLoggedIn) {
            return <Signin onSignin={this.trySignin}/>
        }

        return (
            <MainApp test="test"/>
        );

    }
}
