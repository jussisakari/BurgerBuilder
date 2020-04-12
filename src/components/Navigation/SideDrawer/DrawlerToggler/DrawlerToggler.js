import React from 'react';

import classes from './DrawlerToggler.module.css'

const drawerToggler = (props) => (
  <div className={classes.DrawlerToggler} onClick={props.clicked}>
    <div></div>
    <div></div>
    <div></div>
  </div>
)

export default drawerToggler;
