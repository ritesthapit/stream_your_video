import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
    componentDidMount() {
        //loading the library takes some amount of time to reach google server and download some additional js code
        //after the client library has successfully loaded up, then will run the call back function
        //load -- only allows to get signal/notification when loading is complete by passing callback function
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({ //intialise with client id generated from console.developers.google.com
                //this is an async network request over to Google API server to initialise the client
                //this returns a promise
                clientId: 'PUT YOUR CLIENT ID',
                scope: 'email' // fetch email info
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                //immediately change the auth state in redux store at the initial render of the app
                this.onAuthChange(this.auth.isSignedIn.get()) //builtin isSignedIn state (gapi)--current state of signing in-- true or false
                //.listen -- listens for every sign in/out changes in the browser and update the state everytime the user authentication status changes
                this.auth.isSignedIn.listen(this.onAuthChange); //event listener
            });
        });
    }
    //check the state from the reducer
    //called anytime the authentication status changes through .listen method
    onAuthChange = (isSignedIn) => { //callback function as arrow function so that 'this' can be bound--used
        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId()); //call the action creator
        } else {
            this.props.signOut();
        }
    };

    onSignInClick = () => { //helper method to google sign in 
        this.auth.signIn(); //built in method of google api
    };

    onSignOutClick = () => { //helper method to google sign out
        this.auth.signOut();
    };
    renderAuthButton() {
        if(this.props.isSignedIn === null){
            return null;
        } else if(this.props.isSignedIn){
            return (
                <button onClick = {this.onSignOutClick} //no parenthesis = dont'call while rendering
                    className="ui red google button">
                    <i className="google icon"></i>
                    Sign Out    
                </button>
            )
        } else {
            return (
                <button onClick = {this.onSignInClick }
                className="ui green google button">
                    <i className="google icon"></i>
                    Sign In with Google    
                </button>
            )
        }
    }
    render(){
        return <div>{this.renderAuthButton()}</div>
    }
}
const mapStateToProps = (state) => {
    return {isSignedIn: state.auth.isSignedIn}; //from reducer
}
export default connect(mapStateToProps, {signIn:signIn, signOut:signOut})(GoogleAuth);