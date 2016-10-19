import React,{Component,PropTypes} from 'react';

class Login extends Component{
    constructor(props){
        super(props);
    }
    login(e){
        e.preventDefault();
        //登陆--todo
        this.props.login(this.refs.email.value,this.props.socket);
    }
    render(){
        return (
            <form className="loginform" onSubmit={this.login.bind(this)}>
                <input required type="email" placeholder="请输入邮箱账户" ref="email"/>
                <button type="submit">登陆</button>
            </form>
        )
    }
}
export default Login;
