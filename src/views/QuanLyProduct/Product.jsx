import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import ReactLoading from 'react-loading';
import SweetAlert from 'react-bootstrap-sweetalert';
// jQuery plugin - used for DataTables.net
import $ from 'jquery';
import {
    Grid, Row, Col
} from 'react-bootstrap';

import Button from 'elements/CustomButton/CustomButton.jsx';
import Card from 'components/Card/Card.jsx';
import axios from 'axios';
// DataTables.net plugin - creates a tables with actions on it
require('datatables.net-responsive');
$.DataTable = require('datatables.net-bs');
class Product extends Component{
    constructor(props){
        super(props);
        this.state = {
             alert: null,
            //custome state
            isLoading:true,
            items:[],
        };
        this.successDelete = this.successDelete.bind(this);
    }
    fetchData(){
        axios.get('https://organicshoptl.herokuapp.com/api/products/').then(res =>{
            //this.setState({items:res.data.map((p)=>[p.name,p.price,p.unit,p.stock,"aaaa",])});
            this.setState({
                items:res.data,
                isLoading:false,
            });
            $("#datatables").DataTable({
                "pagingType": "full_numbers",
                "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
                responsive: true,
                language: {
                    search: "_INPUT_",
                    searchPlaceholder: "Search records",
                }
            });
            var table = $('#datatables').DataTable();

            // Edit record
            // table.on( 'click', '.edit', function () {
            //     var $tr = $(this).closest('tr');

            //     var data = table.row($tr).data();
            //     alert( 'You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.' );
            // } );

            // Delete a record
            table.on( 'click', '.remove', function (e) {
                var $tr = $(this).closest('tr');
                table.row($tr).remove().draw();
                e.preventDefault();
            } );

            //Like record
            table.on( 'click', '.like', function () {
                alert('You clicked on Like button');
            });

        });    	
    }
    componentDidMount() {
        // $(this.refs.main).DataTable({
        //     dom: '<"data-table-wrapper"t>',
        //     data: this.state.items,
        //     columns:[ {title:'Name'},{title:'Position'}, {title:'Office'}, {title:'Age'},{title:'Image'}, {title:'Date'}, {title:'Actions'} ],
        //     ordering: false
        // }); .
        this.fetchData();
    }
    onDelete(id){
      this.warningWithConfirmMessage(id);
    }
    // componentWillUnmount(){
    //     $('.data-table-wrapper')
    //     .find('table')
    //     .DataTable()
    //     .destroy(true);
    // }
    // shouldComponentUpdate() {
    //     return false;
    // }
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
                    You will not be able to recover this product!
                </SweetAlert>
            )
        });
    }
    successDelete(id){
        axios.delete('https://organicshoptl.herokuapp.com/api/products/'+id,'Content-Type').then(res =>{
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
                        Your product has been deleted.
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
    render() {
        return(
            <div className="main-content">
            {this.state.alert}
               {this.state.isLoading?(<ReactLoading style={{width:'100px',margin:'auto'}} type={"spinningBubbles"} color={"#ADFF2F"} height={'10'} width={'10'} />):(
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Product List"
                                content={
                                    <div className="fresh-datatables">
                                     <Link to="/add-product">
                                        <Button style={{marginBottom:'10px'}} bsStyle="success" fill wd>
                                            <span className="btn-label"><i className="fa fa-plus"></i></span>
                                            Add
                                        </Button>
                                    </Link>    
                                        <table id="datatables" ref="main" className="table table-striped table-no-bordered table-hover" cellSpacing="0" width="100%" style={{width:"100%"}}>
                                            <thead>
                                                <tr>
                                                    <th>name</th>
                                                    <th>price</th>
                                                    <th>unit</th>
                                                    <th>stock</th>
                                                    <th>image</th>
                                                    <th className="disabled-sorting text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tfoot>
                                                <tr>
                                                    <th>name</th>
                                                    <th>price</th>
                                                    <th>unit</th>
                                                    <th>stock</th>
                                                    <th>image</th>
                                                    <th className="text-right">Actions</th>
                                                </tr>
                                            </tfoot>
                                            <tbody>
                                                {
                                                   this.state.items.map((item,key) =>
                                                   <tr key={item.id}>
                                                       <td>{item.name}</td>
                                                       <td>{item.price}</td>
                                                       <td>{item.unit}</td>
                                                       <td>{item.stock}</td>
                                                       <td><img style={{width:'200px',height:'100px'}} src={'https://organic-store.herokuapp.com/api/shop/image/' + item.id} alt=""/></td>
                                                       <td className="text-right">
                                                           <a className="btn btn-simple btn-info btn-icon like"><i className="fa fa-heart"></i></a>
                                                           <Link to={"/product-detail/"+item.id} className="btn btn-simple btn-warning btn-icon edit"><i className="fa fa-edit"></i></Link>
                                                           {/*<button className="btn btn-simple btn-danger btn-icon remove"><i className="fa fa-times"></i></button>*/}
                                                           <button onClick={this.onDelete.bind(this,item.id)} className="btn btn-simple btn-danger btn-icon"><i className="fa fa-times"></i></button>
                                                       </td>
                                                   </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>)}
            </div>
        );
    }
}

export default Product;
