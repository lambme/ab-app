import React, { Component } from 'react';

import axios from 'axios';
import AbForm from 'react-ab-form';

import Aux from '../../../hoc/Auxillary/Auxillary';
import Spinner from '../Spinner/Spinner';
import Icon from '../Icon/Icon';
import classes from './Form.css';

export class Form extends Component {

    conf = {
        className: classes.Form,
        infoIcon: <Icon name="info" width="26" height="26" stroke="#666666" />
    }

    state = {
        fields: null
    }

    constructor(props) {
        super(props);

        this.conf = {
            ...this.conf,
            ...props.conf,
            submitHandler: this.submitHandler
        }
    }

    componentDidMount() {
        if (this.state.fields === null) {
            axios.get(this.props.api)
                .then(result => this.setState({ fields: result.data }));
        }
    }

    submitHandler = (values) => {
        //if server responds with error it will be catched by AbForm component
        return axios.post(this.props.api, values)
            .then(response => {
                if (typeof this.props.submitted === 'function') {
                    return this.props.submitted(response.data);
                } else {
                    return false; //don't clear form by default
                }
            });
    }

    render() {
        let form = <Spinner />;

        if (this.state.fields !== null) {
            const data = {
                conf: this.conf,
                fields: this.state.fields
            }
            form = <AbForm data={data} />;
        }

        return (
            <Aux>
                <h1>{this.props.title}</h1>
                {form}
            </Aux>
        );
    }
}

export default Form;