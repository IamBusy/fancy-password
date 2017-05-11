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
    TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {GiftedForm, GiftedFormManager} from 'react-native-gifted-form';
// let t = require('tcomb-form-native');
// const Form = t.form.Form;
//
// // here we are: define your domain model
// let Person = t.struct({
//     name: t.String,              // a required string
//     surname: t.maybe(t.String),  // an optional string
//     age: t.Number,               // a required number
//     rememberMe: t.Boolean        // a boolean
// });
//
// let options = {
//     auto: 'placeholders'
// }; // optional rendering options (see documentation)


export default class Edit extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <GiftedForm
                formName='itemForm' // GiftedForm instances that use the same name will also share the same states
                clearOnClose={true} // delete the values of the form when unmounted
                validators={{

                    name: {
            title: 'Name',
            validate: [{
              validator: 'isLength',
              arguments: [1, 24],
              message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
            }]
          },
          username: {
            title: 'Username',
            validate: [{
              validator: 'isLength',
              arguments: [1, 48],
              message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
            }]
          },
          password: {
            title: 'Password',
            validate: [{
              validator: 'isLength',
              arguments: [1, 48],
              message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
            }]
          },
          reamrk: {
            title: 'Remark',
            validate: [{
              validator: 'isLength',
              arguments: [0, 255],
              message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
            }]
          }
        }}
            >

                <GiftedForm.SeparatorWidget />

                <GiftedForm.TextInputWidget
                    name='name' // mandatory
                    title='Name'
                    image={
                        <Icon name={'md-contact'} style={styles.icon} size={30}  color="#4F8EF7" />
                    }
                    placeholder='Cube.com'
                    clearButtonMode='while-editing'
                />


                <GiftedForm.TextInputWidget
                    name='username'
                    title='Username'
                    image={
                        <Icon name={'md-person'} style={styles.icon} size={30}  color="#4F8EF7" />
                    }

                    placeholder='MarcoPolo'
                    clearButtonMode='while-editing'

                    onTextInputFocus={(currentText = '') => {
            if (!currentText) {
              let fullName = GiftedFormManager.getValue('signupForm', 'fullName');
              if (fullName) {
                return fullName.replace(/[^a-zA-Z0-9-_]/g, '');
              }
            }
            return currentText;
          }}
                />

                <GiftedForm.TextInputWidget
                    name='password' // mandatory
                    title='Password'

                    placeholder='******'


                    clearButtonMode='while-editing'
                    secureTextEntry={true}
                    image={
                        <Icon name={'md-key'} style={styles.icon} size={30}  color="#4F8EF7" />
                    }
                />

                <GiftedForm.TextInputWidget
                    name='url' // mandatory
                    title='URL'
                    image={
                        <Icon name={'logo-chrome'} style={styles.icon} size={30}  color="#4F8EF7" />
                    }
                    placeholder='example.com'
                    clearButtonMode='while-editing'
                />

                <GiftedForm.SeparatorWidget />

                <GiftedForm.TextAreaWidget
                    name='note' // mandatory
                    title='Note'
                    placeholder='Write notes here'
                    clearButtonMode='while-editing'
                />

                <GiftedForm.SubmitWidget
                    title='Sign up'
                    widgetStyles={{
            submitButton: {
              backgroundColor: 'red',
            }
          }}
                    onSubmit={(isValid, values, validationResults, postSubmit = null, modalNavigator = null) => {
            if (isValid === true) {
              // prepare object
              values.gender = values.gender[0];
              values.birthday = moment(values.birthday).format('YYYY-MM-DD');

              /* Implement the request to your server using values variable
              ** then you can do:
              ** postSubmit(); // disable the loader
              ** postSubmit(['An error occurred, please try again']); // disable the loader and display an error message
              ** postSubmit(['Username already taken', 'Email already taken']); // disable the loader and display an error message
              ** GiftedFormManager.reset('signupForm'); // clear the states of the form manually. 'signupForm' is the formName used
              */
            }
          }}

                />

                <GiftedForm.NoticeWidget
                    title='Save or change your account information here.'
                />

                <GiftedForm.HiddenWidget name='tos' value={true} />

            </GiftedForm>
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
    icon: {
        marginLeft:10,
        marginRight:5,
    }
});