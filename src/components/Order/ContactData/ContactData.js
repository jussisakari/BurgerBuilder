import React, { Component } from 'react';

import classes from './ContactData.module.css';
import Button from '../../UI/Button/Button';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }

    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your name" />
                    <input className={classes.Input} type="email" name="email" placeholder="Your email" />
                    <input className={classes.Input} type="text" name="street" placeholder="Your street" />
                    <input className={classes.Input} type="text" name="postalCode" placeholder="Your postal code" />
                    <Button btnType="Success">ORDER HERE</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;