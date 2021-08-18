// Handles the opacity change in the Foreground
class ForegroundOpacity { 
    static adjustOpacity(slider, foreground) { 
        foreground.style.opacity = `${slider.value / 100}`;
    }
}

// Getting the value display
const value_display = document.querySelector(".opacity-value-value");

// Getting the slider
const slider = document.querySelector(".opacity-container-slider");

// Getting the foreground
const foreground = document.querySelector(".main-bar-foreground");

// Initialising the value on the display
value_display.innerHTML = `${slider.value / 100}`;

// Initialising the value of the opacity 
foreground.style.opacity = `${slider.value / 100}`;

// Updating the value on the display 
slider.addEventListener("input", () => { 
    value_display.innerHTML = `${slider.value / 100}`;
    ForegroundOpacity.adjustOpacity(slider, foreground);
});

// Handles changing the theme based on the theme selected
class ThemeChange { 
    // Changes the style of each component
    static changeTheme(theme, changeableComps, mainView, logoContainer) { 
        // Logic for the color that should be chosen
        const themeProperties = window.getComputedStyle(theme);
        const colour = themeProperties.backgroundColor;

        // Setting the very background colour
        mainView.style.backgroundColor = colour;

        // Setting the logo container's colour
        logoContainer.style.backgroundColor = colour;

        // Changes the component colours
        changeableComps.forEach(comp => { 
            comp.style.borderColor = colour;
        });

        // Saving the colour to the local storage
        localStorage.setItem("Colour", colour);
    }

    // Load theme
    static loadTheme(changeableComps, mainView, logoContainer) { 
        // Getting the theme from the local storage
        var colour = localStorage.getItem("Colour") || "var(--theme-one-secondary)"; 

        // Setting the very background colour
        mainView.style.backgroundColor = colour;

        // Setting the logo container's colour
        logoContainer.style.backgroundColor = colour;

        // Changes the component colours
        changeableComps.forEach(comp => { 
            comp.style.borderColor = colour;
        });
    }   
}

// Getting the theme prompts
const themePrompt = document.querySelectorAll(".theme");

// Getting all changeable components
const changeableComps = document.querySelectorAll("#changeable");

// Getting mainview 
const mainView = document.querySelector(".main-view");

// Getting the logo container
const logoContainer = document.querySelector(".logo-name-container");

// Getting the psuedo themes container
const pseudoContainer = document.querySelector(".themes-container-psuedo");

ThemeChange.loadTheme(changeableComps, mainView, logoContainer); 

// Adding some event listeners
["click", "touchstart"].forEach(trigger => {
    themePrompt.forEach(theme => { 
        theme.addEventListener(trigger, () => {
            ThemeChange.changeTheme(theme, changeableComps, mainView, logoContainer, pseudoContainer); 
        }); 
    });
});

// Handles uploading of files
class UploadFile { 
    // New background
    static upload(uploadButtonReal, uploadButtonPseudo, mainBarBackground) { 
        uploadButtonReal.click();

        uploadButtonReal.oninput = () => { 
            const reader = new FileReader()
            
            reader.addEventListener("load", () => { 
                // Setting the background to the new background
                mainBarBackground.style.backgroundImage = `url(${reader.result})`;
                uploadButtonPseudo.style.backgroundImage = `url(${reader.result})`;
        
                // Saving the decided background
                localStorage.setItem("Background", reader.result);
            });
        
            reader.readAsDataURL(uploadButtonReal.files[0]);
        }
    }

    // Loading previous background setting 
    static load(uploadButtonPseudo, mainBarBackground) { 
        // Getting the previous background setting
        var background = localStorage.getItem("Background");

        // Checking whether it exists or not
        background = (background == undefined) ? `url(${"https://external-preview.redd.it/qcLH1HoZvRKf4C2mmgHnHkpbF9rCbR1aK16J792zwr0.jpg?auto=webp&s=32ba0b08b632139346201850f5f176e4d9ce372c"})` : `url(${background})`;

        // Changing the backgrounds
        mainBarBackground.style.backgroundImage = background;
        uploadButtonPseudo.style.backgroundImage = background;
    }
}

// Getting the real upload-a-file button
const uploadButtonReal = document.querySelector(".upload-a-background-real");

// Getting the psuedo upload-a-file button 
const uploadButtonPseudo = document.querySelector(".upload-a-background-background-preview");

// Getting the main bar background 
const mainBarBackground = document.querySelector(".main-bar-background");

// Loading previous background setting
UploadFile.load(uploadButtonPseudo, mainBarBackground);

// Adding a event listenrs 
["click", "touchstart"].forEach(trigger => {
    uploadButtonPseudo.addEventListener(trigger, () => { 
        UploadFile.upload(uploadButtonReal, uploadButtonPseudo, mainBarBackground);
    });
});