import React, {Component, PropTypes} from 'react';
import Message from './message'

class Messages extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {messages,user} = this.props;
        return (
            <div className="room">
                <ul>
                    {messages.map(msg =>
                      <Message
                        key={msg.time}
                        message={msg}
                        userName={user.name}/>
                    )}
                </ul>
            </div>
        );
    }
}

export default Messages;
