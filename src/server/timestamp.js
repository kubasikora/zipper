exports.timestamp = () => {
    var date = new Date();
    return date.toLocaleString() + "." + date.getMilliseconds() + " ";
}