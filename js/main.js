// JavaScript

// variables
const snareDrum = document.querySelector('#snareDrum');
const dropZone = document.querySelector('#dropZone');
let draggedPiece;

// functions

// handler for 'dragstart' event
function startedDragging() {
    console.log("dragstart called");
    draggedPiece = this;
}

// handler for 'dragover' event
function draggedOver(e) {
    console.log("dragover called");
    e.preventDefault();
}

// handler for 'drop' event
function dropped(e) {
    console.log("drop called");
    e.preventDefault();
    this.appendChild(draggedPiece);

    // special audio 'playAudio' function
    playAudio(draggedPiece.id, this);
}

// function to play audio
function playAudio(selectedInstrument, selectedDropZone) {
    console.log(selectedInstrument);
    let instrument = document.createElement('audio');
        instrument.src = `audio/${selectedInstrument}.wav`;
        instrument.load();
        selectedDropZone.appendChild(instrument);
        instrument.loop = true;
        instrument.play();
}

// event listeners
snareDrum.addEventListener('dragstart', startedDragging);
dropZone.addEventListener('dragover', draggedOver);
dropZone.addEventListener('drop', dropped);