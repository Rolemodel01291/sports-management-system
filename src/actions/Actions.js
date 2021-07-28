export const SIGN_UP = "SIGN_UP"

export function signUp()
{
    console.log('---------')
    return (dispatch) => {
        dispatch({
            type   : SIGN_UP,
            value  : 1
        })
    }
}