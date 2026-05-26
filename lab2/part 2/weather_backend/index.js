import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors()); 
const PORT = 3000;

// Локальное хранилище для кэша погоды
let weatherCache = {};
let lastFetchTime = null;

// Координаты (Широта и Долгота) для 47 префектур Японии (пример для демонстрации)
// Добавьте сюда остальные префектуры по такому же шаблону
const PREFECTURES = {
    hokkaido: { lat: 43.0621, lon: 141.3544 }, aomori: { lat: 40.8224, lon: 140.7473 },
    iwate: { lat: 39.7036, lon: 141.1527 }, miyagi: { lat: 38.2682, lon: 140.8694 },
    akita: { lat: 39.7186, lon: 140.1024 }, yamagata: { lat: 38.2554, lon: 140.3396 },
    fukushima: { lat: 37.7503, lon: 140.4675 }, ibaraki: { lat: 36.3418, lon: 140.4468 },
    tochigi: { lat: 36.5658, lon: 139.8836 }, gunma: { lat: 36.3895, lon: 139.0634 },
    saitama: { lat: 35.8569, lon: 139.6489 }, chiba: { lat: 35.6046, lon: 140.1233 },
    tokyo: { lat: 35.6895, lon: 139.6917 }, kanagawa: { lat: 35.4475, lon: 139.6423 },
    niigata: { lat: 37.9024, lon: 139.0232 }, toyama: { lat: 36.6953, lon: 137.2113 },
    ishikawa: { lat: 36.5947, lon: 136.6256 }, fukui: { lat: 36.0652, lon: 136.2216 },
    yamanashi: { lat: 35.6639, lon: 138.5683 }, nagano: { lat: 36.6513, lon: 138.1810 },
    gifu: { lat: 35.3912, lon: 136.7224 }, shizuoka: { lat: 34.9756, lon: 138.3828 },
    aichi: { lat: 35.1802, lon: 136.9066 }, mie: { lat: 34.7303, lon: 136.5086 },
    shiga: { lat: 35.0045, lon: 135.8686 }, kyoto: { lat: 35.0116, lon: 135.7681 },
    osaka: { lat: 34.6937, lon: 135.5023 }, hyogo: { lat: 34.6913, lon: 135.1830 },
    nara: { lat: 34.6851, lon: 135.8048 }, wakayama: { lat: 34.2260, lon: 135.1675 },
    tottori: { lat: 35.5036, lon: 134.2383 }, shimane: { lat: 35.4722, lon: 133.0505 },
    okayama: { lat: 34.6618, lon: 133.9344 }, hiroshima: { lat: 34.3853, lon: 132.4553 },
    yamaguchi: { lat: 34.1785, lon: 131.4737 }, tokushima: { lat: 34.0711, lon: 134.5593 },
    kagawa: { lat: 34.3401, lon: 134.0433 }, ehime: { lat: 33.8416, lon: 132.7657 },
    kochi: { lat: 33.5597, lon: 133.5311 }, fukuoka: { lat: 33.6064, lon: 130.4182 },
    saga: { lat: 33.2494, lon: 130.2988 }, nagasaki: { lat: 32.7501, lon: 129.8773 },
    kumamoto: { lat: 32.7898, lon: 130.7417 }, oita: { lat: 33.2382, lon: 131.6126 },
    miyazaki: { lat: 31.9111, lon: 131.4239 }, kagoshima: { lat: 31.5602, lon: 130.5581 },
    okinawa: { lat: 26.2124, lon: 127.6809 }
};

async function updateWeatherCache() {
    console.log('Fetching fresh weather data from Open-Meteo...');
    const now = new Date();
    
    try {
        for (const [name, coords] of Object.entries(PREFECTURES)) {
            // get weather from open-meteo
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true`;
            const response = await axios.get(url);
            
            // Сохраняем только нужную информацию в наш кэш
            weatherCache[name] = {
                temperature: response.data.current_weather.temperature,
                windspeed: response.data.current_weather.windspeed,
                weathercode: response.data.current_weather.weathercode,
                updatedAt: now.toISOString()
            };
        }
        lastFetchTime = now;
        console.log('Weather cache successfully updated!');
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
    }
}

// Endpoints
app.get('/weather/:prefectureName', async (req, res) => {
    const prefecture = req.params.prefectureName.toLowerCase();

    if (!PREFECTURES[prefecture]) {
        return res.status(404).json({ error: 'Prefecture not found in configuration' });
    }

    const now = new Date();
    const ONE_HOUR_IN_MS = 60 * 60 * 1000;

    if (!lastFetchTime || (now - lastFetchTime > ONE_HOUR_IN_MS)) {
        await updateWeatherCache();
    }

    // Отдаем данные из памяти (мгновенно, без повторного запроса к внешнему API)
    res.json({
        prefecture: prefecture,
        data: weatherCache[prefecture]
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    // Делаем первый запрос при старте сервера, чтобы кэш не был пустым
    updateWeatherCache();
});