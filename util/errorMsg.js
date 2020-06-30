module.exports = (input) => {

    let err = {
        msg: null,
        err: null
    }

    if(typeof input === "string") {
        err.msg = input
    } else {
        err.msg = "Unexpected Error"
    } 

    return err

}