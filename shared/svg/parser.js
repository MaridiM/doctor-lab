const fs = require('fs')
const path = require('path')

const directoryPath = __dirname // папка, в которой запускаем

// Читаем список всех файлов в папке
fs.readdir(directoryPath, (err, files) => {
    if (err) {
        return console.error('Ошибка при чтении директории:', err)
    }

    files.forEach(file => {
        // Проверяем, есть ли в имени файла '='
        if (file.includes('=')) {
            // Выделяем часть после '='
            const afterEqual = file.split('=')[1]
            // Убираем все символы '_'
            const newFileNamePart = afterEqual.replace(/_/g, '')
            // Переименовываем файл
            const oldPath = path.join(directoryPath, file)
            const newPath = path.join(directoryPath, newFileNamePart)

            fs.rename(oldPath, newPath, renameErr => {
                if (renameErr) {
                    console.error(`Ошибка при переименовании файла "${file}":`, renameErr)
                } else {
                    console.log(`Файл "${file}" переименован в "${newFileNamePart}"`)
                }
            })
        }
    })
})
