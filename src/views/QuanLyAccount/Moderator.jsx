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

import callApi from '../../utils/apiCaller';

class Moderator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddModal: false,
      moderators: [{
        "id": null,
        "email": "",
        "phone": "",
        "tbl_shop_id": null,
        "shop": {
          "name": ""
        },
        "account": {
          "name": ""
        }
      }],
      currentID: null
    };
  }

  componentDidMount() {
    callApi('moderators', 'GET', null).then(response => {
      this.setState({ moderators: response.data });
    })
  }

  render() {
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
                title="Quản lý Moderator"
                category="100% fruit, 0% anything else"
                tableFullWidth
                content={
                  <Table responsive>
                    <thead>
                      <tr>
                        <th className="text-center">#</th>
                        <th className="text-center">Name</th>
                        <th className="text-center">Email</th>
                        <th className="text-center">Phone</th>
                        <th className="text-center">Shop</th>
                        <th className="text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.moderators.map((item, index) =>
                        <tr key={index}>
                          <td className="text-center">{index+1}</td>
                          <td className="text-center">{item.account.name}</td>
                          <td className="text-center">{item.email}</td>
                          <td className="text-center">{item.phone}</td>
                          <td className="text-center">{item.shop.name}</td>
                          <td className="td-actions text-right">
                            <OverlayTrigger placement="top" overlay={view}>
                              <Button simple bsStyle="info" bsSize="xs">
                                <i className="fa fa-user"></i>
                              </Button>
                            </OverlayTrigger>
                            <OverlayTrigger placement="top" overlay={remove}>
                              <Button simple bsStyle="danger" bsSize="xs">
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

export default Moderator;
