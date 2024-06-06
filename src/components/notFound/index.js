import Header from '../header'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <Header />
    <div className="not-found-main-container">
      <img
        alt="not found"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png "
        className="not-found-img"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-para">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </div>
)

export default NotFound