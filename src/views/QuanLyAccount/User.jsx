import React, { Component } from 'react';
import {
    Grid, Row, Col,
    FormGroup,
    ProgressBar
} from 'react-bootstrap';
// react component that creates a dropdown menu for selecting a date
import Datetime from 'react-datetime';
// react component that creates a switch button that changes from on to off mode
import Switch from 'react-bootstrap-switch';
// react component that creates an input in which you add words that become like tags
import TagsInput from 'react-tagsinput';
// plugin used to create sliders
import noUiSlider from 'nouislider';
// plugin that makes numbers in a speciffic format
import wNumb from 'wnumb';
// react component that creates a dropdown menu for selection
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import Card from 'components/Card/Card.jsx';

import{
    selectOptions
} from 'variables/Variables.jsx';

class User extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="main-content">
                <h1>Trang user</h1>
            </div>
        );
    }
}

export default User;
