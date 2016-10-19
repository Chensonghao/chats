import React, {Component, PropTypes} from 'react';

class Message extends Component {
    constructor(props) {
        super(props);
    }
    checkMessageType() {
        const {userName, message} = this.props;
        if (message.type !== 'system') {
            return (
                <li className={userName === message.creator.name? "mine": ""}>
                    <img src={message.creator.avatarUrl} alt="头像"/>
                    <div className="messageContent">
                        <div className={userName === message.creator.name?"hidden":"creator"}>{message.creator.name}</div>
                        <div className="message">{message.message}</div>
                    </div>
                </li>
            );
        }
        return (
            <li>
                <div className="systemMsg">{message.message}</div >
            </li>
        );
    }
    render() {
        return this.checkMessageType();
    }
}
export default Message;
