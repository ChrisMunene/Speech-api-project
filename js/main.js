const synth = window.speechSynthesis;

const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector("#voice-select");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");
const body = document.querySelector("body");

let voices = [];

const getVoices = () => {
    voices = synth.getVoices();
    console.log(voices);

    // Loop through voices and create option per voice
    voices.forEach(voice => {
        // create option
        const option = document.createElement('option');
        // Fill option with voice and language
        option.textContent = voice.name + '('+voice.lang + ')';

        // Set option attributes
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);

        // Append to select in html
        voiceSelect.appendChild(option);
    });
}

getVoices();

if (synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged = getVoices;
}

//Speak

const speak = () => {   

    if (synth.speaking){
        console.log("Talking....");
        return;
    }
    if(textInput.value){
        // add Animation
        body.style.background = '#141414 url(img/wave.gif)';
        body.style.backgroundRepeat = 'repeat-x';
        body.style.backgroundSize = '100% 100%'

        const speech = new SpeechSynthesisUtterance(textInput.value);

        speech.onend = e => {
            console.log('Done Talking...');
            body.style.background = '#141414';
        }

        speech.onerror = e => {
            console.log('Something went wrong :(');
        }

        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

        voices.forEach(voice => {
            if(voice.name == selectedVoice){
                speech.voice = voice;                
            }
        });

        speech.rate = rate.value;
        speech.pitch = pitch.value;

        synth.speak(speech);
    }
};

textForm.addEventListener('submit', event => {
    event.preventDefault();
    speak();
    textInput.blur();
});

rate.addEventListener('change', e => rateValue.textContent = rate.value);
pitch.addEventListener('change', e=> pitchValue.textContent = pitch.value);

voiceSelect.addEventListener('change', e => speak());