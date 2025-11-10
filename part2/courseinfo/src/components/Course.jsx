const Header = ({ course }) => {
  return (
    <div>
      <h2>{course.name}</h2>
    </div>
  )
}

const Content = ({ parts }) => {
  return (
    <ul>
      {parts.map((part, i) =>
        <li key={i}>
          <Part name={part.name} exercises={part.exercises} />
        </li>
      )}
    </ul>
  )
}

const Part = ({ name, exercises }) => {
  return (
    <div>
      <p>
        {name} {exercises}
      </p>
    </div>
  )
}

const Total = ({ parts }) => {
  const exercises = parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <div>
      <p><b>total of {exercises} exercises</b></p>
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course;