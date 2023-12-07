import './index.css'

const MoneyDetails = props => {
  const {
    displayName,
    displayAmount,
    imagesLink,
    background,
    imgBackground,
    altNames,
    testId,
  } = props

  return (
    <li className={`amount-containers ${background} ${imgBackground}`}>
      <img className="tata" src={imagesLink} alt={altNames} />
      <div>
        <p className="para">{displayName}</p>
        <p className="para2" data-testid={testId}>{`Rs ${displayAmount}`}</p>
      </div>
    </li>
  )
}

export default MoneyDetails
