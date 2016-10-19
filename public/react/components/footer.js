import React, {Component, PropTypes} from 'react';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: this.props.text || ''
        };
    }
    handleChange(e) {
        this.setState({text: e.target.value})
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
            this.setState({text: ''});
        }
    }
    handleSubmit(e) {
        e.preventDefault();
    }
    componentDidMount() {
        let socket = this.props.socket;
        let sendMessage = this.props.sendMessage;
        socket.on('userJoin', function(data) {
            console.log('1111111');
            sendMessage('system', data.username + '加入了聊天,当前在线人数' + data.numUsers, null);
        });
        socket.on('userLeave', function(data) {
            console.log('222222');
            sendMessage('system', data.username + '退出了聊天,当前在线人数' + data.numUsers, null);
        });
        socket.on('messageAdded', function(message) {
            console.log('3333333');
            sendMessage('message', message.message, message.creator);
        });
    }
    render() {
        console.log('footer');
        const user = this.props.user;
        return (
            <footer className={user
                ? ""
                : "hidden"}>
                <form action="#" onSubmit={this.handleSubmit}>
                    <input required type="text" placeholder="请输入" value={this.state.text} onChange={this.handleChange.bind(this)} onKeyUp={this.handleKeyUp.bind(this)}/>
                </form>
            </footer>
        );
    }
}

export default Footer;
