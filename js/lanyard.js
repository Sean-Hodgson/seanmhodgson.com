"use strict";

const CONSTANTS = {
    API_URL: "https://api.lanyard.rest/v1",
    WEBSOCKET_URL: "wss://api.lanyard.rest/socket",
    HEARTBEAT_PERIOD: 1000 * 30
}

async function lanyard(opts) {
    if (!opts) throw new Error("Specify an options object");
    if (!opts.userId) throw new Error("Specify a user ID");
    
    if (opts.socket) {
        if (!opts.onPresenceUpdate) throw new Error("Specify onPresenceUpdate callback");

        const supportsWebSocket = "WebSocket" in window || "MozWebSocket" in window;
        if (!supportsWebSocket) throw new Error( "Browser doesn't support WebSocket connections.",);
        
        const socket = new WebSocket(CONSTANTS.WEBSOCKET_URL);
        const subscription = typeof opts.userId == "string" ? "subscribe_to_id" : "subscribe_to_ids"

        socket.addEventListener("open", () => {
            socket.send(
                JSON.stringify({
                    op: 2,
                    d: {
                        [subscription]: opts.userId,
                    },
                }),
            );

            setInterval(() => {
                socket.send(
                    JSON.stringify({
                        op: 3,
                    }),
                );
            }, CONSTANTS.HEARTBEAT_PERIOD);
        });

        socket.addEventListener("message", ({ data }) => {
            const { t, d } = JSON.parse(data)

            if (t === "INIT_STATE" || t === "PRESENCE_UPDATE") {
                opts.onPresenceUpdate(d)
                if (d.spotify == null){
                    document.getElementById("avatar").style.border =  "5px solid #3ba55d";

                    if (d.discord_status == "offline") {
                        document.getElementById("avatar").style.border =  "5px solid #747f8d";
                        document.getElementById("activity").innerHTML = "Offline"
                    }  else {
                        if (d.activities.length == "0") {
                            document.getElementById("activity").innerHTML = `Chillin`;
                        } else {

                    if (d.activities[0].type == "0") {
                        if (d.activities[0].assets !== undefined){
                            document.getElementById("activity").innerHTML = `${d.activities[0].assets.small_text} - ${d.activities[0].assets.large_text}` ;

                        } else {
                            document.getElementById("activity").innerHTML = `${d.activities[0].name}` ;
                        }
                        
                    } else {
                        document.getElementById("activity").innerHTML = `Nothing`;
                    }}}

                } else {
                    document.getElementById("activity").innerHTML = `Listening to: ${d.spotify.song} by ${d.spotify.artist}`;
                }
                if (d.discord_status == "dnd") {
                    document.getElementById("avatar").style.border =  "5px solid #ed4245";
                    document.getElementById("activity").innerHTML = `Busy`;
                } 

                if (d.discord_status == "online") {
                    document.getElementById("avatar").style.border =  "5px solid #3ba55d";
                } 

                
                if (d.discord_status == "idle") {
                    document.getElementById("avatar").style.border =  "5px solid #faa81a";
                    
                } 

                
                
            }
        });

        return socket;
    } else {
        if (typeof opts.userId == "string") {
            const res = await fetch(`${CONSTANTS.API_URL}/users/${opts.userId}`);
            const body = await res.json();

            if (!body.success) throw new Error(body.error?.message || "An invalid error occured");

            return body.data;
        } else {
            const val = [];

            for (const userId of opts.userId) {
                const res = await fetch(`${CONSTANTS.API_URL}/users/${userId}`);
                const body = await res.json();

                if (!body.success) throw new Error(body.error?.message || "An invalid error occured");

                val.push(body.data)
            }

            return val;
        }
    }
}

        // websocket with single user example
        lanyard({
            userId: "178896785379426304",
            socket: true,
            onPresenceUpdate: console.log// presenceData
        }) // returns a websocket
