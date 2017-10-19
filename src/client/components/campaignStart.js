'use strict';

import React, {Component} from 'react';
import {withRouter} from 'react-router';
import axios from 'axios';
import {Row, Col, Form, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import styled from 'styled-components';
import DatePicker from 'react-bootstrap-date-picker';

class CampaignStart extends Component {

    constructor(props) {
        super(props);
        this.onDateChange = this.onDateChange.bind(this);
        this.state= {
            date: new Date().toISOString()
        }
    }

    onDateChange = (value) => {
        this.setState({date: value});
        console.log(value);
    }
    

    render() {
        return(
            <div>
                <Col xs={2}/>
                <Col xs={8}>
                    <Form horizontal>
                        <FormGroup controlId="name">
                            <Col componentClass={ControlLabel} sm={2}>Name of Campaign:</Col>
                            <Col sm={10}>
                                <FormControl
                                    type="text"
                                    placeholder="Name of Campaign"
                                    inputRef={input => this.name = input}/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="description">
                            <Col componentClass={ControlLabel} sm={2}>Description</Col>
                            <Col sm={10}>
                                <FormControl
                                    componentClass="textarea"
                                    placeholder="Description"
                                    inputRef={input => this.description = input}/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="deadline">
                        <Col componentClass={ControlLabel} sm={2}> Choose Deadline</Col>
                            <Col sm={10}>
                                <DatePicker onChange={this.onDateChange} value={this.state.date} id="change_handler_example"/>
                             </Col>
                        </FormGroup>
                        <FormGroup controlId="withdraw_limit">
                            <Col componentClass={ControlLabel} sm={2}> Withdraw Limit</Col>
                            <Col sm={9}>
                                <FormControl
                                    type="text"
                                    placeholder="max withdraw limit per block"
                                    inputRef={input => this.limit = input}
                                    />
                            </Col>
                            <Col sm={1} componentClass={ControlLabel}>eth/block</Col>
                        </FormGroup>
                    </Form>
                </Col>
                </div>
        );
    }

}



export default withRouter(CampaignStart);