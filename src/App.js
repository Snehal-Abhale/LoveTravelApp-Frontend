// import logo from './logo.svg';

import React, {Component} from 'react';
import Routes from './CityRoutes';
import logo from './Components/Images/lovetravellogo.png';

class App extends Component {
  state = { width: 0, height: 0};

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  updateWindowDimensions = () =>
    this.setState({ width: window.innerWidth, height: window.innerHeight})
  render () {
    const { width } = this.state;
    const mobileTablet = width <= 1100;
 
    if(mobileTablet) {
      return (
        <div className='mobile-tablet'>
          <img src={logo} alt="LoveTravel"/>
          <p>
            Currently, we are not supporting Mobile and Tablets{' '}
            <span role="img" aria-label="Warn">
            🙏
            </span>
          </p>
        </div>
      );
    } else {
      return <Routes />;
    }
  
  }
}

export default App;
