import React, { Component } from 'react';
import {
  Grid, Row, Col,
  Table,
  OverlayTrigger,
  Tooltip, Modal, FormGroup, FormControl, Media, Checkbox, ControlLabel
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';

import Button from 'elements/CustomButton/CustomButton.jsx';

import callApi from '../../utils/apiCaller';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddModal: false,
      users: [{
        "id": null,
        "email": "",
        "phone": "",
        "account": {
          "name": ""
        }
      }],
      userFormData: {
        "id": null,
        "email": "",
        "phone": "",
        "created_at": "",
        "account": {
          "name": "",
          "city": "",
          "address": "",
          "gender": "",
          "dob": "",
        }
      }
    };
  }

  handleShow = (id) => {
    callApi('users/' + id, 'GET', null).then(res => {
      console.log(res.data)
      this.setState({
        userFormData: {
          "id": res.data.id,
          "email": res.data.email,
          "phone": res.data.phone,
          "created_at": res.data.created_at,
          "account": {
            "name": res.data.account.name,
            "city": res.data.account.city,
            "address": res.data.account.address,
            "gender": res.data.account.gender,
            "dob": res.data.account.dob,
          }
        }
      })
      console.log(this.state.userFormData);
    })
    this.setState({ showAddModal: true });
  }

  handleClose = () => {
    this.setState({ showAddModal: false });
  }
  onDelete = (id) => {
    callApi('users/' + id, 'DELETE', null).then(res => {
      callApi('normal-users', 'GET', null).then(response => {
        this.setState({ users: res.data });
      })
    })
  }

  componentDidMount() {
    callApi('normal-users', 'GET', null).then(response => {
      this.setState({ users: response.data });
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
                title="Quản lý User"
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
                        <th className="text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.users.map((item, index) =>
                        <tr key={index}>
                          <td className="text-center">{index + 1}</td>
                          <td className="text-center">{item.account.name}</td>
                          <td className="text-center">{item.email}</td>
                          <td className="text-center">{item.phone}</td>
                          <td className="td-actions text-right">
                            <OverlayTrigger placement="top" overlay={view}>
                              <Button simple bsStyle="info" bsSize="xs" onClick={() => this.handleShow(item.id)}>>
                                <i className="fa fa-user"></i>
                              </Button>
                            </OverlayTrigger>
                            <OverlayTrigger placement="top" overlay={remove}>
                              <Button simple bsStyle="danger" bsSize="xs" onClick={() => this.onDelete(item.id)}>
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

        <Modal show={this.state.showAddModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Thông tin tài khoản</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card
              title={this.state.userFormData.name}
              content={
                <form>
                  <FormGroup>
                    <ControlLabel>
                      Email
                            </ControlLabel>
                    <FormControl
                      value={this.state.userFormData.email}
                    />
                  </FormGroup>

                  <FormGroup>
                    <ControlLabel>
                      Số điện thoại
                            </ControlLabel>
                    <FormControl
                      value={this.state.userFormData.phone}
                    />
                  </FormGroup>

                  <FormGroup>
                    <ControlLabel>
                      Thành phố
                            </ControlLabel>
                    <FormControl
                      value={this.state.userFormData.account.city}
                    />
                  </FormGroup>

                  <FormGroup>
                    <ControlLabel>
                      Địa chỉ
                            </ControlLabel>
                    <FormControl
                      value={this.state.userFormData.account.address}
                    />
                  </FormGroup>

                  <FormGroup>
                    <ControlLabel>
                      Ngày sinh
                            </ControlLabel>
                    <FormControl
                      value={this.state.userFormData.account.dob}
                    />
                  </FormGroup>

                  <FormGroup>
                    <ControlLabel>
                      Ngày tham gia
                            </ControlLabel>
                    <FormControl
                      value={this.state.userFormData.created_at}
                    />
                  </FormGroup>

                </form>
              }
            />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default User;
