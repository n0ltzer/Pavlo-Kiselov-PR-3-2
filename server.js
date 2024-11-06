// server.js
const http = require('http');
const fs = require('fs');
const path = require('path');

// Функція для отримання поточної дати
function getCurrentDate() {
    const date = new Date();
    return date.toLocaleString(); // Повертає дату та час у локальному форматі
}

const server = http.createServer((req, res) => {
    // Встановлюємо шлях до index.html
    const filePath = path.join(__dirname, 'index.html');

    // Зчитуємо файл index.html
    fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Помилка на сервері');
        } else {
            // Замінюємо {{currentDate}} на поточну дату
            const updatedContent = content.replace('{{currentDate}}', getCurrentDate());

            // Відправляємо оновлений HTML-контент клієнту
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(updatedContent);
        }
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Сервер запущено! Перейдіть за посиланням: http://localhost:${PORT}`);
});
