const log4js = require("log4js");

log4js.configure({
    appenders: { 
        mainLogger: { 
            type: "console",
            layout: {
                type: "pattern",
                pattern: "%[[%d{dd.MM.yyyy dd-hh:mm:ss}]%] [%[%p]%] - %m"
            }
        } 
    },
    categories: { 
        default: { 
            appenders: [ "mainLogger" ], 
            level: "DEBUG" 
        } 
    }
});

module.exports.logger = log4js.getLogger("mainLogger");