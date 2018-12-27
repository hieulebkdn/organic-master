import React, { Component } from 'react';

import{
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl, Form
} from 'react-bootstrap';
import ReactLoading from 'react-loading';
import Card from 'components/Card/Card.jsx';
import ImageUpload from 'components/CustomUpload/ImageUpload.jsx';

import Button from 'elements/CustomButton/CustomButton.jsx';
import axios from 'axios';
import Select from 'react-select';


class ProductAdd extends Component{
    constructor(props){
        super(props);
        this.state = {
            categories:[],
            isLoading:true,
            //custome state
            name:'',
            price:'',
            unit:'',
            category:null,
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
        axios.post('https://organicshoptl.herokuapp.com/api/products',{
            name:this.state.name,
            price:this.state.price,
            unit:this.state.unit,
            stock:this.state.stock,
            rating:0,
            buy:0,
            "tbl_category_id": this.state.category,
            "sku": this.state.sku
        }).then(res =>{
            this.props.history.push('/product');
        });
    }
    async getCat(){
        await axios.get('https://api-organic.herokuapp.com/v1/categories').then(res=>{
        this.setState({
                categories: res.data.map( (cat) => {return {value: cat.id,label: cat.name}}),
                isLoading:false
            })
        })   
    }
    componentDidMount(){
        this.getCat();
    }
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
                                                        placeholder="Category"
                                                        name="singleSelect"
                                                        value={this.state.category}
                                                        options={this.state.categories}
                                                        onChange={(cat) => this.setState({ category: cat.value})}
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
                </Grid>)}
            </div>
        );
    }
}

export default ProductAdd;
