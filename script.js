// script.js

// Elements
const textInput = document.getElementById('text-input');
const voiceSelect = document.getElementById('voice-select');
const speakBtn = document.getElementById('speak-btn');

// Initialize Speech Synthesis
const synth = window.speechSynthesis;
let voices = [];

// Function to populate voices
function populateVoices() {
    voices = synth.getVoices();
    voiceSelect.innerHTML = '';
    voices.forEach(voice => {
        const option = document.createElement('option');
        option.textContent = `${voice.name} (${voice.lang})`;
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    });
}

// Populate voices when they are loaded
populateVoices();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoices;
}

// Function to speak
function speak() {
    if (textInput.value !== '') {
        const speakText = new SpeechSynthesisUtterance(textInput.value);
        const selectedVoiceName = voiceSelect.selectedOptions[0].getAttribute('data-name');
        speakText.voice = voices.find(voice => voice.name === selectedVoiceName);
        speakText.rate = 1;
        speakText.pitch = 1;
        synth.speak(speakText);
    }
}

// Event Listeners
speakBtn.addEventListener('click', speak);
