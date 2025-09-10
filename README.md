# Notes CLI 
This is a notes CLI, where you can create, read, update and delete notes - built using node.js

## Features
- Create notes with multi-word text
- Read and list notes with their unique ID
- Update / edit notes by ID
- Remove specific notes or clear all notes
- Colorful and readable CLI output using chalk

## Installation
Clone the repo:
```bash
git clone https://github.com/Benpsheppard/notes-cli.git
cd notes-cli
```

## Usage
- Run commands from your terminal
  
- Second lines show aliases you can use instead of the full command

### Add notes:
```bash
node app.js add "buy milk and eggs"
node app.js a "buy milk and eggs"
```
### List all notes:
```bash
node app.js list
node app.js ls
```
### Edit note by ID:
```bash
node app.js edit 165738910482 "buy milk, eggs and bread"
node app.js e 165738910482 "buy milk, eggs and bread"
```
### Remove note by ID:
```bash
node app.js remove 165738910482
node app.js rm 165738910482
```
### Clear all notes:
```bash
node app.js clear
node app.js cl
```

## Tech Stack
- Node.js
- Chalk for aesthetics

## Contributing
- Pull requests are welcome
- For major changes, please open an issue first to discuss your ideas. Thanks!

## License 
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
