/*const Page2 = () => (
  <div>
    <p>Page2</p>
  </div>
)

export default Page2*/




import React, { Component } from 'react';
//import { Link, Route, Switch } from 'react-router-dom';
import Link from 'next/link'

export default class Page2 extends Component {

	constructor(){
		super();
		this.state = {
			message: 'Loading...'
		}
	}

	componentDidMount() {
	    //GET message from server using fetch api
	    fetch('/api/page2')
	      .then(res => res.text())
	      .then(res => this.setState({message: res}));
	 }

  render() {

  	const { message } = this.state;

    return (
      <div>
      	<span>{message}</span>
        <ul>
          <li><Link href="/"><a>Home</a></Link></li>
          <li><Link href="/page2"><a>Page 2</a></Link></li>
        </ul>
      </div>
    );
  }
}