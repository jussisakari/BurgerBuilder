import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../../components/Order/ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: []
    }

    componentDidMount() {
        const ingredients = localStorage.getItem('ingredients');
        this.setState({ ingredients: JSON.parse(ingredients) });
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
                    component={ContactData} /> 
            </div>
        );
    }

}

export default Checkout;