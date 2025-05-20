function shiftedDiff(first, second) {
    // Проверка на пустые строки и равенство длин
    if (first.length !== second.length) {
        return -1;
    }
    if (first === second) {
        return 0;
    }
    
    // Проверка чувствительности к регистру
    if (first.toLowerCase() === second.toLowerCase() && first !== second) {
        return -1;
    }
    
    // Проверка всех возможных сдвигов
    for (let i = 1; i < first.length; i++) {
        const shifted = first.slice(-i) + first.slice(0, -i);
        if (shifted === second) {
            return i;
        }
    }
    
    // Если совпадений не найдено
    return -1;
}

// Тесты
console.log(shiftedDiff("coffee", "eecoff")); // -> 2
console.log(shiftedDiff("eecoff", "coffee")); // -> 4
console.log(shiftedDiff("moose", "Moose")); // -> -1
console.log(shiftedDiff("eecoff", "coffee")); // -> 4
console.log(shiftedDiff("Moose", "moose")); // -> -1
console.log(shiftedDiff("isn't", "'tɪsn")); // -> 2
console.log(shiftedDiff("Esham", "Esham")); // -> 0
console.log(shiftedDiff(" ", " ")); // -> 0
console.log(shiftedDiff("hoop", "pɒoh")); // -> -1
console.log(shiftedDiff(" ", " ")); // -> 0