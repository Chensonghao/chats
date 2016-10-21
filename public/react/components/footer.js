import React, {Component, PropTypes} from 'react';

class Footer extends Component {
    constructor(props) {
        super(props);
    }
    handleKeyUp(e) {
        const text = e.target.value.trim();
        const user = this.props.user;
        if (e.which === 13) {
            this.props.socket.emit('createMessage', {
                type: 'message',
                message: text,
                creator: user
            });
            e.target.value = '';
        }
    }
    handleSubmit(e) {
        e.preventDefault();
    }
    componentDidMount() {
        const user = this.props.user;
        let socket = this.props.socket;
        let sendMessage = this.props.sendMessage;
        socket.removeListener('userJoin');
        socket.removeListener('userLeave');
        socket.removeListener('messageAdded');
        socket.on('userJoin', function(data) {
            sendMessage('system', data.username + '加入了聊天,当前在线人数' + data.numUsers, null);
        });
        socket.on('userLeave', function(data) {
            sendMessage('system', data.username + '退出了聊天,当前在线人数' + data.numUsers, null);
        });
        socket.on('messageAdded', function(message) {
            user && sendMessage('message', message.message, message.creator, user.email);
        });
    }
    shouldComponentUpdate(nextProps, nextState){
        return false;
    }
    render() {
        return (
            <footer>
                <form action="#" onSubmit={this.handleSubmit}>
                    <input required type="text" placeholder="请输入" onKeyUp={this.handleKeyUp.bind(this)}/>
                </form>
            </footer>
        );
    }
}

export default Footer;
