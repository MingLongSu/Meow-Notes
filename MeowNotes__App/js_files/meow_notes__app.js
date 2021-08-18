// Handles all the basic features (getting notes, saving notes, deleting notes)
class NotesAPI { 
    static getNotes() { 
        // Getting all notes from local storage key
        var allNotes = JSON.parse(localStorage.getItem("Notes")) || [];

        // Sorting the list of notes by most recently updated
        allNotes = this.sortNotes(allNotes);

        console.log(allNotes);

        return allNotes;
    }

    static saveNote(noteToSave) { 
        var allNotes = NotesAPI.getNotes();

        const isInAllNotes = this.findNote(allNotes, noteToSave);

        if (isInAllNotes) { 
            // Updating values for the existing note
            isInAllNotes.title = noteToSave.title;
            isInAllNotes.content = noteToSave.content;
            isInAllNotes.timestamp = new Date().toISOString();
        }
        else { 
            // Setting an id for the new note
            noteToSave.id = Math.floor(Math.random() * 1000);
            noteToSave.timestamp = new Date().toISOString();

            // Adding the note to save to the array
            allNotes.push(noteToSave);
        }

        // Sorting the notes
        allNotes = this.sortNotes(allNotes);

        // Saving data to the local storage
        localStorage.setItem("Notes", JSON.stringify(allNotes));
    }

    static deleteNote(noteToDeleteId) { 
        // Getting all the current notes
        var allNotes = NotesAPI.getNotes();

        // Removing the note that has a matching id to another note
        allNotes = allNotes.filter(note => note.id != noteToDeleteId);

        // Sorting the notes
        allNotes = this.sortNotes(allNotes);

        // Saving data to the local storage
        localStorage.setItem("Notes", JSON.stringify(allNotes));
    }   

    static sortNotes(allNotes) { 
        // Sorting algorithm for the notes based on the date
        allNotes = allNotes.sort((noteA, noteB) => { 
            return new Date(noteA.timestamp) > new Date(noteB.timestamp) ? -1 : 1;
        });

        return allNotes;
    }

    static findNote(allNotes, noteToSave) { 
        const isInAllNotes = allNotes.find(note => note.id == noteToSave.id);

        return isInAllNotes;
    }
}

// Handles displaying the notes in the left side bar
class NotesDisplay { 
    // creating html elements to be drawn adjacent to the conatiner
    static drawNoteAsHTML(title, content, timestamp, id) { 
        const max_title_length = 35;
        const max_content_length = 43;

        return`
            <div class="drawnNote" data-note-id="${id}"> 
                <div class="drawnNote-title">${(title.length > max_title_length) ? `${title.substring(0, max_title_length)}...` : `${title.substring(0, max_title_length)}`}</div>
                <div class="drawnNote-content">${(content.length > max_content_length) ? `${content.substring(0, max_content_length)}...` : `${content.substring(0, max_content_length)}`}</div>
                <div class="drawnNote-timestamp">${new Date(timestamp).toLocaleString("en-CA", { dateStyle: "full", timeStyle: "short" })}</div>
            </div>
        `;
    }

    // function to draw out all the notes that we currently have
    static drawAllNotes() { 
        // TEMP Getting all notes
        const allNotes = NotesAPI.getNotes();

        // Getting the notes list container and emptying it
        const notesContainer = document.querySelector(".notes-list-container");
        notesContainer.innerHTML = "";

        // Drawing the notes to the note container
        allNotes.forEach(note => { 
            // Creating the HTML versions of the notes
            const drawnNoteAsHTML = this.drawNoteAsHTML(note.title, note.content, note.timestamp, note.id);

            // Inserting HTML of notes into the container
            notesContainer.insertAdjacentHTML("beforeend", drawnNoteAsHTML);
        });

        // Defaulting the active note to the first note in the list
        this.setActiveNote(allNotes[0]);

        // Adding event listeners to the notes
        const allNotesHTML = document.querySelectorAll(".drawnNote"); 

        allNotesHTML.forEach(note => { 
            ["click", "touchstart"].forEach(trigger => { 
                note.addEventListener(trigger, () => { 
                    this.onNoteSelect(note.dataset.noteId);
                });
            });
        });

        // Adding double click event listener to delete a specific note
        allNotesHTML.forEach(note => { 
            note.addEventListener("dblclick", (e) => { 
                const noteToDeleteTitle = e.target.parentElement.children[0];

                if (confirm(`Are you sure you would like to delete \"${noteToDeleteTitle.innerHTML}\"?`)) { 
                    this.onNoteDelete(note.dataset.noteId);
                }
            });
        });
    }

    static setActiveNote(selectedNote) { 
        // Getting all drawn notes
        const allNotesHTML = document.querySelectorAll(".drawnNote");

        // Getting the inputTitle and inputContent
        const inputTitle = document.querySelector(".main-bar-title-input");
        const inputContent = document.querySelector(".main-bar-content-input")

        // Returning all notes to unselected
        allNotesHTML.forEach(noteHTML => { 
            if (noteHTML.dataset.noteId != selectedNote.id) { 
                noteHTML.style.border = "4px solid rgba(255, 255, 255, 0.65)";
                noteHTML.style.background = "var(--preset-primary)";
            }
            else {
                noteHTML.style.border = "4px solid rgba(255, 255, 255, 0.9)";
                noteHTML.style.background = "var(--preset-quaternary)";
                inputTitle.value = selectedNote.title;
                inputContent.value = selectedNote.content;
                this.activeNote = selectedNote;
            }
        }); 
    }

    static onNoteSelect(noteId) { 
        // Getting list of notes
        const allNotes = NotesAPI.getNotes();

        // Finding the note object in the array
        const selectedNote = allNotes.find(note => note.id == noteId);

        // Setting the note object to become the active note
        this.setActiveNote(selectedNote);
    }

    static onNoteAdd() { 
        // Creates a new note object
        const note = {
            title: "", 
            content: ""
        };
        
        NotesAPI.saveNote(note);

        // Function to update the notes on the left-side-bar
        this.drawAllNotes(); 
    }

    static onNoteEdit(titleInputValue, contentInputValue) { 
        if (this.activeNote == undefined) { 
            alert("Hey, remember to create a new note before you start typing away!");
        }
        else { 
            const note = { 
                title: titleInputValue.trim(), 
                content: contentInputValue.trim(), 
                id: this.activeNote.id
            };
    
            NotesAPI.saveNote(note);
    
            this.drawAllNotes();
        }
    }

    static onNoteDelete(noteId) { 
        NotesAPI.deleteNote(noteId);

        // Function to update the notes on the left-side-bar
        this.drawAllNotes();
    }
}

const addNoteButton = document.querySelector(".add-note-button");
const titleInput = document.querySelector(".main-bar-title-input");
const contentInput = document.querySelector(".main-bar-content-input");

NotesDisplay.drawAllNotes();

["click", "touchstart"].forEach(trigger => { 
    addNoteButton.addEventListener(trigger, () => { 
        NotesDisplay.onNoteAdd();
    });
});

[titleInput, contentInput].forEach(inputField => { 
    inputField.addEventListener("blur", () => { 
        const titleInputValue = titleInput.value;
        const contentInputValue = contentInput.value;

        NotesDisplay.onNoteEdit(titleInputValue, contentInputValue);
    });
});
