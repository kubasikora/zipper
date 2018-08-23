exports.setHost = () => {
  var debugFlag = process.argv[2];
  if (debugFlag == "-p") return "0.0.0.0";
  else return "127.0.0.1";
};
