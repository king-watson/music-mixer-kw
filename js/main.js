const instruments = document.querySelectorAll('.instrument');
const dropSlots = document.querySelectorAll('.drop-slot');
const playButton = document.getElementById('play-button');
const stopButton = document.getElementById('stop-button');
const resetButton = document.getElementById('reset-button');

// Dragging functionality
instruments.forEach(instrument => {
    instrument.addEventListener('dragstart', e => {
        e.dataTransfer.setData('id', instrument.id);
    });
});

// Drag over & drop functionality
dropSlots.forEach(slot => {
    slot.addEventListener('dragover', e => {
        e.preventDefault();
        slot.classList.add('over');
    });

    slot.addEventListener('dragleave', () => {
        slot.classList.remove('over');
    });

    slot.addEventListener('drop', e => {
        e.preventDefault();
        slot.classList.remove('over');

        const instrumentId = e.dataTransfer.getData('id');
        const instrument = document.getElementById(instrumentId);

        if (!slot.hasChildNodes()) {
            const clonedInstrument = instrument.cloneNode(true);
            clonedInstrument.id = instrumentId + "-clone"; // Avoid duplicate IDs
            clonedInstrument.draggable = false;
            slot.appendChild(clonedInstrument);
        }
    });
});

// Play all sounds
playButton.addEventListener('click', () => {
    document.querySelectorAll('.drop-slot .instrument audio').forEach(audio => {
        audio.currentTime = 0;
        audio.play();
    });
});

// Stop all sounds
stopButton.addEventListener('click', () => {
    document.querySelectorAll('.drop-slot .instrument audio').forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
});

// Reset the stage
resetButton.addEventListener('click', () => {
    dropSlots.forEach(slot => {
        slot.innerHTML = '';
    });
});
