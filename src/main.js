import { } from "https://unpkg.com/@workadventure/scripting-api-extra@^1";

console.log('Script started successfully');

var currentPopup = undefined;
var lobster1Popup = undefined;
var lobster2Popup = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    WA.room.area.onEnter('clock').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup", "It's " + time, []);
    })

    WA.room.area.onLeave('clock').subscribe(closePopup)

	WA.room.area.onEnter('coffeemachine').subscribe(() => {
        currentPopup = WA.ui.openPopup("coffeemachinePopup", "Hier gibt's Kaffee umsonst!", []);
    })

    WA.room.area.onLeave('coffeemachine').subscribe(closePopup)

	WA.room.area.onEnter('lobster').subscribe(() => {
        lobster1Popup = WA.ui.openPopup("lobsterPopup1", "Seiet gesegnet!", []);
		lobster2Popup = WA.ui.openPopup("lobsterPopup2", "Fürchtet euch nicht!", []);
    })

    WA.room.area.onLeave('lobster').subscribe(closePopup)
	WA.room.area.onLeave('lobster').subscribe(closePopup)
	
}).catch(e => console.error(e));

function closePopup(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    } else if (lobster1Popup !== undefined) {
        lobster1Popup.close();
        lobster1Popup = undefined;
    } else if (lobster2Popup !== undefined) {
        lobster2Popup.close();
        lobster2Popup = undefined;
    }
}

export {};
