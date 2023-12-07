import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import './index.css'

import MoneyDetails from '../MoneyDetails'

import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    amount: '0',
    expenses: '0',
    titleInput: '',
    amountInput: '',
    typeInput: 'INCOME',
    transactionList: [],
  }

  onClickSubmit = event => {
    event.preventDefault()
    const {titleInput, amountInput, typeInput} = this.state

    let displayingText

    if (typeInput === 'INCOME') {
      displayingText = 'Income'
      this.setState(prevState => ({
        amount: parseInt(prevState.amount) + amountInput,
      }))
    } else if (typeInput === 'EXPENSES') {
      displayingText = 'Expenses'
      this.setState(prevState => ({
        expenses: parseInt(prevState.expenses) + amountInput,
      }))
    }

    const newList = {
      id: uuidv4(),
      title: titleInput,
      amounted: amountInput,
      type: displayingText,
    }

    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newList],
      titleInput: '',
      amountInput: '',
      typeInput: 'INCOME',
    }))
  }

  onDeleteButton = id => {
    const {transactionList} = this.state
    console.log('pressed')

    transactionList.forEach(eachItem => {
      if (eachItem.id === id) {
        if (eachItem.type === 'Income') {
          this.setState(prevState => ({
            amount: prevState.amount - eachItem.amounted,
          }))
        } else if (eachItem.type === 'Expenses') {
          this.setState(prevState => ({
            expenses: prevState.expenses - eachItem.amounted,
          }))
        }
      }
    })

    const filtered = transactionList.filter(each => each.id !== id)
    this.setState({transactionList: filtered})
  }

  onChangeTitle = event => this.setState({titleInput: event.target.value})

  onChangeAmount = event =>
    this.setState({amountInput: parseInt(event.target.value)})

  onChangeType = event => this.setState({typeInput: event.target.value})

  render() {
    const {
      amount,
      expenses,
      titleInput,
      amountInput,
      transactionList,
    } = this.state
    const balance = amount - expenses
    console.log(this.state)
    return (
      <div className="home-container">
        <div className="card-container">
          <div className="money-manager-container">
            <div className="profile-container">
              <h1 className="userName">Hi! Rechar</h1>
              <p className="welcome-para">
                Welcome back to your{' '}
                <span className="heigh-light">Money Manager</span>
              </p>
            </div>
            <ul className="balance-container">
              <MoneyDetails
                key={uuidv4()}
                displayAmount={balance}
                displayName="Your Balance"
                imagesLink="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
                altNames="balance"
                background="first-background"
                imgBackground="first-img-background"
                testId="balanceAmount"
              />
              <MoneyDetails
                key={uuidv4()}
                displayName="Your Income"
                displayAmount={amount}
                imagesLink="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png "
                altNames="income"
                background="second-background"
                imgBackground="second-img-background"
                testId="incomeAmount"
              />
              <MoneyDetails
                key={uuidv4()}
                displayName="Your Expenses"
                displayAmount={expenses}
                imagesLink="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
                altNames="expenses"
                background="third-background"
                imgBackground="third-img-background"
                testId="expensesAmount"
              />
            </ul>
            <div className="transactions-container">
              <form
                className="user-inputs-container"
                onSubmit={this.onClickSubmit}
              >
                <h1>Add Transactions</h1>
                <label className="labels" htmlFor="title-input">
                  TITLE
                </label>
                <input
                  className="user-inputs"
                  id="title-input"
                  onChange={this.onChangeTitle}
                  value={titleInput}
                  placeholder="TITLE"
                />
                <label className="labels" htmlFor="amount-input">
                  AMOUNT
                </label>
                <input
                  className="user-inputs"
                  id="amount-input"
                  onChange={this.onChangeAmount}
                  value={amountInput}
                  placeholder="AMOUNT"
                />
                <label className="labels" htmlFor="type-input">
                  TYPE
                </label>
                <select
                  className="user-inputs"
                  id="select-input"
                  onChange={this.onChangeType}
                >
                  {transactionTypeOptions.map(eachItem => (
                    <option key={uuidv4()} value={eachItem.optionId}>
                      {eachItem.displayText}
                    </option>
                  ))}
                </select>
                <button className="add-button" type="submit">
                  Add
                </button>
              </form>
              <ul className="history-container">
                <h1 className="history-header">History</h1>
                <li className="transaction-headers">
                  <p className="transactionsHead">Title</p>
                  <p className="transactionsHead">Amount</p>
                  <p className="transactionsHead">Type</p>
                </li>
                {transactionList.map(each => (
                  <TransactionItem
                    key={each.id}
                    transactionDetails={each}
                    onDeleteButton={this.onDeleteButton}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
