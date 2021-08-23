const config = require("./utils/config");

const http = require("./app");

http.listen(config.PORT, () => console.log("server is running on port", config.PORT));