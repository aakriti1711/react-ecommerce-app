import React, { Component } from 'react';
import {storeProducts, detailProduct} from './data';

const ProductContext = React.createContext();
//Provider
//Consumer

export default class ProductProvider extends Component {
    state ={
        products:[],
        detailProduct:detailProduct
    }
    componentDidMount(){
        this.setProducts();
    }
    setProducts = () => {
        let products = [];
        storeProducts.forEach(item => {
            const singleItem = {...item};
            products = [...products, singleItem];
            
        });
        this.setState(()=>{
            return {products}
        });
    }
    handleDetail = () =>{
        console.log('hello from detail');
    }
    addToCart =(id) =>{
        console.log(`Hello from Addto cart id is $ {id}`);
    }  
   /* tester = () =>{
        console.log('State Products: ',this.state.products[0].inCart);
        console.log('Data Products: ',storeProducts[0].inCart);
        const tempProduct = [...this.state.products];
        tempProduct[0].inCart = true;
        this.setState(()=>{
            return {products:tempProduct}
        },()=>{
            console.log('State Products: ',this.state.products[0].inCart);
            console.log('Data Products: ',storeProducts[0].inCart);
        });

    }*/
    render() {
    return (
      <ProductContext.Provider value ={{
          ...this.state,
          handleDetail:this.handleDetail,
          addToCart:this.addToCart
      }}>
      {/* <button onClick={this.tester}>Test Me</button> */}
          {this.props.children}
      </ProductContext.Provider>
    )
  }
}
const ProductConsumer = ProductContext.Consumer;
export {ProductProvider,ProductConsumer};