/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;
let lobster1Popup: any = undefined;
let lobster2Popup: any = undefined;

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
	
    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

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