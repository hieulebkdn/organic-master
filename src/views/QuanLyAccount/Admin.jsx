import React, { Component } from 'react';
import {
    Grid, Row, Col,
    Table,
    OverlayTrigger,
    Tooltip
} from 'react-bootstrap';
// react component that creates a switch button that changes from on to off mode
import Switch from 'react-bootstrap-switch';

import Card from 'components/Card/Card.jsx';

import Button from 'elements/CustomButton/CustomButton.jsx';

class Admin extends Component{
    render(){
        const view = (
            <Tooltip id="view">View Profile</Tooltip>
        );
        const edit = (
            <Tooltip id="edit">Edit Profile</Tooltip>
        );
        const remove = (
            <Tooltip id="remove">Remove</Tooltip>
        );
        const actions = (
            <td className="td-actions text-right">
                <OverlayTrigger placement="top" overlay={view}>
                    <Button simple bsStyle="info" bsSize="xs">
                        <i className="fa fa-user"></i>
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={edit}>
                    <Button simple bsStyle="success" bsSize="xs">
                        <i className="fa fa-edit"></i>
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={remove}>
                    <Button simple bsStyle="danger" bsSize="xs">
                        <i className="fa fa-times"></i>
                    </Button>
                </OverlayTrigger>
            </td>
        );
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={13}>
                            <Card
                                title="Table with Links"
                                category="Here is a subtitle for this table"
                                tableFullWidth
                                content={
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                                <th className="text-center">#</th>
                                                <th className="text-center">Name</th>
                                                <th className="text-center">City</th>
                                                <th className="text-center">Address</th>
                                                <th className="text-center">Gender</th>
                                                <th className="text-center">Day Of Birth</th>
                                                <th className="text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="text-center">1</td>
                                                <td className="text-center">Andrew Mike</td>
                                                <td className="text-center">NewYork</td>
                                                <td className="text-center">Street</td>
                                                <td className="text-center">11/11/1997</td>
                                                <td className="text-center">€ 99,225</td>
                                                { actions }
                                            </tr>
                                        </tbody>
                                    </Table>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Admin;
