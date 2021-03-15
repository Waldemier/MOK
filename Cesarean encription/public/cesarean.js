let english = [
    'A', 'B', 'C', 'D', 'E', 'F',
    'G', 'H', 'I', 'J', 'K', 'L',
    'M', 'N', 'O', 'P', 'Q', 'R',
    'S', 'T', 'U', 'V', 'W', 'X',
    'Y', 'Z'
  ]

let ukraine = [
    'А', 'Б', 'В', 'Г', 'Ґ', 'Д', 
    'Е', 'Є', 'Ж', 'З', 'И', 'І',
    'Ї', 'Й', 'К', 'Л', 'М', 'Н',
    'О', 'П', 'Р', 'С', 'Т', 'У', 
    'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 
    'Ь', 'Ю', 'Я'
]

class CesareanEncryption {

    constructor() {}

    encryption (content, key, alphabet = 'eng') {

        if(alphabet === 'ukr') alphabet = ukraine;
        if(alphabet === 'eng') alphabet = english;
        
        key = this.keyValidation(key, alphabet)

        const registerLetters = this.saveRegisterMethod(content.split(''));
        content = content.toUpperCase().split('');

        for (let contentLetterIndex in content) {
            for(let alphabeticLetterIndx = 0; alphabeticLetterIndx < alphabet.length; alphabeticLetterIndx++) {
    
                const step = alphabeticLetterIndx-key
    
                if(content[contentLetterIndex] === alphabet[alphabeticLetterIndx]) {
    
                    step >= 0 ? 
                        content[contentLetterIndex] = alphabet[alphabeticLetterIndx-key] 
                    :
                        content[contentLetterIndex] = alphabet[alphabet.length + (alphabeticLetterIndx-key)]
    
                    break;
    
                }
            }
        }
        content = this.registerUpdate(content, registerLetters);
        return content.join('');
    }


    decryption (encription_content, key, alphabet = 'eng') {

        if(alphabet === 'ukr') alphabet = ukraine;
        if(alphabet === 'eng') alphabet = english;

        key = this.keyValidation(key, alphabet)

        const registerLetters = this.saveRegisterMethod(encription_content.split(''));
        encription_content = encription_content.toUpperCase().split('');

        for(let encriptContentIndx in encription_content){
            for(let alphLetterIndx = 0; alphLetterIndx < alphabet.length; alphLetterIndx++){
    
                const step = alphLetterIndx + key;
    
                if(encription_content[encriptContentIndx] === alphabet[alphLetterIndx]){
    
                    step > alphabet.length-1 ?
                        encription_content[encriptContentIndx] = alphabet[(alphLetterIndx + key) - alphabet.length]
                    :
                        encription_content[encriptContentIndx] = alphabet[alphLetterIndx + key]
                    
                    break; //Припинення та вихід з циклу, коли всі дії щодо елементу виконано
    
                }
            }
        }

        encription_content = this.registerUpdate(encription_content, registerLetters);
        return encription_content.join('');
    }

    frequencyTableMethodCreate(encription_content) {
        const hash = new Map();
        const obj = new Object();

        encription_content = encription_content.split('');
        encription_content.forEach(letter => hash.set(letter, ((encription_content.filter(x => x === letter).length)/encription_content.length) * 100))
        const set = new Set([...hash]);
        
        set.forEach(current => {
            obj[current[0]] = `${current[1]}%`;
        })
        return obj;
    }

    keyValidation(key, alphabet) {
        if(alphabet === 'ukr') alphabet = ukraine;
        if(alphabet === 'eng') alphabet = english;
        key = Number.parseInt(key);

        if(key > alphabet.length) {
            throw new Error("Invalid key. Must be within the amount of alphabet characters");
        }
        return key;
    }

    saveRegisterMethod(content) {
        const registerLetters = []
        content.map((letter, index) => {
            if(letter === letter.toUpperCase() && letter !== ' ') {
                registerLetters.push(index);
            }
        })
        return registerLetters;
    }

    registerUpdate(newContent, contentRegister) {
        const contentFinally = new Array();
        for(let i = 0; i < newContent.length; i++) {
            if(contentRegister.length > 0) {
                for(let j = 0; j < contentRegister.length; j++) {
                    if(i === contentRegister[j]) {
                        contentFinally.push(newContent[i]);
                        contentRegister.splice(j, 1);
                        break;
                    }
                    else {
                        contentFinally.push(newContent[i].toLowerCase());
                        break;
                    }
                }
            } 
            else {
                contentFinally.push(newContent[i].toLowerCase());
            }
        }
        return contentFinally;
    }
}

module.exports = { CesareanEncryption, english, ukraine };