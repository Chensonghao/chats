const storage = require('../../common/utils/localStorage');

let userLogin = (user,socket) => {
    //通知群组某用户加入聊天
    socket.emit('addUser', user.name);
    return {
        type: 'LOGIN',
        user
    };
}
let getMessages = email => {
    let messages = storage.get(email);
    return {
        type: 'GET_LOCAL_MESSAGES',
        messages
    }
}
let userLogout = socket => {
    //通知群组某用户离开
    socket.emit('removeUser');
    return {
        type: 'LOGOUT'
    };
}

let ajax = (opts, success, error) => {
    let xhr = new XMLHttpRequest();
    xhr.open(opts.method, opts.url, true);　　
    xhr.onload = function(e) {
        if (this.status == 200 || this.status == 304) {
            return success(JSON.parse(this.responseText));
        } else {
            error && error(this.responseText)
        }
    };
    error && (xhr.onerror = error);
    opts.contentType && xhr.setRequestHeader('Content-Type', opts.contentType);
    xhr.send(JSON.stringify(opts.data));
};

/**
验证用户是否登陆
*/
export function getUser(socket) {
    return (dispatch, getState) => {
        ajax({
            url: '/api/validate',
            method: 'GET'
        }, function(user) {
            dispatch(userLogin(user,socket));
            dispatch(getMessages(user.email));
        });
    }
}
/**
用户登陆
*/
export function login(email,socket) {
    return (dispatch, getState) => {
        ajax({
            url: '/api/login',
            method: 'POST',
            contentType: 'application/json;charset=utf-8',
            data: {
                email: email
            }
        }, function(user) {
            dispatch(userLogin(user,socket));
            dispatch(getMessages(user.email));
        });
    }
}
/**
用户注销
*/
export function logout(socket) {
    return (dispatch, getState) => {
        ajax({
            url: '/api/logout',
            method: 'GET'
        }, function(user) {
            dispatch(userLogout(socket));
        });
    }
}

export function sendMessage(messageType, message, creator) {
    const msg = {
        messageType,
        creator,
        message,
        time: new Date() * 1
    };
    creator && storage.set(creator.email, msg);
    msg.type = 'SEND_MESSAGE';
    return msg;
}
