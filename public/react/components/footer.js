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
    handleSubmit(e) {
        const text = e.target.value.trim();
        if (e.which === 13) {
            this.props.sendMessage(text);
            this.setState({text: ''});
        }
    }
    render() {
        return (
            <footer>
                <form action="#">
                    <input required type="text"
                        placeholder="请输入"
                        value={this.state.text}
                        onChange={this.handleChange.bind(this)}
                        onKeyDown={this.handleSubmit.bind(this)}/>
                </form>
            </footer>
        );
    }
}

export default Footer;
