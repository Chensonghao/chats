import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Header from './header';
import Messages from './messages';
import Login from './login';
import Footer from './footer';
import {login, logout, getMessages,sendMessage} from '../actions';

class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let {user, messages, login, logout,sendMessage,socket} = this.props;
        return (
            <div className="reactroot">
                <Header user={user} logout={logout} socket={socket}/>
                <div className="container">
                    {(function() {
                        if (user) {
                            return (<Messages user={user} messages={messages}/>);
                        }
                        return (<Login login={login} socket={socket}/>);
                    })()
}
                </div>
                <Footer user={user} sendMessage={sendMessage} socket={socket}/>
            </div>
        );
    }
}
App.propTypes = {
    messages: PropTypes.array.isRequired,
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
}
function mapStateToProps(state) {
    return {user: state.user, messages: state.messages}
}

export default connect(mapStateToProps, {login, logout, sendMessage})(App);
