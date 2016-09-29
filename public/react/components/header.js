import React,{Component,PropTypes} from 'react';

class Header extends Component{
    constructor(props){
        super(props);
    }
    logout(){

    }
    render(){
        return (
            <header>
                <label>Chats</label>
                <div className="user">
                    <img src="" title="" alt="用户头像"/>
                    <a href="javascript:;" onClick={logout}>注销</a>
                </div>
            </header>
        );
    }
}
export default Header;
