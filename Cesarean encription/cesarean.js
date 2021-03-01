const alphabet = [
    'A', 'B', 'C', 'D', 'E', 'F',
    'G', 'H', 'I', 'J', 'K', 'L',
    'M', 'N', 'O', 'P', 'Q', 'R',
    'S', 'T', 'U', 'V', 'W', 'X',
    'Y', 'Z'
  ]

function encription(content, key) {

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

    return content.join('');
}


function decription(encription_content, key) {

    encription_content = encription_content.split('');

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
    return encription_content.join('');
}

const key = 6
const message = 'Good Morning'

console.info(`Incoming message: ${message}\nKey: ${key}`)


const encr = encription(message, key)
console.info(`Encriprion message: ${encr}`)

const decript = decription(encr, key)
console.info(`Decription message: ${decript}`)