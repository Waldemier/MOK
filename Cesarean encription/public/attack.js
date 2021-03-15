const { CesareanEncryption, english, ukraine } = require('./cesarean')

const cesarean = new CesareanEncryption();

module.exports.attackSimulatedMethod = (encryption, alphabet = 'eng') => {
    let alphabetlength;
    if(alphabet === 'ukr') alphabetlength = ukraine.length;
    if(alphabet === 'eng') alphabetlength = english.length;

    let keyNumber = alphabetlength;
    const attackResult = new Array();
    while(keyNumber) {
        const current = cesarean.decryption(encryption, keyNumber, alphabet);
        attackResult.push(`Current decryption status: "${current}" with key = ${keyNumber}`);
        keyNumber--;
    }
    return attackResult;
}