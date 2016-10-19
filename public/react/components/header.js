import React,{Component,PropTypes} from 'react';

class Header extends Component{
    constructor(props){
        super(props);
    }
    logout(){
        this.props.logout(this.props.socket);
    }
    checkUser(){
        var user = this.props.user;
        if(user){
            return (
                <div className="user">
                    <img src={user.avatarUrl} title={user.name} alt="用户头像"/>
                    <a href="javascript:;" onClick={this.logout.bind(this)}>注销</a>
                </div>
            );
        }else{
            return (<div className="user"></div>);
        }
    }
    render(){
        console.log('header');
        var logout = this.props.logout;
        return (
            <header>
                <label>Chats</label>
                {this.checkUser()}
            </header>
        );
    }
}
export default Header;
