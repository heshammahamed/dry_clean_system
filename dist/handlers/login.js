/*
(1)
    check the usernama and the password for the given request are exist
(2)
    get the user password and data using phone number :
        - the phone number is not exit
    check password :
        - password is wrong
*/
export async function handleLogin(req, res) {
    if (!req.body.username) {
        throw new Error("username");
    }
    if (!req.body.password) {
        throw new Error("password");
    }
}
