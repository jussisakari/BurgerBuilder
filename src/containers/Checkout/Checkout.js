import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../../components/Order/ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: [],
        totalPrice: 0
    }

    //componentDidMount() {
    componentWillMount() {
        const ingredients = localStorage.getItem('ingredients');
        const totalPrice = +localStorage.getItem('totalPrice');
        this.setState({ ingredients: JSON.parse(ingredients), totalPrice: totalPrice });
    }

    checkoutCancelledHander = () => {
        this.props.history.goBack();
    }

    checkoutConitnuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHander}
                    checkoutConitnued={this.checkoutConitnuedHandler} />
                <Route 
                    path={this.props.match.url + '/contact-data'} 
                    render={(props) => (<ContactData 
                        ingredients={this.state.ingredients}
                        totalPrice={this.state.totalPrice}
                        {...props} />)} /> 
            </div>
        );
    }

}

export default Checkout;