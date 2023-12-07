import './index.css'

const TransactionItem = props => {
  const {transactionDetails, onDeleteButton} = props
  const {id, title, amounted, type} = transactionDetails

  const onClickButton = () => {
    onDeleteButton(id)
  }

  return (
    <li className="line-container">
      <p className="data">{title}</p>
      <p className="data">{`Rs ${amounted}`}</p>
      <p className="data">{type}</p>
      <button
        type="button"
        className="delete-button"
        data-testid="delete"
        onClick={onClickButton}
      >
        <img
          className="delete-image"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem
