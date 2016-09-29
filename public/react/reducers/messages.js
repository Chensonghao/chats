const initialState = [{
    type: 'system',
    message: 'xxx加入了聊天，当前在线人数11'
}, {
    message: 'hello',
    creator: $scope.me,
    type: 'message'
}]

export default function chats(state = initialState, action) {
    switch (action.type) {
        case 'SENDMESSAGE':
            return [
                ...state, {
                    type: action.messageType,
                    creator: action.creator,
                    message: action.message
                }
            ];
        default:
            return state
    }
}
