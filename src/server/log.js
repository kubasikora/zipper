var timestamp = require('./timestamp').timestamp;
exports.log = (data) => {
    console.log(timestamp() + data);
}