import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../../components/Order/ContactData/ContactData';

class Checkout extends Component {
    //componentDidMount() {
    // componentWillMount() {
    //     const ingredients = localStorage.getItem('ingredients');
    //     const totalPrice = +localStorage.getItem('totalPrice');
    //     this.setState({ ingredients: JSON.parse(ingredients), totalPrice: totalPrice });
    // }

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
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHander}
                    checkoutConitnued={this.checkoutConitnuedHandler} />
                {/* if props needs to be passed */}
                {/* <Route 
                    path={this.props.match.url + '/contact-data'} 
                    render={(props) => (<ContactData 
                        ingredients={this.props.ings}
                        totalPrice={this.props.price}
                        {...props} />)} />  */}
                  <Route 
                    path={this.props.match.url + '/contact-data'} 
                    component={ContactData} /> 
            </div>
        );
    }

}

const mapStateToProps = state => {
  return {
    ings: state.ingredients
  };
}

export default connect(mapStateToProps)(Checkout);