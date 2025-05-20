/**
 * Функция для определения количества символов, на которое нужно сдвинуть первую строку,
 * чтобы получить вторую строку
 * @param {string} first - Первая строка
 * @param {string} second - Вторая строка
 * @returns {number} Количество сдвигов или -1, если строки не могут быть получены сдвигом
 */
function shiftedDiff(first, second) {
    // Если строки разной длины или пустые
    if (first.length !== second.length || first.length === 0) return -1;
    
    // Если строки уже одинаковые
    if (first === second) return 0;
    
    // Соединяем строку саму с собой и ищем вторую строку
    const combined = first + first;
    const index = combined.indexOf(second);
    
    // Если найдено, возвращаем индекс, иначе -1
    return index !== -1 ? index : -1;
}

module.exports = shiftedDiff;