import React, { Component } from "react";
import axios from '../../axios-orders';

import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 1.2,
    meat: 3.5,
    bacon: 1.0   
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4.0,
        purchasable: false,
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
            axios.get('/ingredients.json')
                .then(response => {
                    this.setState({ ingredients: response.data });                
                }).catch(error => {
                    this.setState({ error: true });
                });
        }
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = newCount;

        const currentPrice = this.state.totalPrice;
        const newPrice = currentPrice + INGREDIENT_PRICES[type];
        
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });

        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }

        const newCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = newCount;

        const currentPrice = this.state.totalPrice;
        const newPrice = currentPrice - INGREDIENT_PRICES[type];
        
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });

        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
      this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
      this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        localStorage.setItem('ingredients', JSON.stringify(this.state.ingredients));
        localStorage.setItem('totalPrice', this.state.totalPrice);
        this.props.history.push('/checkout');        
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };    

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let burger = this.state.error ? 
            <p style={{textAlign: "center"}}>Ingredients cannot be loaded</p> : 
            <Spinner />;

        let orderSummary = null;
        if (this.state.ingredients) {

            orderSummary = <OrderSummary 
                ingredients={this.state.ingredients}
                totalPrice={this.state.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler} 
                purchaseContinued={this.purchaseContinueHandler}
                show={this.state.purchasing} />;

            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler} 
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
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

export default connect()(withErrorHandler(BurgerBuilder, axios));