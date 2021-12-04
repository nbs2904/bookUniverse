const log4js = require("log4js");

log4js.configure({
    appenders: { 
        Backend: { 
            type: "console",
            layout: {
                type: "pattern",
                pattern: "\u001b[38;5;245m[%d{dd.MM.yyyy hh:mm:ss}]\u001b[0m %[[%p]%] - %m"
            }
        } 
    },
    categories: { 
        default: { 
            appenders: [ "Backend" ], 
            level: "DEBUG" 
        } 
    }
});

module.exports.logger = log4js.getLogger("Backend");