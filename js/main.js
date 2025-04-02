const instruments = document.querySelectorAll('.instrument');
const dropSlots = document.querySelectorAll('.drop-slot');
const playButton = document.getElementById('play-button');
const stopButton = document.getElementById('stop-button');
const resetButton = document.getElementById('reset-button');

instruments.forEach(instrument => {
    instrument.addEventListener('dragstart', e => {
        e.dataTransfer.setData('id', instrument.id);
    });
});

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
            clonedInstrument.id = instrumentId + "-clone";
            clonedInstrument.draggable = false;
            slot.appendChild(clonedInstrument);
        }
    });
});

playButton.addEventListener('click', () => {
    document.querySelectorAll('.drop-slot .instrument audio').forEach(audio => {
        audio.currentTime = 0;
        audio.play();
    });
});

stopButton.addEventListener('click', () => {
    document.querySelectorAll('.drop-slot .instrument audio').forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
});

resetButton.addEventListener('click', () => {
    dropSlots.forEach(slot => {
        slot.innerHTML = '';
    });
});
