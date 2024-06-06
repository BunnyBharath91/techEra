import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../header'

import './index.css'

class Home extends Component {
  state = {
    status: 'LOADING',
    coursesList: [],
  }

  componentDidMount() {
    this.getAllCourses()
  }

  getAllCourses = async () => {
    const response = await fetch('https://apis.ccbp.in/te/courses')
    if (response.ok) {
      const fetchedData = await response.json()
      const allCoursesList = fetchedData.courses
      const updatedCoursesList = allCoursesList.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        logoUrl: eachItem.logo_url,
      }))
      this.setState({
        status: 'DONE',
        coursesList: updatedCoursesList,
      })
    }
    if (response.status === 400) {
      this.setState({
        status: 'FAILURE',
      })
    }
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader
        data-testid="loader"
        type="ThreeDots"
        color="#0b69ff"
        height="50"
        width="50"
      />
    </div>
  )

  renderCourse = item => {
    const {id, name, logoUrl} = item
    return (
      <Link
        to={{
          pathname: `/courses/${id}`,
          state: {id},
        }}
        key={id}
      >
        <li className="course-card">
          <img alt={name} src={logoUrl} className="course-img" />
          <p className="course-name">{name}</p>
        </li>
      </Link>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        className="failure-view-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.getAllCourses}
      >
        Retry
      </button>
    </div>
  )

  render() {
    const {coursesList, status} = this.state

    return (
      <div className="bg-container">
        <Header />

        <div className="all-courses-container">
          <h1 className="main-heading">Courses</h1>

          {status === 'LOADING' && this.renderLoader()}
          {status === 'DONE' && (
            <ul className="courses-list">
              {coursesList.map(eachItem => this.renderCourse(eachItem))}
            </ul>
          )}
          {status === 'FAILURE' && this.renderFailureView()}
        </div>
      </div>
    )
  }
}

export default Home
