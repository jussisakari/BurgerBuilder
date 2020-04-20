import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  
  // This could be functional compnent
  componentDidUpdate() {
    console.log('OrderSummary did update');
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
    .map(igKey => {
      return (
        <li key={igKey}>
          <span style={{textTransform: "capitalize"}}>{igKey}</span>: {this.props.ingredients[igKey]}
        </li>);
    });

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with a following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price: {this.props.totalPrice.toFixed(2)}</strong></p>
        <p>Continue to checkout?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
        {/* <Link to="/checkout"><Button btnType="Success" clicked>CONTINUE</Button></Link> */}
    </Aux>
    );
  }
}

export default OrderSummary;