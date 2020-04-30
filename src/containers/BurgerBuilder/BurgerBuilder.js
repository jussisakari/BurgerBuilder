import React, { Component } from "react";
import axios from '../../axios-orders';

import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";



class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        console.log("[BurgerBuilder] ComponentDidMount");
        localStorage.clear();
        const ingredients = localStorage.getItem('ingredients');
        if (ingredients) {
            this.setState({ ingredients: JSON.parse(ingredients) });
        } else {
            // axios.get('/ingredients.json')
            //     .then(response => {
            //         this.setState({ ingredients: response.data });                
            //     }).catch(error => {
            //         this.setState({ error: true });
            //     });
        }
    }

    updatePurchaseState = () => {
        const sum = Object.keys(this.props.ings)
            .map(igKey => {
                return this.props.ings[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0;
    }

    // ADDING REDUX TO PROJECT SO HANDLERS ABOVE ARE OBSOLATE

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const newCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = newCount;

    //     const currentPrice = this.state.totalPrice;
    //     const newPrice = currentPrice + INGREDIENT_PRICES[type];
        
    //     this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });

    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount <= 0) {
    //         return;
    //     }

    //     const newCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = newCount;

    //     const currentPrice = this.state.totalPrice;
    //     const newPrice = currentPrice - INGREDIENT_PRICES[type];
        
    //     this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });

    //     this.updatePurchaseState(updatedIngredients);
    // }

    purchaseHandler = () => {
      this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
      this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        // localStorage.setItem('ingredients', JSON.stringify(this.props.ings));
        // localStorage.setItem('totalPrice', this.props.totPrice);
        this.props.history.push('/checkout');        
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };    

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let burger = this.state.error ? 
            <p style={{textAlign: "center"}}>Ingredients cannot be loaded</p> : 
            <Spinner />;

        let orderSummary = null;
        if (this.props.ings) {

            orderSummary = <OrderSummary 
                ingredients={this.props.ings}
                totalPrice={this.props.totPrice}
                purchaseCancelled={this.purchaseCancelHandler} 
                purchaseContinued={this.purchaseContinueHandler}
                show={this.state.purchasing} />;

            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved} 
                        disabled={disabledInfo}
                        price={this.props.totPrice}
                        purchasable={this.updatePurchaseState()}
                        ordered={this.purchaseHandler}
                    />
                </Aux>);
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal 
                  show={this.state.purchasing}
                  modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    totPrice: state.totalPrice
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));