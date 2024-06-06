import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../header'

import './index.css'

class CourseItemDetails extends Component {
  state = {
    status: 'LOADING',
    courseDetails: '',
  }

  componentDidMount() {
    const {location} = this.props
    const courseId = location.state.id
    this.getCourseDetails(courseId)
  }

  getCourseDetails = async courseId => {
    const response = await fetch(`https://apis.ccbp.in/te/courses/${courseId}`)
    if (response.ok) {
      const fetchedData = await response.json()
      const rawCourseDetails = fetchedData.course_details
      const updatedCourseDetails = {
        id: rawCourseDetails.id,
        name: rawCourseDetails.name,
        imageUrl: rawCourseDetails.image_url,
        description: rawCourseDetails.description,
      }
      this.setState({
        status: 'DONE',
        courseDetails: updatedCourseDetails,
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
        onClick={this.getCourseDetails}
      >
        Retry
      </button>
    </div>
  )

  render() {
    const {courseDetails, status} = this.state

    return (
      <div className="bg-container">
        <Header />

        <div className="course-details-container">
          {status === 'LOADING' && this.renderLoader()}
          {status === 'DONE' && (
            <div className="main-container">
              <img
                alt={courseDetails.name}
                src={courseDetails.imageUrl}
                className="course-image"
              />
              <h1 className="course-heading">{courseDetails.name}</h1>
              <p className="course-description">{courseDetails.description}</p>
            </div>
          )}
          {status === 'FAILURE' && this.renderFailureView()}
        </div>
      </div>
    )
  }
}

export default CourseItemDetails
