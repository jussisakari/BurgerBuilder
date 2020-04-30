import React, { Component } from 'react';
import axios from '../../../axios-orders';
import { connect } from 'react-redux';

import classes from './ContactData.module.css';
import Button from '../../UI/Button/Button';
import Spinner from '../../UI/Spinner/Spinner';
import Input from '../../UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: this.createCustomElement('input', 'text', 'Your name', ''),
            street: this.createCustomElement('input', 'text', 'Street', ''),
            zipCode: this.createCustomElement('input', 'text', 'Postal code', '', { required: true, minLength: 6, maxLength: 6 }),
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
              validation: {},
              value: 'fastest',
              valid: true,
              touched: true
          }
        },
        formIsValid: false,
        loading: false
    }

    createCustomElement(elementType, configType, configPlaceHolder, defaultValue, validation = null) {
      const customElement = {
        elementType: elementType,
        elementConfig: {
          type: configType,
          placeholder: configPlaceHolder,
        },
        value: defaultValue,
        valid: defaultValue.length > 0,
        touched: false,
        validation: {
          required: true,
        }
      };

      if (validation !== null) {
        customElement.validation = validation;
        console.log(customElement);
      }

      return customElement;
    }

    orderHandler = (event) => {
        event.preventDefault(); // prevent page refresh
        this.setState({ loading: true });
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
          formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
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

    checkValidity(value, rules) {
      let isValid = true;
      if (!rules) {
        return true;
      }
      
      if (rules.required) {
        isValid = value.trim() !== '' && isValid;
      }

      if (rules.minLength) {
        isValid = value.trim().length >= rules.minLength && isValid;
      }

      if (rules.maxLength) {
        isValid = value.trim().length <= rules.maxLength && isValid;
      }
 
      return isValid;
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
      updatedOrderFormElement.valid = 
        this.checkValidity(updatedOrderFormElement.value, updatedOrderFormElement.validation);
      updatedOrderFormElement.touched = true;
      updatedOrderForm[id] = updatedOrderFormElement;
      console.log(updatedOrderFormElement);

      let formIsValid = true;
      for (let inputIdentifier in updatedOrderForm) {
        formIsValid = formIsValid && updatedOrderForm[inputIdentifier].valid;
      }
      console.log('formIsValid', formIsValid);
      this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
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
                  invalid={!formElement.config.valid}
                  shouldValidate={formElement.config.validation}
                  touched={formElement.config.touched}
                  //changed={this.inputChangedHandler(formElement.id)}></Input>
                  changed={(event) => this.inputChangedHandler(event, formElement.id)}></Input>
              ))}
              <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER HERE</Button>
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

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  };
}

export default connect(mapStateToProps)(ContactData);