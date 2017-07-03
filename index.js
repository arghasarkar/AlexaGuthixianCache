exports.handler = (event, context, callback) => {

    /**
     * MAIN
     * This is where a request comes in from AlexaSkillService to be parsed.
     * App launcher and all INTENT requests are handled here.
     */
    try {

        if (event.session.new) {
            // New session
            console.log("New session");
        }

        switch (event.request.type) {
            case "LaunchRequest": {
                // Launch request
                console.log("Launch request");
                cacheTimeHandler();

                break;
            }

            case "IntentRequest": {
                // Intent reqeust
                console.log("Intent request");
                console.log(event.request.intent.name);

                switch (event.request.intent.name) {

                    case "CacheTime": {
                        // Cache Time handler
                        cacheTimeHandler();
                        break;
                    }

                    default: {
                        context.succeed(
                            generateResponse(
                                buildSpeechletResponse("Failed intent", true),
                                {}
                            )
                        );
                    }
                }

                break;
            }

            case "SessionEndRequest": {
                // Session end request
                console.log("Session end request");

                break;
            }

            default: {
                endSessionHandler("Default hit");
            }
        }

    } catch(error) {
        endSessionHandler("Catch hit");
    }

    function cacheTimeHandler() {
        "use strict";

        const cacheTimer = require("./CacheTimer");
        context.succeed(
            generateResponse(
                buildSpeechletResponse(cacheTimer.timeToNextCache(), true),
                {}
            )
        );
    }

    function endSessionHandler(speech) {
        if (typeof speech === "undefined") {
            speech = "Good bye from the cache timer.";
        }
        context.succeed(
            generateResponse(
                buildSpeechletResponse(speech, true),
                {}
            )
        );
    }
};


// Helper functions
buildSpeechletResponse = (outputText, shouldEndSession) => {
    return {
        outputSpeech: {
            type: "PlainText",
            text: outputText
        },
        shouldEndSession: shouldEndSession
    }
};

generateResponse = (speechletResponse, sessionAttributes) => {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    }
};