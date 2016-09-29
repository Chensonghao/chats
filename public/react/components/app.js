import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Header from './header';
import Messages from './messages';
import Footer from './footer';
import * as chatsActions from '../actions';

class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {user,messages, actions} = this.props
        return (
            <div>
                <Header user={user} logout={actions.logout}/>
                <Messages user={user} messages = {messages}/>
                <Footer sendMessage = {actions.sendMessage}/>
            </div>
        );
    }
}
App.propTypes = {
    actions: PropTypes.object.isRequired,
    messages: PropTypes.array.isRequired
}
function mapStateToProps(state) {
    return {user: state.user, messages: state.messages}
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(chatsActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
