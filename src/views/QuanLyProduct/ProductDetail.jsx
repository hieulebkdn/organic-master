import React, { Component } from 'react';

import{
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl, HelpBlock, Form, InputGroup
} from 'react-bootstrap';
import ReactLoading from 'react-loading';
import Card from 'components/Card/Card.jsx';
import ImageUpload from 'components/CustomUpload/ImageUpload.jsx';

import Checkbox from 'elements/CustomCheckbox/CustomCheckbox.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';
import Radio from 'elements/CustomRadio/CustomRadio.jsx';
import axios from 'axios';
import Select from 'react-select';
import{
    selectOptions
} from 'variables/Variables.jsx';

class ProductDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading:true,
            id:0,
            name:'',
            price:'',
            unit:'',
            category:'',
            stock:'',
            sku:'',
            //custome state
            editOpen:false,
            //
            singleSelect: null,
            // Type
            // type_text: "",
            // type_textError: null,
            // type_email: "",
            // type_emailError: null,
            // type_price: "",
            // type_priceError: null,
            // type_number: "",
            // type_numberError: null,
            // type_url: "",
            // type_urlError: null,
            // type_source: "",
            // type_sourceError: null,
            // type_destination: "",
            // type_destinationError: null,
            // //--------------------
            // radio: "1",
            // radioVariant: "1"
        };
    }
    onChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({  [name]: value });
    }
    onEdit = (event) => {
        event.preventDefault();
        axios.put('http://api-organic.herokuapp.com/v1/products/'+this.state.id,{
            "name":this.state.name,
            "price":this.state.price,
            "unit":this.state.unit,
            "stock":this.state.stock,
            "sku":this.state.sku,
        }).then(res =>{
            this.props.history.push('/product');
        });
    }
    componentDidMount(){
        axios.get('http://api-organic.herokuapp.com/v1/products/'+this.props.match.params.id).then(res =>{
            this.setState({
                id:res.data.id,
                name:res.data.name,
                price:res.data.price,
                unit:res.data.unit,
                stock:res.data.stock,
                sku:res.data.sku,
                isLoading:false,
            });
        });
    }
   changeEditOpen(){
      this.setState({
         editOpen:!this.state.editOpen
      })
   }
    handleTypeValidation(){
        // var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // emailRex.test(this.state.type_email) === false ? this.setState({ type_emailError: (<small className="text-danger">Email is required and format should be <i>john@doe.com</i>.</small>) }):this.setState({ type_emailError: null });
        // this.state.type_text === "" ? this.setState({ type_textError: (<small className="text-danger">Text is required.</small>) }):this.setState({ type_textError: null });

        // var digitRex = /^\d+$/;
        // digitRex.test(this.state.type_number) === false ? this.setState({ type_numberError: (<small className="text-danger">type_number has to be a number.</small>) }):this.setState({ type_numberError: null });

        // var urlRex = /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi;
        // urlRex.test(this.state.type_url) ? this.setState({ type_urlError: null }):this.setState({ type_urlError: (<small className="text-danger">Must be a valid URL!</small>) });

        // this.state.type_source === "" ? this.setState({ type_sourceError: (<small className="text-danger">IdSource is required</small>) }):this.setState({ type_sourceError: null });
        // this.state.type_source === this.state.type_destination ? this.setState({ type_destinationError: null }):this.setState({ type_destinationError: (<small className="text-danger">IdSource mismatch!</small>) });
    }
    handleRadio = event => {
        const target = event.target;
        this.setState({
            [target.name]: target.value
        });
    };
    render(){
        return (
            <div className="main-content">
            {this.state.isLoading?(<ReactLoading style={{width:'100px',margin:'auto'}} type={"spinningBubbles"} color={"#ADFF2F"} height={'10'} width={'10'} />):(
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title={<legend>Product Detail</legend>}
                                content={
                                    <Form horizontal>
                                        <ImageUpload id={this.state.id} style={{width:'300px',height:'300px'}}/>
                                        <br/>
                                        <fieldset>
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    Name
                                                </ControlLabel>
                                                <Col md={8}>
                                                    <FormControl
                                                      name="name"
                                                      onChange={this.onChange} 
                                                      type="text"
                                                      disabled={!this.state.editOpen}
                                                      value={this.state.name}
                                                    />
                                                </Col>
                                            </FormGroup>
                                        </fieldset>

                                       <fieldset>
                                            <FormGroup controlId="formHorizontalNumber">
                                                <ControlLabel className="col-sm-2">
                                                    Price
                                                </ControlLabel>
                                                <Col md={8}>
                                                    <FormControl
                                                        defaultValue={this.state.price}
                                                        disabled={!this.state.editOpen}
                                                        type="number"
                                                        name="price"
                                                        onChange={(event) => {
                                                            this.setState({price: event.target.value});
                                                            var digitRex = /^\d+$/;
                                                            digitRex.test(event.target.value) === false ? this.setState({ type_priceError: (<small className="text-danger">type_number has to be a number.</small>) }):this.setState({ type_priceError: null });
                                                        }}
                                                    />
                                                    {this.state.type_priceError}
                                                </Col>
                                            </FormGroup>
                                        </fieldset>

                                        <fieldset>
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    Unit
                                                </ControlLabel>
                                                <Col md={8}>
                                                    <FormControl
                                                    name="unit"
                                                    onChange={this.onChange}
                                                    disabled={!this.state.editOpen}
                                                        type="text"
                                                        value={this.state.unit}
                                                    />
                                                </Col>
                                            </FormGroup>
                                        </fieldset>

                                        <fieldset>
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    Category
                                                </ControlLabel>
                                                <Col md={8}>
                                                    <Select
                                                    disabled={!this.state.editOpen}
                                                        placeholder="Single Select"
                                                        name="singleSelect"
                                                        value={this.state.singleSelect}
                                                        options={selectOptions}
                                                        onChange={(value) => this.setState({ singleSelect: value})}
                                                    />
                                                </Col>
                                            </FormGroup>
                                        </fieldset>

                                       <fieldset>
                                            <FormGroup controlId="formHorizontalNumber">
                                                <ControlLabel className="col-sm-2">
                                                    Stock
                                                </ControlLabel>
                                                <Col md={8}>
                                                    <FormControl
                                                        defaultValue={this.state.stock}
                                                        disabled={!this.state.editOpen}
                                                        type="number"
                                                        name="stock"
                                                        onChange={(event) => {
                                                            this.setState({stock: event.target.value});
                                                            var digitRex = /^\d+$/;
                                                            digitRex.test(event.target.value) === false ? this.setState({ type_stockError: (<small className="text-danger">type_number has to be a number.</small>) }):this.setState({ type_stockError: null });
                                                        }}
                                                    />
                                                    {this.state.type_stockError}
                                                </Col>
                                            </FormGroup>
                                        </fieldset>

                                        <fieldset>
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    SKU
                                                </ControlLabel>
                                                <Col md={8}>
                                                    <FormControl
                                                    value={this.state.sku}
                                                    name="sku"
                                                    onChange={this.onChange}
                                                    disabled={!this.state.editOpen}
                                                        type="text"
                                                    />
                                                </Col>
                                            </FormGroup>
                                        </fieldset>

                                        <fieldset>
                                          <FormGroup controlId="formControlsTextarea">
                                                <ControlLabel className="col-sm-2">
                                                    Description
                                                </ControlLabel>
                                              <FormControl style={{width:'650px'}} disabled={!this.state.editOpen} rows="5" componentClass="textarea" bsClass="form-control" placeholder="Here can be your description" defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."/>
                                          </FormGroup>
                                        </fieldset>

                                        <fieldset style={{padding:'auto'}}>
                                          <Button bsStyle="warning" fill wd style={this.state.editOpen?{display:'none'}:null}  onClick={this.changeEditOpen.bind(this)}>
                                             <span className="btn-label">
                                                <i className="fa fa-pencil"></i>
                                             </span>
                                             Edit
                                          </Button>
                                          <Button bsStyle="success" fill wd style={this.state.editOpen?null:{display:'none'}} onClick={this.onEdit} >Add</Button>
                                          <Button bsStyle="default" fill wd style={this.state.editOpen?null:{display:'none'}} onClick={this.changeEditOpen.bind(this)} >Cancel</Button>
                                        </fieldset>

                                    </Form>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>)}
            </div>
        );
    }
}

export default ProductDetail;
