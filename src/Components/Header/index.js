import React, { Component, useState } from "react";
import { Link } from 'react-router-dom';
import Select from 'react-select';
import Background from './Background';
import Logo from '../Images/lovetravellogo.png';
import MobileApp from '../Images/mobile-app.gif';
import '../Styles/Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import UserAvatar from "../UserAvatar";

class Header extends Component {
    state = {
        experience: '',
        showLoginModal: false,
        username: '',
        password:'',
        showError: false,
        isLoggedIn: false,
        showProfileModal: false,
        showSignUpModal: false,
        usernameSignUp:'',
        passwordSignUp:'',
        showErrorSignUp:false,
        showErrorSignUpPwdValidation: false
    };

    componentDidMount() {
        window.scrollTo(0, 0);

        //check local storage for user information on component mount
        const storedUser = localStorage.getItem('user');
        if(storedUser) {
            this.setState({ isLoggedIn: true, username: storedUser });
        }
    }

    changeExperience = (event) => {
        const newExperienceValue = event.target.value;
        this.setState({ experience: newExperienceValue });
        this.props.updateExperience(newExperienceValue);
    };
    
    handleLoginModalOpen = () => {
        this.setState({showLoginModal: true});
    };

    handleLoginModalClose = () => {
        this.setState({showLoginModal: false});
    };
    handleLoginSubmit = async (e) => {
        e.preventDefault();
        const { username, password } = this.state;
        
        try {
            // Make a POST request to your Python API for authentication
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
    
            if (!response.ok) {
                throw new Error('Invalid username or password');
            }
    
            // If authentication is successful, update the UI
            this.setState({ username: username, password: '', showError: false, isLoggedIn:true });
            localStorage.setItem('user', username); //store the username in localstorage
            this.handleLoginModalClose();
        } catch (error) {
            // If authentication fails, show error message
            this.setState({ showError: true });
            console.error('Login failed:', error.message);
        }
    }
    handleProfileClick = () => {
        this.setState({ showProfileModal: true });
    }
    
    //function to handle profile modal close
    handleCloseProfileModal = () => {
        this.setState({ showProfileModal: false });
    } 
      // Function to handle logout
    handleLogout = () => {
        // Update the state to reflect that the user is logged out
        localStorage.removeItem('user');
        this.setState({ isLoggedIn: false, username: '', showProfileModal: false });
    }
    handleSignUpButtonClick = () => {
        this.setState({ showSignUpModal: true })
    }

     //function to handle Sign Up modal close
     handleSignupModalClose = () => {
        this.setState({ showSignUpModal: false });
    } 

    handleSignUpSubmit = async (e) => {
        e.preventDefault();
        const { usernameSignUp, passwordSignUp, confirmPassword } = this.state;
         
        // Password validation
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (!passwordRegex.test(passwordSignUp)) {
            this.setState({ showErrorSignUpPwdValidation: true });
            return;
        }
        if(passwordSignUp !== confirmPassword){
            this.setState({ showErrorSignUp: true});
            return;
        }
          

        try{
            const response = await fetch("/signup",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ usernameSignUp, passwordSignUp})
            });
            if(response.ok){
                alert("User has been created successfully");
                this.setState({ usernameSignUp:'', passwordSignUp: '', confirmPassword:'', showErrorSignUp: false, showErrorSignUpPwdValidation: false, showSignUpModal: false})
            }
            if(!response.ok){
                throw new Error("Sign up failed");
            }
            this.props.onHide();
        }
        catch(error){
            console.error('Sign up failed:', error.message);
           
        }
    };

    render() {
        const {
            backgroundImagesData,
            navigationData,
            selectedCity,
            history,
            experience,
            updateExperience
        } = this.props;

        return (
            <React.Fragment>
                <HeaderNav
                    changeExperience={this.changeExperience}
                    experience={this.state.experience}
                    history={history}
                    selectedCity={selectedCity}
                    navigationData={navigationData}
                    isLoggedIn={this.state.isLoggedIn} // Pass isLoggedIn as a prop
                    username={this.state.username} // Pass username as a prop
                    handleLogout={this.handleLogout} 
                    handleLoginModalOpen={this.handleLoginModalOpen}
                    handleProfileClick = {this.handleProfileClick}
                    handleCloseProfileModal = {this.handleCloseProfileModal}
                    showProfileModal ={this.state.showProfileModal}
                    showSignUpModal={this.state.showSignUpModal}
                    handleSignupModalClose={this.handleSignupModalClose}
                    showErrorSignUp={this.state.showErrorSignUp}
                    showErrorSignUpPwdValidation={this.state.showErrorSignUpPwdValidation}
                    usernameSignUp={this.state.usernameSignUp}
                    handleSignUpSubmit={this.handleSignUpSubmit}
                    handleSignUpChange= {(e) => this.setState({ [e.target.name]: e.target.value })}
                />
            
                <LoginModal
                show={this.state.showLoginModal}
                onHide={this.handleLoginModalClose}
                handleLoginSubmit={this.handleLoginSubmit}
                handleChange={(e) => this.setState({ [e.target.name]: e.target.value })}
                showError={this.state.showError}
                handleSignUpButtonClick={this.handleSignUpButtonClick}
                />
                <Background backgroundImagesData={backgroundImagesData} />
                <div className="search-bar-div">
                    <div className="select-city-large">
                        <i className="fas fa-map-marker" />
                        <Searchbar
                            style={customStyles}
                            history={this.props.history}
                            selectedCity={this.props.selectedCity}
                        />
                    </div>
                    <div className="select-experience-large">
                        <input
                            type="text"
                            placeholder="Search for experiences"
                            onChange={this.changeExperience}
                            value={this.state.experience}
                        />
                        <i className="fas fa-search" />
                    </div>
                    <button id="go">Let's Go</button>
                </div>
            </React.Fragment>
        );
    }
}

export class HeaderNav extends Component {


    static defaultProps = {
        navigationData: [
            {
                id: 1,
                name: 'LoveTravel Picks'
            },
            {
                id: 2,
                name: 'Best Sellers'
            },
            {
                id: 3,
                name: 'Abu Dhabi City Tours'
            },
            {
                id: 4,
                name: 'Amsterdam Attractions'
            },
            {
                id: 5,
                name: 'Burj Khalifa'
            }
        ]
    };
    render() {
        const { navigationData, experience, changeExperience, handleLoginModalOpen,isLoggedIn, username, handleLogout, 
            handleProfileClick, handleCloseProfileModal,showProfileModal, showSignUpModal, usernameSignUp,
            handleSignUpSubmit, handleSignupModalClose, handleSignUpChange,showErrorSignUp ,showErrorSignUpPwdValidation} = this.props;
        
        return (
            <div className="header-wrap">
                <div className="header-wrapper navbar-fixed-top">
                    <div className="header-left">
                        <div className="nav">
                            <div className="first-line">
                                <Link to={{ pathname: `/` }}>
                                    <div>
                                        <img id="logo" src={Logo} alt="LoveTravel" />
                                    </div>
                                </Link>
                                <div className="select-city">
                                    <Searchbar
                                        style={smallSearchbar}
                                        history={this.props.history}
                                        selectedCity={this.props.selectedCity}
                                    />
                                </div>
                                <div className="select-experience">
                                    <input
                                        type="text"
                                        placeholder="Search for experiences"
                                        onChange={changeExperience}
                                        value={experience}
                                    />
                                    <i className="fas fa-search" />
                                </div>
                            </div>
                            <div className="second-line">
                                <div className="best-picked">
                                    {navigationData &&
                                        navigationData.map(({ id, name }) => (
                                            <p key={id}>{name}</p>
                                        ))}
                                </div>
                                <div className="support">
                                    <p>
                                        24/7 Support{' '}
                                        <span className="arrow-down">
                                            {' '}
                                            <i className="fas fa-angle-down" />
                                        </span>
                                    </p>
                                    <p
                                        style={{
                                            marginRight: '0px'
                                        }}
                                    >
                                        English/USD
                                        <span className="arrow-down">
                                            {' '}
                                            <i className="fas fa-angle-down" />
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="header-right">
                                           
                        </div>
                    </div>
                     {/* Conditionally render the user avatar or login button */}
                    <div className="header-right">
                        {isLoggedIn ? (
                            <div onClick={handleProfileClick}>
                                <UserAvatar username={username} />
                            </div>
                        ) : (
                            <Button variant="outline-primary" onClick={handleLoginModalOpen}>Login</Button>
                        )}
                    </div>
                </div>
                {showProfileModal && (
                    <UserProfileModal
                    show={showProfileModal}
                    handleClose={handleCloseProfileModal}
                    username={username}
                    handleLogout={handleLogout}
                    />
                )}
                {
                    <SignUpModal
                    show={showSignUpModal}
                    onHide={handleSignupModalClose}
                    usernameSignUp={usernameSignUp}
                    handleSignUpChange={handleSignUpChange}
                    handleSignUpSubmit={handleSignUpSubmit}
                    showErrorSignUp={showErrorSignUp}
                    showErrorSignUpPwdValidation={showErrorSignUpPwdValidation}
                    />
                }
            </div>
        );
    }
}
const LoginModal = ({ show, onHide, handleLoginSubmit, handleChange, showError , handleSignUpButtonClick}) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleLoginSubmit}>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="Enter Username"
                        name="username"
                        onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group constrolId="FormBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        name="password"
                        onChange={handleChange}
                        />
                    </Form.Group>
                    {showError && <Alert variant="danger">Invalid username or password</Alert>}
                    <br></br>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
                <p>Don't have an account?  <Button variant="primary" onClick={handleSignUpButtonClick}>
                        Sign Up </Button></p>
            </Modal.Body>
        </Modal>
    );
};

const UserProfileModal = ({ show, handleClose, username, handleLogout }) => {
    return (
        <Modal show={show} onHide={handleClose} dialogClassName="modal-50w" contentClassName="custom-modal-content"
        >
            <Modal.Header closeButton>
                <Modal.Title><UserAvatar username={username}/><br></br>
                {username}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Link to="" className="custom-link">My Bookings</Link><br></br><br></br>
                <Link to="" className="custom-link">My Wishlist</Link><br></br><br></br>
                <Link to="" className="custom-link">Credits</Link>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleLogout}>
                    Sign out
                </Button>
        
            </Modal.Footer>
        </Modal>
    
        
    );
};

const SignUpModal = ({show, onHide, showErrorSignUp, showErrorSignUpPwdValidation,usernameSignUp, passwordSignUp, confirmPassword , handleSignUpSubmit, handleSignUpChange}) => {
    return(
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSignUpSubmit}>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="Enter Username"
                        name="usernameSignUp"
                        value={usernameSignUp}
                        onChange={handleSignUpChange}
                        required
                        />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                        type="password"
                        placeholder="Password"
                        name="passwordSignUp"
                        value={passwordSignUp}
                        onChange={handleSignUpChange}
                        required
                        />

                    </Form.Group>
                    <Form.Group controlId="formConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleSignUpChange}
                        required
                        />
                        
                    </Form.Group>
                    {showErrorSignUp && <Alert variant="danger">Password do not match</Alert>}
                    {showErrorSignUpPwdValidation && <Alert variant="danger">Password must be at least 8 characters long and include at least one letter, one number, and one special character </Alert>}
                    <Button variant="primary" type="submit">
                        Sign Up
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

const options = [
    { value: 'new-york', label: 'New York' },
    { value: 'las-vegas', label: 'Las Vegas' },
    { value: 'rome', label: 'Rome' },
    { value: 'paris', label: 'Paris' }

];

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        borderBottom: 'none',
        color: state.isSelected ? 'red' : '#727272',
        padding: 10,
        cursor: 'pointer',
        background: state.isSelected ? 'white' : 'white',
        fontSize: '13px',
        textAlign: 'left',
        width: 120
    }),
    control: () => ({
        width: 150,
        display: 'flex',
        fontSize: '14px',
        marginTop: '10px',
        paddingLeft: '5px'
    }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';

        return { ...provided, opacity, transition };
    }
};

const smallSearchbar = {
    option: (provided, state) => ({
        ...provided,
        borderBottom: 'none',
        color: state.isSelected ? 'red' : '#727272',
        padding: 10,
        cursor: 'pointer',
        background: state.isSelected ? 'white' : 'white',
        fontSize: '13px',
        textAlign: 'left',
        paddingLeft: '20px',
        width: 150
    }),
    control: () => ({
        width: 150,
        display: 'flex',
        fontSize: '11px',
        marginLeft: '15px'
    }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';

        return { ...provided, opacity, transition };
    }
};

class Searchbar extends Component {
    state = {
        selectedOption: null
    };

    handleChange = selectedOption => {
        this.setState({ selectedOption: selectedOption });
        this.changeUrl(selectedOption.value);
    };

    changeUrl = url => {
        this.props.history.push(`/cities/${url}`);
    };
    render() {
        const { selectedOption } = this.state;
        const { selectedCity } = this.props;
        if (selectedCity) {
            return (
                <Select
                    styles={this.props.style}
                    placeholder={selectedCity}
                    value={selectedOption}
                    onChange={this.handleChange}
                    options={options}
                    className="city-select-dropdown"
                />
            );
        } else {
            return (
                <Select
                    styles={this.props.style}
                    placeholder="Select City"
                    value={selectedOption}
                    onChange={this.handleChange}
                    options={options}
                    className="city-select-dropdown"
                />
            );
        }

    }
}

export default Header;