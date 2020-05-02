import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../../components/Order/ContactData/ContactData';

import * as orderActions from '../../store/actions/index';

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
        let summary = <Redirect to="/" />
          if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHander}
                        checkoutConitnued={this.checkoutConitnuedHandler} />
                    <Route 
                        path={this.props.match.url + '/contact-data'} 
                        component={ContactData} /> 
                </div>
            );
        }

        return summary;
    }

}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
}


export default connect(mapStateToProps)(Checkout);