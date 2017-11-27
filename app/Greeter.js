//Greeter.js
import React, {Component} from 'react'
import config from './config.json';
import styles from './Greeter.css';//导入

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

const body = $("body");
class Greeter extends Component{
  render() {
    return (
      <div className={styles.root}>
        {config.greetText}
        <div className={styles.img}></div>
      </div>
    );
  }
}
export default Greeter

// var config = require('./config.json');
// module.exports = function() {
//   var greet = document.createElement('div');
//   greet.textContent = config.greetText;
//   return greet;
// };