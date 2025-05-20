#!/usr/bin/env node
const fs = require('fs');
const readline = require('readline');
const { program } = require('commander');
const shiftedDiff = require('./shiftedDiff');

// Настройка команд
program
    .version('1.0.0')
    .description('Программа для вычисления сдвига между строками')
    .option('-i, --input <file>', 'путь к входному файлу')
    .option('-o, --output <file>', 'путь к выходному файлу')
    .parse(process.argv);

const options = program.opts();

/**
 * Обработка пары строк
 * @param {string} first - Первая строка
 * @param {string} second - Вторая строка
 * @param {stream.Writable} outputStream - Поток для вывода
 */
function processPair(first, second, outputStream) {
    const result = shiftedDiff(first, second);
    outputStream.write(`${result}\n`);
}

/**
 * Обработка ввода из файла
 * @param {string} inputPath - Путь к файлу
 * @param {stream.Writable} outputStream - Поток для вывода
 */
function handleFileInput(inputPath, outputStream) {
    fs.readFile(inputPath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Ошибка чтения файла: ${err.message}`);
            process.exit(1);
        }

        const lines = data.split('\n').filter(line => line.trim());
        lines.forEach(line => {
            const [first, second] = line.split(' ').map(s => s.trim());
            if (first && second) {
                processPair(first, second, outputStream);
            }
        });

        if (outputPath) {
            outputStream.end();
        }
    });
}

/**
 * Интерактивный режим ввода
 * @param {stream.Writable} outputStream - Поток для вывода
 */
function handleInteractiveInput(outputStream) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'Введите две строки через пробел (или CTRL+C для выхода): '
    });

    rl.prompt();

    rl.on('line', (line) => {
        const [first, second] = line.trim().split(' ');
        if (first && second) {
            processPair(first, second, outputStream);
        } else {
            console.error('Пожалуйста, введите две строки через пробел');
        }
        rl.prompt();
    }).on('close', () => {
        if (outputPath) {
            outputStream.end();
        }
        process.exit(0);
    });
}

// Основная логика программы
let outputStream;
let outputPath;

try {
    // Настройка выходного потока
    if (options.output) {
        outputPath = options.output;
        outputStream = fs.createWriteStream(outputPath, { flags: 'w' });
    } else {
        outputStream = process.stdout;
    }

    // Обработка ввода
    if (options.input) {
        handleFileInput(options.input, outputStream);
    } else {
        handleInteractiveInput(outputStream);
    }
} catch (err) {
    console.error(`Ошибка: ${err.message}`);
    process.exit(1);
}