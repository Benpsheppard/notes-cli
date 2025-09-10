import fs from 'fs';
import path from 'path';
import url from 'url';
import chalk from 'chalk';

// Chalk styling
const success = chalk.bold.green;
const error = chalk.bold.red;
const info = chalk.bold.blue;
const warning = chalk.bold.hex('#FFA500');
const idText = chalk.bold.yellow

// Get current path
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'notes.json');
console.log(filePath);

// Function to read a file
function readNotesFile() {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        console.log(success('File read successfully'));
        return JSON.parse(data);
    } catch (err) {
        console.error(err);
        if (err.code === 'ENOENT') {
            console.log(error('File not found'));
            return [];
        }
    }
}

// Function to write to file
function writeToNotesFile(notes){
    try {
        fs.writeFileSync(filePath, JSON.stringify(notes, null, 2));
        console.log(success('File written successfully'));
    } catch (err) {
        console.error(err);
    }
}

// Function to add a note
function addNote(text){
    const notes = readNotesFile();
    const id = Date.now();
    notes.push({ text, id });
    writeToNotesFile(notes);
    console.log(info(`Note ${idText(id)} added`));
}

// Function to list all notes in file
function listNotes() {
    try {
        const notes = readNotesFile();
        const noteCount = notes.length;
        console.log(`##### You have ${noteCount} notes: #####`);
        if (notes.length === 0) {
            console.log(warning('No notes found'));
            console.log('#############################');
            return;
        }
        notes.forEach(note => {
            console.log(`  - ${idText(note.id)}: ${note.text}`);
        });
        console.log('#############################');
    } catch (err) {
        console.error(error(err));
    }
}

// Function to clear all notes
function clearNotes() {
    writeToNotesFile([]);
    console.log(success('All notes cleared'));
}

// Function to remove note by ID
function removeNoteById(id) {
    const notes = readNotesFile();
    const filteredNotes = notes.filter(note => note.id !== id);
    if (notes.length === filteredNotes.length) {
        console.log(warning(`No note found with ID ${idText(id)}`));
        return;
    }
    writeToNotesFile(filteredNotes);
    console.log(info(`Note ${idText(id)} removed`));
    console.log(info(`You have ${filteredNotes.length} notes left`));
}

// Function to edit note by ID
function editNoteById(id, newText) {
    const notes = readNotesFile();
    const noteIndex = notes.findIndex(note => note.id === id);
    if (noteIndex === -1) {
        console.log(warning(`No note found with ID ${idText(id)}`));
        return;
    }
    notes[noteIndex].text = newText;
    writeToNotesFile(notes);
    console.log(info(`Note ${idText(id)} updated`));
}

// Command line arguments
const args = process.argv.slice(2); // Skip first two args (node and script path)
const command = args[0]; 
const commandArg = args[1];

switch (command) {
    case 'a':
    case 'add':
        const noteText = args.slice(1).join(' ');
        if (!noteText) {
            console.log(warning('Please provide note text'));
            break;
        }
        addNote(noteText);
        break;
    case 'e':
    case 'edit':
        if (!commandArg) {
            console.log(warning('Please provide note ID to edit'));
            break;
        }
        const editId = parseInt(commandArg, 10);
        if (isNaN(editId)) {
            console.log(warning('Please provide a valid numeric ID'));
            break;
        }
        const newText = args.slice(2).join(' ');
        if (!newText) {
            console.log(warning('Please provide new text for the note'));
            break;
        }
        editNoteById(editId, newText);
        break;
    case 'ls':
    case 'list':
        listNotes();
        break;
    case 'cl':
    case 'clear':
        clearNotes();
        break;
    case 'rm':
    case 'remove':
        if (!commandArg) {
            console.log(warning('Please provide note ID to remove'));
            break;
        }
        const id = parseInt(commandArg, 10);
        if (isNaN(id)) {
            console.log(warning('Please provide a valid numeric ID'));
            break;
        } 
        removeNoteById(id);
        break;
    default:
        console.log(warning('Unknown command. Use add, list, clear, or remove.'));
        break;
}    
