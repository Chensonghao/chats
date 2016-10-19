

export default function chats(state=[], action) {
    switch (action.type) {
        case 'SEND_MESSAGE':
            return [
                ...state, {
                    type: action.messageType,
                    creator: action.creator,
                    message: action.message,
                    time: action.time
                }
            ];
        case 'GET_LOCAL_MESSAGES':
            return action.messages;
        default:
            return state
    }
}
