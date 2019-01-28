import React, { Component } from 'react';
import { storeProducts, detailProduct } from './data';

const ProductContext = React.createContext();
//Provider
//Consumer

export default class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct: detailProduct,
        cart: [],
        modelOpen: false,
        modalProduct: detailProduct,
        cartSubTotal:0,
        cartTax:0,
        cartTotal:0
    }
    componentDidMount() {
        this.setProducts();
    }
    setProducts = () => {
        let products = [];
        storeProducts.forEach(item => {
            const singleItem = { ...item };
            products = [...products, singleItem];

        });
        this.setState(() => {
            return { products }
        });
    }

    getItem = (id) => {
        const product = this.state.products.find(item => item.id === id);
        return product;
    }

    handleDetail = (id) => {
        const product = this.getItem(id);
        this.setState(() => {
            return { detailProduct: product };
        })
    };
    addToCart = (id) => {
        let tempProduct = [...this.state.products];
        const index = tempProduct.indexOf(this.getItem(id));
        const product = tempProduct[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;

        this.setState(() => {
            return {
                products: tempProduct,
                cart: [...this.state.cart, product]

            }
        }, () => {
            console.log(this.state);

        })
    }

    openModal = (id) => {
        const product = this.getItem(id);
        this.setState(() => {
            return {
                modalProduct: product,
                modelOpen: true
            }
        })
    }

    closeModal = () => {
        this.setState(() => {
            return {
                modelOpen: false
            }
        })

    }

    increment =(id) =>{
        console.log('This is Increment Method');

    }

    decrement = (id) =>{
        console.log('This is Decrement Method');
    }

    removeItem = (id) =>{
        console.log('Item removed');
    }
    

    clearCart = () =>{
        console.log('Cart is Cleared');
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
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                openModal :this.openModal,
                closeModal:this.closeModal,
                increment:this.increment,
                decrement:this.decrement,
                removeItem:this.removeItem,
                clearCart:this.clearCart 
            }}>
                {/* <button onClick={this.tester}>Test Me</button> */}
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}
const ProductConsumer = ProductContext.Consumer;
export { ProductProvider, ProductConsumer };