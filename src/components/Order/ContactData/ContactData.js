import React, { Component } from 'react';
import axios from '../../../axios-orders';

import classes from './ContactData.module.css';
import Button from '../../UI/Button/Button';
import Spinner from '../../UI/Spinner/Spinner';
import Input from '../../UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: this.createCustomElement('input', 'text', 'Your name', ''),
            street: this.createCustomElement('input', 'text', 'Street', ''),
            zipCode: this.createCustomElement('input', 'text', 'Postal code', ''),
            country: this.createCustomElement('input', 'text', 'Country', 'Finland'),
            email: this.createCustomElement('input', 'email', 'Your e-mail', ''),
            // TODO: move to own helper method
            deliveryMethod: {
              elementType: 'select',
              elementConfig: {
                options: [
                  { value: 'fastest', displayValue: 'Fastest' },
                  { value: 'cheapest', displayValue: 'Cheapest' },
                ]
            },
            value: ''
          }
        },
        loading: false
    }

    createCustomElement(elementType, configType, configPlaceHolder, defaultValue) {
      return {
        elementType: elementType,
        elementConfig: {
          type: configType,
          placeholder: configPlaceHolder,
        },
        value: defaultValue
      }
    }

    orderHandler = (event) => {
        event.preventDefault(); // prevent page refresh
        this.setState({ loading: true });
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
          formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData
        };

        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error);
                this.setState({ loading: false });
            });
    }

    // inputChangedHandler = (id) => (event) => {
    inputChangedHandler = (event, id) => {
      const updatedOrderForm = { 
        ...this.state.orderForm 
      };
      const updatedOrderFormElement = { 
        ...updatedOrderForm[id] 
      };
      updatedOrderFormElement.value = event.target.value;
      updatedOrderForm[id] = updatedOrderFormElement;
      this.setState({ orderForm: updatedOrderForm });
    }

    render() {
      const formElementsArray = [];
      for (let key in this.state.orderForm) {
        formElementsArray.push({
          id: key,
          config: this.state.orderForm[key]
        });
      }

      let form = (
            <form onSubmit={this.orderHandler}>
              {formElementsArray.map(formElement => (
                <Input 
                  key = {formElement.id}
                  elementConfig = {formElement.config.elementConfig} 
                  elementType = {formElement.config.elementType} 
                  value = {formElement.config.value}
                  //changed={this.inputChangedHandler(formElement.id)}></Input>
                  changed={(event) => this.inputChangedHandler(event, formElement.id)}></Input>
              ))}
              <Button btnType="Success">ORDER HERE</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;