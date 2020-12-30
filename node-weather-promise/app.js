const yargs = require("yargs");
import request from "./request";

yargs.version("1.1.0");

// weather command
yargs.command({
  command: "weather",
  describe: "Get Weather of Current Location",
  builder: {
    location: {
      // the command
      describe: `location of city or landmark`,
      demandOption: "true",
      type: "string",
    },
  },
  handler: (argv) => {
    // handler to handle args
    request.findCoords(argv);
  },
});

yargs.parse();
