const { CesareanEncryption } = require("./cesarean")

let cesarean = new CesareanEncryption();

//Encryption tests

test('The encrypt function takes the symbol "A" with the key=2. Expect "Y"', () => {
    expect(cesarean.encryption('A', 2)).toBe('Y')
})

test('The encrypt function takes the symbol "x" with the key=7. Expect "q"', () => {
    expect(cesarean.encryption('x', 7)).toBe('q')
})

test('The encrypt function takes the symbol "D" with the key=3. Expect "A"', () => {
    expect(cesarean.encryption('D', 3)).toBe('A')
})

test('The encrypt function takes the symbol "z" with the key=5. Expect "u"', () => {
    expect(cesarean.encryption('z', 5)).toBe('u')
})

test('The encrypt function takes the symbols "MOK" with the key=4. Expect "IKG"', () => {
    expect(cesarean.encryption('MOK', 4)).toBe('IKG')
})

test('The encrypt function takes the symbols "Good" with the key=2. Expect "Emmb"', () => {
    expect(cesarean.encryption('Good', 2)).toBe('Emmb')
})

test('The encrypt function takes the symbols "My opiNIon about You DOES not faDe" with the key=2. Expect "Kw mngLGml yzmsr Wms BMCQ lmr dyBc"\n', () => {
    expect(cesarean.encryption('My opiNIon about You DOES not faDe', 2)).toBe('Kw mngLGml yzmsr Wms BMCQ lmr dyBc')
})


//Decryption tests

test('The decrypt function takes the symbol "U" with the key=5. Expect "Z"', () => {
    expect(cesarean.decryption('U', 5)).toBe('Z')
})

test('The decrypt function takes the symbols "IKG" with the key=4. Expect "MOK"', () => {
    expect(cesarean.decryption('IKG', 4)).toBe('MOK')
})

test('The decrypt function takes the symbols "Emmb" with the key=2. Expect "Good"', () => {
    expect(cesarean.decryption('Emmb', 2)).toBe('Good')
})

test('The decrypt function takes the symbols "Ійч аоізш їб ґюшмшв" with the key=5. Expect "Моя думка не згасає"', () => {
    expect(cesarean.decryption('Ійч аоізш їб ґюшмшв', 5, 'ukr')).toBe('Моя думка не згасає')
}) 

test('The decrypt function takes the symbols "Юкіш" with the key=4. Expect "Воля"\n', () => {
    expect(cesarean.decryption('Юкіш', 4, 'ukr')).toBe('Воля')
}) 



//Languages tests

test('For the encrypt function, specify the Ukrainian language. Takes "А" with key=4, expect "Щ"', () => {
    expect(cesarean.encryption('А', 4, 'ukr')).toBe('Щ')
})

test('For the encrypt function, specify the Ukrainian language. Takes "ї" with key=2, expect "и"', () => {
    expect(cesarean.encryption('ї', 2, 'ukr')).toBe('и')
})

test('For the encrypt function, specify the Ukrainian language. Takes "а" with key=3, expect "ь"', () => {
    expect(cesarean.encryption('а', 3, 'ukr')).toBe('ь')
})

test('For the encrypt function, specify the Ukrainian language. Takes "Львів" with key=4, expect "Іцюєю"', () => {
    expect(cesarean.encryption('Львів', 4, 'ukr')).toBe('Іцюєю')
})

test('The encrypt function takes the symbols "Моя думка Щодо ТЕБЕ не Згасає" with the key=2. Expect "Кмь гскїю Чмгм РҐЯҐ лґ Єбюпюд"\n', () => {
    expect(cesarean.encryption('Моя думка Щодо ТЕБЕ не Згасає', 2, 'ukr')).toBe('Кмь гскїю Чмгм РҐЯҐ лґ Єбюпюд')
})

//Ukrainian decription tests

test('For the decrypt function, specify the Ukrainian language. Takes "Іцюєю" with key=4, expect "Львів"', () => {
    expect(cesarean.decryption('Іцюєю', 4, 'ukr')).toBe('Львів')
})

test('For the decrypt function, specify the Ukrainian language. Takes "Кмь гскїю Чмгм РҐЯҐ лґ Єбюпюд" with key=4, expect "Моя думка Щодо ТЕБЕ не Згасає"\n', () => {
    expect(cesarean.decryption('Кмь гскїю Чмгм РҐЯҐ лґ Єбюпюд', 2, 'ukr')).toBe('Моя думка Щодо ТЕБЕ не Згасає')
})
