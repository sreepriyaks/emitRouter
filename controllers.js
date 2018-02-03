
function get_home({req, res}) {
    console.log("Emitted get_home");
    res.end("Emitted get_home");
}

function post_home({req, res}) {
    console.log("Emitted post_home");
    res.end("Emitted post_home");
}

module.exports = {
     get_home,
     post_home
}