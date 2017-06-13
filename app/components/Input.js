/**
 * Created by william on 12/05/2017.
 */
import React from 'react';
import { Hoshi } from 'react-native-textinput-effects';

export default class Input extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Hoshi
                borderColor={'#b76c94'}
                {...this.props}
            />
        );
    }
}
