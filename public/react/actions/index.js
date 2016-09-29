export function login(text) {
  return { type: 'LOGIN', text }
}

export function loginout(id) {
  return { type: 'LOGOUT', id }
}

export function messageInput(id, text) {
  return { type: 'SENDMESSAGE', id, text }
}
//////////
export function sendMessage(id) {
  return { type: types.COMPLETE_TODO, id }
}

export function completeAll() {
  return { type: types.COMPLETE_ALL }
}

export function clearCompleted() {
  return { type: types.CLEAR_COMPLETED }
}
