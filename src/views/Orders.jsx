import React, { Component } from 'react';
import {
    Grid, Row, Col,
    Table,
    OverlayTrigger,
    Tooltip,
    ProgressBar,
    Pagination
} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import ReactLoading from 'react-loading';
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from 'axios';
// react component that creates a switch button that changes from on to off mode
import Switch from 'react-bootstrap-switch';

import Card from 'components/Card/Card.jsx';

import Button from 'elements/CustomButton/CustomButton.jsx';

class Orders extends Component{
        constructor(props){
        super(props);
        this.state = {
            page:0,
        	activePage:1,
            alert: null,
            isLoading:true,
            orders:[],
        };
        this.successDelete = this.successDelete.bind(this);
    }
    fetchData(){
        axios.get('https://api-organic.herokuapp.com/v1/orders').then(res =>{
            //this.setState({items:res.data.map((p)=>[p.name,p.price,p.unit,p.stock,"aaaa",])});
            this.setState({
                page:Math.round(res.data.length/5.0),
                orders:res.data,
                isLoading:false,
            });
        });        
    }
    componentDidMount(){
        this.fetchData();
    }
    onDelete(id){
      this.warningWithConfirmMessage(id);
    }
   warningWithConfirmMessage(id){
        this.setState({
            alert: (
                <SweetAlert
                    warning
                    style={{display: "block",marginTop: "-200px"}}
                    title="Are you sure?"
                    onConfirm={() => this.successDelete(id)}
                    onCancel={() => this.hideAlert()}
                    confirmBtnBsStyle="info"
                    cancelBtnBsStyle="danger"
                    confirmBtnText="Yes, delete it!"
                    cancelBtnText="Cancel"
                    showCancel
                >
                    You will not be able to recover this order!
                </SweetAlert>
            )
        });
    }
    successDelete(id){
        axios.delete('https://api-organic.herokuapp.com/v1/orders/'+id,'Content-Type').then(res =>{
            this.setState({
                 alert: (
                    <SweetAlert
                        success
                        style={{display: "block",marginTop: "-200px"}}
                        title="Deleted!"
                        onConfirm={() => this.hideAlert()}
                        onCancel={() => this.hideAlert()}
                        confirmBtnBsStyle="info"
                    >
                        Order has been deleted.
                    </SweetAlert>
                ),
                 
            });
        });
    }
    hideAlert(){
        this.setState({
               alert: null,
               isLoading:true,
        });
        this.fetchData()
    }
    handlePageChange(pageNumber) {
    	this.setState({activePage:pageNumber})
  	}
    render(){
        const view = (
            <Tooltip id="view">View Order</Tooltip>
        );
        const edit = (
            <Tooltip id="edit">Edit Order</Tooltip>
        );
        const remove = (
            <Tooltip id="remove">Remove</Tooltip>
        );
        return (
            <div className="main-content">
             {this.state.alert}
              {this.state.isLoading?(<ReactLoading style={{width:'100px',margin:'auto'}} type={"spinningBubbles"} color={"#ADFF2F"} height={'10'} width={'10'} />):(
                  <Grid fluid>
                    <Row>
                        <Col md={13}>
                            <Card
                                title="Quản lý đơn hàng"
                                category="Hmm"
                                tableFullWidth
                                content={
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                            	<th className="text-center">Ngày đặt hàng</th>
                                                <th className="text-center">Tên người nhận</th>
                                                <th className="text-center">Địa chỉ</th>
                                                <th className="text-center">Phương thức thanh toán</th>
                                                <th className="text-center">Trạng thái</th>
                                                <th className="text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.orders.map((item,index) => {
                                                return ((index >= (5 * (this.state.activePage - 1))) && (index <= (5 * this.state.activePage - 1)))?
                                                <tr key={index}>
                                                    <td className="text-center">{item.created_at.slice(0,10)}</td>
                                                    <td className="text-center">{item.owner_name}</td>
                                                    <td className="text-center">{item.owner_address}</td>
                                                    {item.tbl_payment_id === 1 ?
                                                        <td className="text-center">Thanh toán tận nhà</td> :
                                                        <td className="text-center">Thanh toán qua paypal</td>}

                                                    {item.ref_order_status_code === "w"
                                                        ? <td className="text-center">WAITING<ProgressBar
                                                            bsStyle="warning" now={30}/></td>
                                                        : (item.ref_order_status_code === "s"
                                                                ? <td className="text-center">SHIPPING<ProgressBar
                                                                    bsStyle="infor" now={65}/></td>
                                                                : (item.ref_order_status_code === "d"
                                                                        ?
                                                                        <td className="text-center">DELIVERED<ProgressBar
                                                                            bsStyle="success" now={100}/></td>
                                                                        : <td className="text-center">CANCEL<ProgressBar
                                                                            bsStyle="danger" now={100}/></td>
                                                                )
                                                        )
                                                    }
                                                    <td className="td-actions text-right">
                                                        <OverlayTrigger placement="top" overlay={view}>
                                                            <Button simple bsStyle="info" bsSize="xs">
                                                                <i className="fa fa-user"></i>
                                                            </Button>
                                                        </OverlayTrigger>
                                                        <OverlayTrigger placement="top" overlay={edit}>
                                                            <Link to={"/orderdetail/"+item.id}  simple bsStyle="success" bsSize="xs">
                                                                <i className="fa fa-edit"></i>
                                                            </Link>
                                                        </OverlayTrigger>
                                                        <OverlayTrigger placement="top" overlay={remove}>
                                                            <Button onClick={this.onDelete.bind(this, item.id)} simple
                                                                    bsStyle="danger" bsSize="xs">
                                                                <i className="fa fa-times"></i>
                                                            </Button>
                                                        </OverlayTrigger>
                                                    </td>
                                                </tr>:null
                                            })}
                                        </tbody>
                                    </Table>
                                }
                            />
                            <Pagination first last next prev items={this.state.page} activePage={this.state.activePage} onSelect={this.handlePageChange.bind(this)}/>
                        </Col>
                    </Row>
                </Grid>)}
            </div>
        );
    }
}

export default Orders;
