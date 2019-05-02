import React, { Component } from 'react';

import TxtAreas from '../../components/TxtAreas/TxtAreas';
import Controls from '../../components/Controls/Controls';
import KeyAndAlgsList from '../../components/KeyAndAlgsList/KeyAndAlgsList';

let INPUT_TEXT = '';
let DECRYPT_STATE = true; // flag to specify which one to be showed encrypted / decrypted text...
let ENCRYPTING_KEY = '';

/* Start of data for DES Algorithm */
let LEFT_INPUT;
let RIGHT_INPUT;
let finalCipher;
const shiftTable = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];
let key = ENCRYPTING_KEY;
const PC_1 = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27,
    19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6,
    61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4]; // PC-1, 64-bit ------> 56-bit, 

const PC_2 = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16,
    7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53,
    46, 42, 50, 36, 29, 32]; // PC-2, 56-bit ------> 48-bit, 

const IP = [58, 50, 42, 34, 26, 18, 10, 2, 60, 52, 44, 36, 28, 20, 12, 4, 62, 54, 46, 38, 30, 22,
    14, 6, 64, 56, 48, 40, 32, 24, 16, 8, 57, 49, 41, 33, 25, 17, 9, 1, 59, 51, 43, 35, 27, 19, 11,
    3, 61, 53, 45, 37, 29, 21, 13, 5, 63, 55, 47, 39, 31, 23, 15, 7] //Intial permutation IP -------> 64-bit

const S_BOX_1 = [[14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
[0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
[4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],
[15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13]]

const S_BOX_2 = [[15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10],

[3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5],
[0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15],
[13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9]];

const S_BOX_3 = [[10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8],
[13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1],
[13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7],
[1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12]];

const S_BOX_4 = [[7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15],
[13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9],
[10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4],
[3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14]];

const S_BOX_5 = [[2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9],
[14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6],
[4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14],
[11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3]];

const S_BOX_6 = [[12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11],
[10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8],
[9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6],
[4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13]];

const S_BOX_7 = [[4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1],
[13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6],
[1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2],
[6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12]];

const S_BOX_8 = [[13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7],
[1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2],
[7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8],
[2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11]];

const all_sBox = [S_BOX_1, S_BOX_2, S_BOX_3, S_BOX_4, S_BOX_5, S_BOX_6, S_BOX_7, S_BOX_8];// 3D array that holds all sboxs 😱😱😱😱😱😱😱

const P__ = [16, 7, 20, 21, 29, 12, 28, 17, 1, 15, 23, 26, 5, 18, 31, 10, 2, 8, 24, 14, 32, 27, 3, 9, 19, 13, 30, 6, 22, 11, 4, 25]

const P_1 = [40, 8, 48, 16, 56, 24, 64, 32, 39, 7, 47, 15, 55, 23, 63, 31, 38, 6, 46, 14, 54, 22, 62, 30, 37, 5, 45, 13, 53, 21, 61,
    29, 36, 4, 44, 12, 52, 20, 60, 28, 35, 3, 43, 11, 51, 19, 59, 27, 34, 2, 42, 10, 50, 18, 58, 26, 33, 1, 41, 9, 49, 17, 57, 25]
/* End of data for DES Algorithm */

class EncryptAlgorithms extends Component {
    state = {
        encTxt: '',
        decTxt: '',
        algorithm: 'ceaser',
        doesShow: false,
        reset: false,
        disableEncryptBtn: true,
        disableDecryptBtn: true,
        disableResetBtn: true,
        showModal: false,
    }
    resetForWorngKey = () => {
        this.setState({
            encTxt: '',
            decTxt: 'The Encrypted text will appeare here!!',
        });
    }

    resethandler  ()  {
        console.log('from reste: ', this);
        INPUT_TEXT = ''
        this.setState({
            reset: true,
            disableEncryptBtn: true,
            disableDecryptBtn: true,
            disableResetBtn: true,
            encTxt: '',
            decTxt: 'The Encrypted text will appeare here!!',
        });
    }
    
    encryptingKeyHandler = (e) => {   // function to store each character in (this.state.inputText)
        ENCRYPTING_KEY = e.target.value;
        console.log('KEY: ', ENCRYPTING_KEY, 'isNoN: ', isNaN(ENCRYPTING_KEY));
    }

    handleSelectAlgChange = (e) => {
        this.setState({ algorithm: e.target.value });
        console.log('Selected Alorithm: ', e.target.value);
    }

    selectedEncryptAlgorithm = () => {
        if (!ENCRYPTING_KEY) {
            alert('Please enter a key!')
        }
        else {
            DECRYPT_STATE = false;
            this.setState({ doesShow: true });

            /* if the selected Algorithm is Ceaser */
            if (this.state.algorithm === 'ceaser') {
                ENCRYPTING_KEY = +ENCRYPTING_KEY;
                if (isNaN(ENCRYPTING_KEY)) {
                    this.resetForWorngKey();
                    alert('please enter a number in the key field!')
                }
                else {
                    let encryptedTxt = this.encryptingAlgorithm(INPUT_TEXT);
                    this.setState({ encTxt: encryptedTxt, disableDecryptBtn: false });
                }
            }
            /* if the selected Algorithm is playfair */
            else if (this.state.algorithm === 'playfair') {
                if (!isNaN(ENCRYPTING_KEY)) {
                    this.resetForWorngKey();
                    alert('please enter a word not a number in the key field!');
                }
                else {
                    this.playfairEncryptingAlg();
                }
            }
            /* if the selected Algorithm is DES */
            else if (this.state.algorithm === 'des') {
                if (!isNaN(ENCRYPTING_KEY)) {
                    this.resetForWorngKey();
                    alert('please enter a word not a number in the key field!');
                }
                if(ENCRYPTING_KEY.length !== 8){
                    alert('please enter a word of "EIGHT" characters!');
                    this.resetForWorngKey();
                }
                else {
                    this.DES_EncHandling();
                }
            }
        }
      this.setState({ showModal: true });
    }

    selectedDecryptAlgorithm = () => {
        if (!ENCRYPTING_KEY) {
            alert('Please enter a key!')
        }
        else {
            DECRYPT_STATE = true;
            this.setState({ doesShow: true });

            /* if the selected Algorithm is ceaser */
            if (this.state.algorithm === 'ceaser') {
                if (isNaN(ENCRYPTING_KEY)) {
                    alert('please enter a number in the key field')
                    this.resetForWorngKey();
                }
                else {
                    ENCRYPTING_KEY = +ENCRYPTING_KEY;
                    const decryptedTxt = this.decryptingAlgorithm(INPUT_TEXT);
                    this.setState({ decTxt: decryptedTxt });
                }
            }
            /* if the selected Algorithm is playfair */
            else if (this.state.algorithm === 'playfair') {
                if (!isNaN(ENCRYPTING_KEY)) {
                    alert('please enter a word not a number in the key field!');
                    this.resetForWorngKey();
                }
                else
                    this.playfairDecryptingAlg(INPUT_TEXT);
            }
            /* if the selected Algorithm is DES */
            else if (this.state.algorithm === 'des') {
                if (!isNaN(ENCRYPTING_KEY)) {
                    alert('please enter a word not a number in the key field!');
                    this.resetForWorngKey();
                }
                if(ENCRYPTING_KEY.length !== 8){
                    alert('please enter a word of "EIGHT" characters!');
                    this.resetForWorngKey();
                }
                else{
                    this.DES_DecHandling();
                }
            }
        }
        this.setState({ showModal: true });
    }
    // function to store each character in (this.state.inputText)
    changeHandler = (e) => {
        INPUT_TEXT = e.target.value;

        this.setState({
            disableEncryptBtn: INPUT_TEXT.length <= 0,
            disableResetBtn: INPUT_TEXT.length <= 0
        })
    }
    /* Start of encrypting algorithms methods */
    encryptingAlgorithm = (txt) => {    // function take a plain text and encrypt it with the key
        let arr = "";
        for (let i = 0; i < txt.length; i++) {
            let charCode = this.encryptingSingleChar(txt[i]); // looping for each char of th text and pass it to a function
            let char = String.fromCharCode(charCode); // this line take ASCII code and turn it back to a char
            arr += char;
        }
        console.log('encrypted text: ', arr)

        return arr;
    }
    encryptingSingleChar = (char) => {  // function take a single chracter and encrypt it with the key
        const currKeyCode = char.charCodeAt(0); //this line take a character "char" and turn it into ASCII code

        if (currKeyCode >= 97 && currKeyCode <= 122) { // checking for capital letters
            var newCharCode = currKeyCode + ENCRYPTING_KEY;
            if (newCharCode > 122) {
                newCharCode = (newCharCode - 122) + 96;
            }
        }
        else if (currKeyCode >= 65 && currKeyCode <= 90) { // checking for small letters
            newCharCode = currKeyCode + ENCRYPTING_KEY;
            if (newCharCode > 90) {
                newCharCode = (newCharCode - 90) + 64;
            }
        }
        else
            newCharCode = currKeyCode;

        return newCharCode;
    }
    /* End of encrypting algorithms methods */

    /* Start of decrypting algorithms methods */
    decryptingAlgorithm = (txt) => {    // function take a plain text and encrypt it with the key
        console.log('decrypted text: ', txt)
        let arr = "";
        for (let i = 0; i < txt.length; i++) {
            let charCode = this.decryptingSingleChar(txt[i]); // looping for each char of th text and pass it to a function
            let char = String.fromCharCode(charCode); // this line take ASCII code and turn it back to a char
            arr += char;
        }

        return arr;
    }
    decryptingSingleChar = (char) => {  // function take a single chracter and encrypt it with the key
        const currKeyCode = char.charCodeAt(0); //this line take a character "char" and turn it into ASCII code

        if (currKeyCode >= 97 && currKeyCode <= 122) { // checking for capital  letters
            var newCharCode = currKeyCode - ENCRYPTING_KEY;
            if (newCharCode < 97) {
                newCharCode = 122 - (96 - newCharCode);
            }
        }
        else if (currKeyCode >= 65 && currKeyCode <= 90) { // checking for capital letters
            newCharCode = currKeyCode - ENCRYPTING_KEY;
            if (newCharCode < 65) {
                newCharCode = 90 - (64 - newCharCode);
            }
        }
        else
            newCharCode = currKeyCode;

        return newCharCode;
    }
    /* End of decrypting algorithms methods */

    /* Start of playfair Algorithm------------------------------------- */
    /* start of playfair Encrypting algorithm */
    clearSpace = (aString) => {
        var splitString = "";
        for (var item in aString) {
            var letter = aString.charAt(item);

            // ignore whitespace and append to string
            if (letter.search(/\s|\W|\d/igm) === -1) {
                splitString += letter;
            }
        }
        return splitString;
    }
    fillMatrix = (userInput) => { // userInput is the input keyword
        var matrix = new Array(25);
        var matrixIndex = 0;
        var keyIndex = 0;
        var alphabet = "abcdefghijklmnopqrstuvwxyz";

        // strip whitespace
        userInput = this.clearSpace(userInput);
        userInput = userInput.toLowerCase();

        // Fill in the keyword into the matrix
        while (keyIndex < userInput.length) {
            var letter = userInput.charAt(keyIndex);
            if (matrix.indexOf(letter) === -1) { // if the letter isn't reapeated in the keywoed then add it to the matrix
                matrix[matrixIndex] = letter;
                matrixIndex++;
            }
            keyIndex++;
        }

        // Insert unique letters from the alphabet
        for (var item in alphabet) {
            var literal = alphabet.charAt(item);
            //check both uppercase and lowercase letters
            var letterNotInMatrix = (matrix.indexOf(literal) + matrix.indexOf(literal.toUpperCase()) === -2);
            // if the letter is not in the matrix (-1 + -1 = -2) then letterNotInMatrix is TRUE...
            if (letterNotInMatrix) {
                // Skip i or j if already in matrix
                if ((literal === "i" || literal === "I") && (matrix.indexOf("j") === -1 && matrix.indexOf("J") === -1)) {
                    matrix[matrixIndex] = literal;
                    matrixIndex++;
                }
                // if the letter in turns is j/J and the letter i/I is already in the matrix, then skip this letter...
                else if ((literal === "j" || literal === "J") && (matrix.indexOf("i") === -1 && matrix.indexOf("I") === -1)) { /* do nothing */ }

                else { // if any letter else ecept i/j and not in the matrix add it to the matrix...
                    matrix[matrixIndex] = literal;
                    matrixIndex++;
                }
            }
        }
        return matrix;
    }
    getDigrams = (aString) => { // divide the plaintext into blocks each block is two letters...
        var count = 0;
        var input = aString.toLowerCase();
        var tempDigram = "";
        var textLength = input.length;
        var digramLength;
        var letter;
        var array = [];

        while (count < input.length) {
            digramLength = tempDigram.length;
            letter = input.charAt(count);
            if (digramLength === 0) { // if 'tempDigram' is empty 
                tempDigram += letter;
            }
            else if (digramLength === 1) { /* if 'tempDigram' aleady has letter, then we will
         check the latter one if it is the same as first one */
                var str = tempDigram.charAt(0);
                if (str === letter) { // if the two letters are the same (cc / mm / dd / ee / ...) -> cx / mx / dx / ...
                    tempDigram += "x";
                    array.push(tempDigram);
                    tempDigram = "";
                    count--; // stay at the current char and add additional x to the first one of the repeated letter
                }
                else { // the letters are not the same 
                    tempDigram += letter;
                    array.push(tempDigram);
                    tempDigram = ""; // we clear 'tempDigram' after pushing it into the 'array' 
                }
            }

            // check odd ending
            if (textLength % 2 !== 0 && count === input.length - 1
                && tempDigram.length % 2 !== 0) {
                tempDigram += "x";
                array.push(tempDigram);
            }
            // check odd letters
            else if (count === input.length - 1 && tempDigram.length !== 0) {
                tempDigram = letter + "x";
                array.push(tempDigram);
            }
            count++;
        }
        return array;
    }
    playfairEncryptingAlg = () => {
        var matrix = this.fillMatrix(ENCRYPTING_KEY);
        var plainTxt = this.clearSpace(INPUT_TEXT);
        var digrams = this.getDigrams(plainTxt); // call 
        var encryptedArray = [];
        var tempString = "";
        var letter1;
        var letter2;
        var letterPosition1;
        var letterPosition2;
        var difference;
        var mod5Result;
        var min;
        var max;

        if (plainTxt === "") {
            alert("Please input a text to be encrypted.");
        }
        else {
            for (var i = 0; i < digrams.length; i++) {

                letter1 = digrams[i][0];
                letter2 = digrams[i][1];
                // replace j with i
                if (letter1 === "j") {
                    letter1 = "i"
                }
                else if (letter2 === "j") {
                    letter2 = "i";
                }
                letterPosition1 = matrix.indexOf(letter1);
                letterPosition2 = matrix.indexOf(letter2);
                min = Math.min(letterPosition1, letterPosition2);
                max = Math.max(letterPosition1, letterPosition2);
                var minDistanceFromEdge = min % 5;
                var maxDistanceFromEdge = max % 5;
                difference = Math.abs(letterPosition1 - letterPosition2);
                mod5Result = difference % 5;
                // if in the same column
                if (mod5Result === 0) {
                    if (letterPosition1 >= 20) { // If at the bottom of column
                        tempString += matrix[letterPosition1 - 20]; // go up
                        tempString += matrix[letterPosition2 + 5]; // choose element below
                    }
                    else if (letterPosition2 >= 20) {
                        tempString += matrix[letterPosition1 + 5];
                        tempString += matrix[letterPosition2 - 20];
                    }
                    else {
                        tempString += matrix[letterPosition1 + 5];
                        tempString += matrix[letterPosition2 + 5];
                    }
                }
                // if in the same row
                else if (difference <= 4 && maxDistanceFromEdge > minDistanceFromEdge) {
                    //further verification (diagonal check)
                    if (difference === 4) {

                        if (((max + 1) % 5) === 0) {

                            if (((letterPosition1 + 1) % 5) === 0) {
                                tempString += matrix[letterPosition1 - 4];
                                tempString += matrix[letterPosition2 + 1];
                            }
                            else if (((letterPosition2 + 1) % 5) === 0) {
                                tempString += matrix[letterPosition1 + 1];
                                tempString += matrix[letterPosition2 - 4];
                            }
                        }
                    }
                    else {

                        if ((letterPosition1 + 1) % 5 === 0) {
                            tempString += matrix[letterPosition1 - 4];
                            tempString += matrix[letterPosition2 + 1];
                        }
                        else if ((letterPosition2 + 1) % 5 === 0) {
                            tempString += matrix[letterPosition1 + 1];
                            tempString += matrix[letterPosition2 - 4];
                        }
                        else {
                            tempString += matrix[letterPosition1 + 1];
                            tempString += matrix[letterPosition2 + 1];
                        }
                    }
                }

                // diagonal part
                else {
                    var counter = min;
                    var rowD = 0;
                    // if at the edge of matrix
                    if ((min + 1) % 5 === 0 || minDistanceFromEdge > maxDistanceFromEdge) {
                        /* loop till the desired column is reached */
                        while (Math.abs(counter - max) % 5 !== 0) { counter--; rowD--; }
                    }
                    else {
                        /* loop till the desired column is reached */
                        while (Math.abs(counter - max) % 5 !== 0) { counter++; rowD++; }
                    }
                    if (letterPosition1 === min) {
                        tempString += matrix[letterPosition1 + rowD];
                        tempString += matrix[letterPosition2 - rowD];
                    }
                    else {
                        tempString += matrix[letterPosition1 - rowD];
                        tempString += matrix[letterPosition2 + rowD];
                    }
                }
                encryptedArray.push(tempString);
                tempString = "";
            }
            let encryptedTxt = encryptedArray.toString().replace(/,/ig, "");
            console.log('INPUT_TEXT', encryptedTxt)
            this.setState({ encTxt: encryptedTxt, disableDecryptBtn: false });
        }
    }
    /* End of playfair Encrypting algorithm */

    /* Start of playfair Decrypting algorithm */
    playfairDecryptingAlg = (txt) => {
        var matrix = this.fillMatrix(ENCRYPTING_KEY);
        var cipherTxt = this.clearSpace(txt);
        var digrams = this.getDigrams(cipherTxt); // call 
        var decryptedArray = [];
        var tempString = "";
        var letter1;
        var letter2;
        var letterPosition1;
        var letterPosition2;
        var difference;
        var mod5Result;
        var min;
        var max;

        if (cipherTxt === "") {
            alert("Please input a text to be decrypted.")
        }
        else {

            for (var i = 0; i < digrams.length; i++) {

                letter1 = digrams[i][0];
                letter2 = digrams[i][1];

                letterPosition1 = matrix.indexOf(letter1);
                letterPosition2 = matrix.indexOf(letter2);
                min = Math.min(letterPosition1, letterPosition2);
                max = Math.max(letterPosition1, letterPosition2);
                var minDistanceFromEdge = min % 5;
                var maxDistanceFromEdge = max % 5;
                difference = Math.abs(letterPosition1 - letterPosition2);
                mod5Result = difference % 5;

                // if in the same column
                if (mod5Result === 0) {

                    if (letterPosition1 <= 4) { // If at the top of the column
                        tempString += matrix[letterPosition1 + 20]; // go down
                        tempString += matrix[letterPosition2 - 5]; // choose element above
                    }
                    else if (letterPosition2 <= 4) {
                        tempString += matrix[letterPosition1 - 5];
                        tempString += matrix[letterPosition2 + 20];
                    }
                    else {
                        tempString += matrix[letterPosition1 - 5];
                        tempString += matrix[letterPosition2 - 5];
                    }
                }
                // if in the same row
                else if (difference <= 4 && maxDistanceFromEdge > minDistanceFromEdge) {

                    //further verification (diagonal check)
                    if (difference === 4) {

                        if (((max + 1) % 5) === 0) {

                            if (((letterPosition1 + 1) % 5) === 0) {
                                tempString += matrix[letterPosition1 - 1];
                                tempString += matrix[letterPosition2 + 4];
                            }
                            else if (((letterPosition2 + 1) % 5) === 0) {
                                tempString += matrix[letterPosition1 + 4];
                                tempString += matrix[letterPosition2 - 1];
                            }
                        }
                    }
                    else {

                        if ((letterPosition1 + 1) % 5 === 0) {
                            tempString += matrix[letterPosition1 - 1];
                            tempString += matrix[letterPosition2 - 1];
                        }
                        else if ((letterPosition2 + 1) % 5 === 0) {
                            tempString += matrix[letterPosition1 - 1];
                            tempString += matrix[letterPosition2 - 1];
                        }
                        else if (letterPosition1 % 5 === 0) {
                            tempString += matrix[letterPosition1 + 4];
                            tempString += matrix[letterPosition2 - 1];
                        }
                        else if (letterPosition2 % 5 === 0) {
                            tempString += matrix[letterPosition1 - 1];
                            tempString += matrix[letterPosition2 + 4];
                        }
                        else {
                            tempString += matrix[letterPosition1 - 1];
                            tempString += matrix[letterPosition2 - 1];
                        }
                    }
                }

                // diagonal part
                else {

                    var counter = min;
                    var rowD = 0;


                    // if at the edge of matrix
                    if ((min + 1) % 5 === 0 || minDistanceFromEdge > maxDistanceFromEdge) {
                        /* loop till the desired column is reached */
                        while (Math.abs(counter - max) % 5 !== 0) { counter--; rowD--; }
                    }
                    else {
                        /* loop till the desired column is reached */
                        while (Math.abs(counter - max) % 5 !== 0) { counter++; rowD++; }
                    }

                    if (letterPosition1 === min) {
                        tempString += matrix[letterPosition1 + rowD];
                        tempString += matrix[letterPosition2 - rowD];
                    }
                    else {
                        tempString += matrix[letterPosition1 - rowD];
                        tempString += matrix[letterPosition2 + rowD];
                    }
                }
                decryptedArray.push(tempString);
                tempString = "";
            }
        }

        let decryptedTxt = decryptedArray.toString().replace(/,/ig, '');
        this.setState({ decTxt: decryptedTxt });
        console.log('this.state.decTxt: ', decryptedTxt)

    }
    /* End of playfair Decrypting Algorithm */
    /* End of playfair Algorithm------------------------------------- */


    /* Start of DES Algorithm --------------------------------------------------------------------*/
    receiveChar = (txt) => {
        let element = '';
        let arr = [];
        while (txt.length % 8 !== 0) {
            txt += ' ';
        }
        for (let i = 1; i <= txt.length; i++) {
            element += txt[i - 1];
            if (i % 8 === 0) {
                arr.push(element);
                element = '';
            }
        }
        return arr;
    }
    // 
    workOnEightChars = (chars) => {
        let charsInBin = '';
        let char_ASCII;
        let char_Binary;
        for (let i = 0; i < 8; i++) {
            char_ASCII = chars.charCodeAt(i);
            char_Binary = char_ASCII.toString(2);
            while (char_Binary.length < 8) {
                char_Binary = '0' + char_Binary;
            }
            charsInBin = charsInBin + char_Binary;
        }
        return charsInBin;
    }
    permutation = (bitsToPermuted, PC_X) => { // fun(1) ... for first and second key permutation...
        //     let permutedKey = PC_X.map((elem) => {
        //     return permutedKey += bitsToPermuted[elem - 1] // concatenating...
        // })
        console.log('bitsToPermuted: ', bitsToPermuted)
        let permutedBits = ''
        for(let i=0; i<PC_X.length; i++) {
        let index = PC_X[i] - 1;
        permutedBits += bitsToPermuted[index];
        }
        console.log('permutedBits: ', permutedBits)
        return permutedBits;
    }
    divider = (dataToDivided) => { // fun(2) ... for dividing the key to tow parts right and left... __Edited__
        let leftHalf = '';
        let rightHalf = '';
        let j = 0;
        let half = dataToDivided.length / 2;
        j = half;
        for (let i = 0; i < half, j < dataToDivided.length; i++ , j++) {
            leftHalf += dataToDivided[i];
            rightHalf += dataToDivided[j];
        }
        return [leftHalf, rightHalf];
    }
    circularShiftLeft = (arr) => { // fun(3)
        let newArr = '';
        for (let i = 1; i < arr.length; i++) {
            newArr += arr[i];
        }
        newArr += arr[0];
        return newArr;
    }
    /* key generation function */
    keyOperations = () => { // fun(4)      __Edited__
        let rightSubKeys = []; // array to hold 16 right subkeys
        let leftSubKeys = []; // array to hold 16 left subkeys
        let entireKey = []; // array to hold 16 keys (concatenation of left and right)
        let finalEntireKey = [];
        let keyInBin = this.workOnEightChars(key); // conver 8 chars to binary (64-bit)
        let permutedKey = this.permutation(keyInBin, PC_1); // first permutation of the key
        let leftKey = this.divider(permutedKey)[0];
        let rightKey = this.divider(permutedKey)[1];
        // add all subkeys to one array (left, right), 'elem' value of each element in shiftTable
        shiftTable.forEach((elem) => {
            for (let i = 0; i < elem; i++) {
                leftKey = this.circularShiftLeft(leftKey); // apply shift for each subkey to produce 16 keys
                rightKey = this.circularShiftLeft(rightKey);
            }
            leftSubKeys.push(leftKey);
            rightSubKeys.push(rightKey);
        })
        for (let i = 0; i < leftSubKeys.length; i++) { // concate right subkeys and left subkeys into one array 'entireKey'.
            const keyCouples = leftSubKeys[i] + rightSubKeys[i];
            entireKey[i] = keyCouples;

        }
        for (let i = 0; i < entireKey.length; i++) { // Applying the second permution ... PC_2
            let permutedKey = this.permutation(entireKey[i], PC_2);
            finalEntireKey.push(permutedKey); // 48-bit
        }
        return finalEntireKey;
    }
    /* End of subkeys generation */

    /* Start of Input operations ------------------------------ */
    /* Start of f manglet function */
    expansion = (inputRight) => {
        let i = 0; // index for outer for loop
        let j = 0; // index for inner for loop  
        let count = 0; // to count from 0 to 31 of right input...
        let expandedBlock = ''; // variable to hold 6-bit blocks of the expanded input 
        let expandedInput = []; // array to hold the entire expanded input

        for (i = 0; i < 8; i++) {
            /* store last bit from the previous block of 4-bit blocks to the next block of 6-bit blocks,
            - 4-bit blocks --> input before expanding   R0 = 1111 0000 1010 1010 1111 0000 1010 1010 
            - 6-bit blocks --> input after expanding E(R0) = 011110 100001 010101 010101 011110 100001 010101 010101 */
            let preBit = (count + 31) % 32; // 0+31 % 32 = 31 %32 = 31
            expandedBlock += inputRight[preBit]
            for (j = 0; j < 4; j++ , count++) {
                expandedBlock += inputRight[count];
            }
            expandedBlock += inputRight[(count + 32) % 32];
            expandedInput.push(expandedBlock);
            expandedBlock = '';
        }
        expandedInput = expandedInput.toString().replace(/,/ig, '');
        return expandedInput;
    }

    XOR = (firstOperand = '1100', secondOperand = '0011') => {
        let xoredData = []; // ^
        for (let i = 0; i < firstOperand.length; i++) {
            if (firstOperand[i] === secondOperand[i]) {
                xoredData[i] = '0';
            }
            else
                xoredData[i] = '1';
        }
        xoredData = xoredData.toString().replace(/,/ig, '');
        return xoredData;
    }
    // fun used to divide result of XOR of expanded input(48-bit) and key(48-bit) into eight 6bit-blocks(48-bit)
    sixBitBlocks = (data) => {
        let block = '';
        let blocks = [];
        for (let i = 1; i <= data.length; i++) { // 1 --> 6
            block += data[i - 1];
            if (i % 6 === 0) {
                blocks.push(block);
                block = '';
            }
        }
        return blocks;
    }
    sBoxOperations = (blocks) => { // apply all operations of s-box... from 48-bit to 32-bit 
        const sBoxSelection = [];
        let row = '';
        let col = '';
        let fourBitsBlock;
        let length;
        for (let i = 0; i < 8; i++) { // 100101 -> row = 11=3 , col = 0010 = 2
            row = blocks[i][0] + blocks[i][5];
            col = blocks[i][1] + blocks[i][2] + blocks[i][3] + blocks[i][4];
            row = parseInt(row, 2);
            col = parseInt(col, 2);
            fourBitsBlock = all_sBox[i][row][col];
            fourBitsBlock = fourBitsBlock.toString(2); // convert integer to string of bits...
            length = fourBitsBlock.length;
            for (; length < 4; length++) { // 3 -> 11 -> 0011
                fourBitsBlock = '0' + fourBitsBlock;
            }
            sBoxSelection.push(fourBitsBlock);
        }
        return sBoxSelection;
    }
    // mangler  function in DES
    manglerFun = (inputRight, kIndex) => {
        const expandedInput = this.expansion(inputRight); // 32 --> 48
        const finalEntireKey = this.keyOperations();
        const exInputXORKey = this.XOR(expandedInput, finalEntireKey[kIndex]);

        // start of s-box functions ----------
        let blocks = this.sixBitBlocks(exInputXORKey); // get eight 6bit-blocks 
        let fourBitBlocks = this.sBoxOperations(blocks); // get eight 4bit-blocks from get eight 6bit-blocks 
        fourBitBlocks = fourBitBlocks.toString().replace(/,/ig, '');
        // End of s-box functions -----------

        const p = this.permutation(fourBitBlocks, P__);// applying 'P__' permutation on s-box output, and that's last operation in 'mangler function'
        return p;
    }
    // Main function for operations applied to input -----------------------------------------//
    DES_Encryption = (eightChars) => {
        // Start functions that are DONE only one time---- 
        const sixtyFourBits = this.workOnEightChars(eightChars); // convert 8 chars to binary (64-bit)
            console.log('[DES_Encryption] - sixtyFourBits', sixtyFourBits);
            const intitPermutation = this.permutation(sixtyFourBits, IP);
            console.log('[DES_Encryption] - intitPermutation', intitPermutation);

        LEFT_INPUT = this.divider(intitPermutation)[0];
        RIGHT_INPUT = this.divider(intitPermutation)[1];
        // End functions that are DONE only one time---- 

        let manglerFunOut; // functions that applied for 16 rounds 
        let tempRightInput;
        for (let i = 0; i < 16; i++) {
            manglerFunOut = this.manglerFun(RIGHT_INPUT, i);
            tempRightInput = RIGHT_INPUT;
            RIGHT_INPUT = this.XOR(manglerFunOut, LEFT_INPUT);
            LEFT_INPUT = tempRightInput;
        }
        // We reverse the order of these two blocks and apply the final permutation(P_) //
        const cipherTxt = RIGHT_INPUT + LEFT_INPUT;
        finalCipher = this.permutation(cipherTxt, P_1);

        let element = '';
        let eightEncChars = ''; // used to hold the eight encrypted characters
        for (let i = 1; i <= finalCipher.length; i++) {
            element += finalCipher[i - 1];
            if (i % 8 === 0) {
                element = parseInt(element, 2);
                eightEncChars += String.fromCharCode(element);
                element = '';
            }
        }
        return eightEncChars;
    }
    DES_Decryption = (elem) => {
        // let finalCipher = DESEncryption(elem);
        let tempRightInput;
        let finalCipher = this.workOnEightChars(elem);
        console.log('___________________________limit between Enc and Dec____________________________');
        // Start functions that are DONE only one time---- 
        const intitPermutation = this.permutation(finalCipher, IP);
        LEFT_INPUT = this.divider(intitPermutation)[0];
        RIGHT_INPUT = this.divider(intitPermutation)[1];
        // End functions that are DONE only one time---- 

        let manglerFunOut;
        for (let i = 15; i >= 0; i--) {
            manglerFunOut = this.manglerFun(RIGHT_INPUT, i);
            tempRightInput = RIGHT_INPUT;
            RIGHT_INPUT = this.XOR(manglerFunOut, LEFT_INPUT);
            LEFT_INPUT = tempRightInput;
        }
        const plainTxt = RIGHT_INPUT + LEFT_INPUT; // We reverse the order of these two blocks and apply the final permutation(P_)
        const finalPlainTxt = this.permutation(plainTxt, P_1);

        let element = '';
        let chars = '';
        let arr = [];
        for (let i = 1; i <= finalPlainTxt.length; i++) {
            element += finalPlainTxt[i - 1];
            if (i % 8 === 0) {
                arr.push(element);
                element = parseInt(element, 2);
                chars += String.fromCharCode(element);
                element = '';
            }
        }
        return chars;
    }
    DES_EncHandling = () => {
        let entireCipherTxt = ''; // used to hold the entire cipher text
        let inputBlocks = this.receiveChar(INPUT_TEXT);
        console.log('input blocks:', inputBlocks);

        for (let block of inputBlocks) {
            console.log('[DES_EncHandling] - inputBlock: ', block);
            entireCipherTxt += this.DES_Encryption(block);
        }
        this.setState({ encTxt: entireCipherTxt })
        console.log('');
        console.log('___FINAL___:', entireCipherTxt);
        console.log('____________________________Rayyan_________________________');
    }
    DES_DecHandling = () => {
        let arr = '';
        let inputBlocks = this.receiveChar(INPUT_TEXT);
        
        console.log('input blocks:', inputBlocks);
        for (const block of inputBlocks) {
            arr += this.DES_Decryption(block);
        }

        this.setState({ decTxt: arr })
        console.log('');
        console.log('___FINAL___:', arr);
        console.log('____________________________Rayyan_________________________');
    }
    /* End of DES Algorithm ----------------------------------------------------------*/

    closeModalhandler =() => {
        this.setState({ showModal: false })
    }
    render() {
        let passedTxt = this.state.encTxt;
        if (DECRYPT_STATE) {
            passedTxt = this.state.decTxt;
        }

        return (
            <div className='container p-3' style={{backgroundColor: '#053a66'}}>
                <TxtAreas
                    doesReset={this.state.reset}
                    inputTxt={INPUT_TEXT}
                    encryptedTxt={passedTxt} // pass the encrypted / decrypted text to be veiwed in 'textarea'
                    doesShow={this.state.doesShow}
                    change={this.changeHandler} />

                    <KeyAndAlgsList 
                        handler={this.handleSelectAlgChange}
                        submit={this.submitHandler}
                        alg={this.state.algorithm}
                        // props for the key
                        keyHandler={this.encryptingKeyHandler}
                        clearKey={this.state.clearKey}
                    />

                <Controls
                    encTxt={this.selectedEncryptAlgorithm} // method for handling Encrypting event
                    decTxt={this.selectedDecryptAlgorithm} // method for handling Decrypting event
                    disableEnc={this.state.disableEncryptBtn}
                    disableDec={this.state.disableDecryptBtn}
                    disableReset={this.state.disableResetBtn}
                    reset={this.resethandler.bind(this)}
                    showModal={this.state.showModal}
                    closeModal={this.closeModalhandler}
                    encryptedTxt={passedTxt} />
            </div>
        )
    }
}

export default EncryptAlgorithms;