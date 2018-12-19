import React, { Component } from 'react';

import{
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl, HelpBlock, Form, InputGroup
} from 'react-bootstrap';
// import ReactLoading from 'react-loading';
import Card from 'components/Card/Card.jsx';
import ImageUpload from '../../components/CustomUpload/ImageUpload'
import Checkbox from 'elements/CustomCheckbox/CustomCheckbox.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';
import Radio from 'elements/CustomRadio/CustomRadio.jsx';
import axios from 'axios';
import Select from 'react-select';
import{
    selectOptions
} from 'variables/Variables.jsx';

class ProductAdd extends Component{
    constructor(props){
        super(props);
        this.state = {
            //custome state
            name:'',
            price:'',
            unit:'',
            category:'',
            stock:'',
            sku:'',
          
            //
            // singleSelect: null,
            // // Type
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
    onAdd = (event)=> {
        event.preventDefault();
        axios.post('http://api-organic.herokuapp.com/v1/products',{
            name:this.state.name,
            price:this.state.price,
            unit:this.state.unit,
            stock:this.state.stock,
            rating:0,
            buy:0,
        }).then(res =>{
            this.props.history.push('/product');
        });
    }
    componentDidMount(){
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
                                              <FormControl style={{width:'650px'}} rows="5" componentClass="textarea" bsClass="form-control" placeholder="Here can be your description" defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."/>
                                          </FormGroup>
                                        </fieldset>

                                        <fieldset style={{padding:'auto'}}>
                                          <Button bsStyle="success" fill wd onClick={this.onAdd} >Add</Button>
                                          <Button bsStyle="default" fill wd  >Cancel</Button>
                                        </fieldset>

                                    </Form>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default ProductAdd;
