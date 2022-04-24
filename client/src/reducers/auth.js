import { AUTH, LOGOUT } from '../constants/actionTypes'

const authReducer = (state = { authData: null, isLogedIn: false }, action) => {
    switch(action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }))

            return { ...state, authData: action?.data, isLogedIn: true }
        case LOGOUT:
            localStorage.clear()
            return { ...state, authData: null, isLogedIn: false }
        default:
            return state
    }
}

export default authReducer