// Handles displaying the settings menu
class DisplaySettings { 
    // Gets the status of the prompt
    static getPromptStatus() { 
        return this.promptStatus;
    }

    // Changes the status of whether or not the prompt is pressed
    static setPromptStatus(status) { 
        this.promptStatus = status;
    }

    // Handles the logic for when the user presses the prompt for opening settings menu
    static promptPressed(settingsPromptArrow, settingsPromptContent) {
        // Getting the state of the button
        var promptStatus = this.getPromptStatus();

        // Adjusting for initial value of the prompt
        promptStatus = (promptStatus == undefined) ? false : promptStatus;

        // Pops out the settings menu if prompt status is false (not out), otherwise inward if true
        promptStatus == false ? this.popOut(settingsPromptArrow, settingsPromptContent) : this.popIn(settingsPromptArrow, settingsPromptContent);
    }

    // Pops out the settings menu
    static popOut(settingsPromptArrow, settingsPromptContent) { 
        settingsPromptArrow.style.animation = "rotateOut 0.2s linear 1";
        settingsPromptArrow.style.transform = "rotate(180deg)";
        settingsPromptContent.style.animation = "popOutSetting 0.2s linear 1";
        settingsPromptContent.style.transform = "translateX(-300px)";

        // Updating the state of the pressed button
        this.setPromptStatus(true);
    }

    // Pops in the settings menu
    static popIn(settingsPromptArrow, settingsPromptContent) { 
        settingsPromptArrow.style.animation = "rotateIn 0.2s linear 1";
        settingsPromptArrow.style.transform = "rotate(0deg)";
        settingsPromptContent.style.animation = "popInSetting 0.2s linear 1";
        settingsPromptContent.style.transform = "translateX(0px)";

        // Updating the state of the pressed button
        this.setPromptStatus(false);
    }
}

// Getting the prompt
const settingsPrompt = document.querySelector(".side-bar-right-prompt");

// Getting the prompt arrow and the container for the settings
const settingsPromptArrow = document.querySelector(".side-bar-right-prompt-name");
const settingsPromptContent = document.querySelector(".side-bar-right-container");

["click", "touchstart"].forEach(trigger => { 
    settingsPrompt.addEventListener(trigger, () => { 
        DisplaySettings.promptPressed(settingsPromptArrow, settingsPromptContent);
    });
});