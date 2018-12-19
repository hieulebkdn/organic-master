import React, { Component } from 'react';
import {
    Grid, Row, Col,
    Table,
    OverlayTrigger,
    Tooltip
} from 'react-bootstrap';
import axios from 'axios';
// react component that creates a switch button that changes from on to off mode
import Switch from 'react-bootstrap-switch';

import Card from 'components/Card/Card.jsx';

import Button from 'elements/CustomButton/CustomButton.jsx';

class Categories extends Component{
    constructor(props) {
        super(props);
        this.state = {
            categories:[],
        };
    }
    componentDidMount(){
        axios.get('https://api-organic.herokuapp.com/v1/categories').then(res =>{
            this.setState({categories:res.data});
        });
    }
    onDelete(id){
        axios.delete('https://api-organic.herokuapp.com/v1/categories/'+id,'Content-Type').then(res =>{
            axios.get('https://api-organic.herokuapp.com/v1/categories').then(res =>{
                this.setState({categories:res.data});
            });
        })
    }
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
                                                <th className="text-center">Parent_Id</th>
                                                <th className="text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.categories.map((item,index) =>
                                            <tr key={index}>
                                                <td className="text-center">{item.id}</td>
                                                <td className="text-center">{item.name}</td>
                                                <td className="text-center">{item.parent_id}</td>
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
                                                        <Button simple bsStyle="danger" bsSize="xs" onClick={this.onDelete.bind(item.id,this)}>
                                                            <i className="fa fa-times"></i>
                                                        </Button>
                                                    </OverlayTrigger>
                                                </td>
                                            </tr>
                                        )}
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

export default Categories;
