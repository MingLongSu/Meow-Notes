// Handles displaying the psuedo company logo
class DisplayLogo { 
    // Returns the state of the logo prompt
    static getPromptStat() {
        return this.promptStat; // False for not pressed and true for pressed
    }

    // Sets the state of the logo prompt
    static setPromptStat(status) { 
        this.promptStat = status;
    }

    // Handles the logic for how the logo should roll 
    static promptPressed(display, logoImage) { 
        // Getting the state of the logo prompt  
        var promptStat = this.getPromptStat();

        // Checking whether it is the first time the prompt was pressed
        promptStat = (promptStat == undefined) ? false : promptStat;

        // Picking the roll direction based on the state of the prompt
        (promptStat == false) ? this.rollOut(display, logoImage) : this.rollIn(display, logoImage);
    }

    // Rolling out when the prompt stat is false
    static rollOut(display, logoImage) { 
        // Rotating the logo 
        logoImage.style.animation = "rotateIn 0.3s linear 1";
        logoImage.style.transform = "rotate(0deg)";

        // Moving the display outward
        display.style.animation = "rollOut 0.3s linear 1";
        display.style.transform = "translateX(0px)";

        // Setting back to true once display is rolled back out
        this.setPromptStat(true);
    }

    // Rolling back in when the prompt stat is true
    static rollIn(display, logoImage) { 
        // Rotating the logo 
        logoImage.style.animation = "rotateOut 0.3s linear 1";
        logoImage.style.transform = "rotate(0deg)";
        
        // Moving the display inward
        display.style.animation = "rollIn 0.3s linear 1";
        display.style.transform = "translateX(calc(100% - 62px))";

        // Setting back to false once display is rolled back in
        this.setPromptStat(false);
    }
}

// Selecting the display psuedo company data container
const display = document.querySelector(".pseudo-comp-container"); 

// Selecting the logo itself
const logoImage = document.querySelector(".logo-img");

["click", "touchstart"].forEach(trigger => {
    // Addin event listeners for displaying the pseudo comp logo
    display.addEventListener(trigger, () => { 
        DisplayLogo.promptPressed(display, logoImage);
    });
});