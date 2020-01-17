import React from 'react';
import ReactDOM from 'react-dom';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      balance: '',
      rate: '',
      term: '',
      text: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCalculation = this.handleCalculation.bind(this);
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleCalculation () {
    const principal = this.state.balance;
    const monthlyInterest = ((this.state.rate / 100) / 12);
    const numberOfPayments = (this.state.term * 12);
    const firstCalculation = (monthlyInterest * (1 + monthlyInterest) ** numberOfPayments);
    const secondCalculation = (((1 + monthlyInterest) ** numberOfPayments) - 1);
    const totalCalculation = (firstCalculation / secondCalculation);
    const monthlyPayment = (principal * totalCalculation).toFixed(2);
    this.setState({
    text: `Your monthly payment is $${monthlyPayment}`
    });
  }

	render() {
		return (
      <div className='container'>
				<h1>Mortgage Calculator</h1>
				<hr></hr>
				<div className='row'>
					<label>Loan Balance</label>
					<input name='balance' type='number' placeholder='0' value={this.state.balance} onChange={this.handleChange}/>
				</div>
				<div className='row'>
				<label>Annual Percentage Rate</label>
					<input name='rate' type='number' placeholder='0' step='0.01' value={ this.state.rate } onChange={this.handleChange}/>
				</div>
				<div className='row'>
					<label>Loan Term</label>
					<select name='term' value={this.state.term} onChange={this.handleChange}>
						<option>Choose term</option>
						<option name='Fifteen' value='15'>15 year</option>
						<option name='Thirty' value='30'>30 year</option>
					</select>
				</div>
				<div className='row'>
					<button name='submit' onClick={this.handleCalculation}>Submit</button>
				</div>
				<div className='row'>
					<div id='output' value={this.state.text}>{this.state.text}</div>
				</div>
			</div>
    );
  }
}
