// API constraints
const maxCharacters = 1000;
const url = 'http://api.voicerss.org/';
const apiKey = '78e777b9f676476d872795a69f6cb474';

// text-area error constraints
const tooLongError = 'Whoops, the text limit has been reached..(1000 characters MAX)';
const whitespaceError = 'Whoops, that looks a bit too empty to read..';

// build API key in string
const buildUrl = (str) => `${url}?key=${apiKey}&src=${str}&f=48khz_16bit_stereo`;

// text-area check for errors
const tooLong = (str) => str.lenght >= maxCharacters;
const emptyString = (str) => str.split('').every(_char => _char === ' ' || _char === '\n');

// assign id's
const playBtn = () => document.getElementById('play-btn');  
const textInput = () => document.getElementById('text-input');
const appContainer = () => document.getElementById('app-container');
const errorContainer = () => document.getElementById('error-msg');
const clearErrors = () => errorContainer().innerHTML = '';

// check for button
const listenerFn = ($event) => {
    if($event.target.value || $event.type === 'paste')
        playBtn().disabled = false;
    else
        playBtn().disabled = true;
};

// error messages appenden
const displayErrorMsg = (val) => {
    const errs = [];
    if(tooLong(val)) errs.push(tooLongError);
    if(emptyString(val)) errs.push(whitespaceError);
    errs.forEach(_err => {
        const div = document.createElement('div');
        div.innerText = _err;
        errorContainer().appendChild(div);
    });
};

// create audio with the text-input , else give error
playBtn().addEventListener('click', () => {
    clearErrors();

    if(!emptyString(textInput().value) && !tooLong(textInput().value)) {
        textInput().value = textInput().value.trim();
        new Audio(buildUrl(textInput().value)).play();
    }
    else
        displayErrorMsg(textInput().value);
});

// Listeners document load
document.addEventListener('DOMContentLoaded', () => {
    const containerHeight = appContainer().clientHeight;
    const docHeight = window.innerHeight;
    textInput().addEventListener('keyup', listenerFn);
    textInput().addEventListener('paste', listenerFn);  
});