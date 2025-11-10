import { useState } from 'react'

const Statistics = ({ good, neutral, bad }) => {
  const totalCount = good + neutral + bad;

  if (totalCount == 0) {
    return <p>No feedback given</p>
  }

  return (
    <div>
      <StatisticsLine text="good" value={good} />
      <StatisticsLine text="neutral" value={neutral} />
      <StatisticsLine text="bad" value={bad} />
      <StatisticsLine text="all" value={totalCount} />
      <StatisticsLine text="average" value={(good * 1 + bad * -1) / totalCount} />
      <StatisticsLine text="positive" value={good / totalCount * 100} unit="%" />
    </div>
  )
}

const StatisticsLine = ({ text, value, unit = "" }) => {
  return <p>{text} {value} {unit}</p>
}

const Button = ({ text, onClickFunction }) => {
  return (
    <button onClick={onClickFunction}>{text}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClickFunction={() => setGood(good + 1)} />
      <Button text="neutral" onClickFunction={() => setNeutral(neutral + 1)} />
      <Button text="bad" onClickFunction={() => setBad(bad + 1)} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App