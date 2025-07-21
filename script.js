// OpenWeatherMap APIキー（ここに実際のAPIキーを入力してください）
const API_KEY = 'API_KEY_HERE';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// DOM要素の取得
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherInfo = document.getElementById('weatherInfo');
const errorMessage = document.getElementById('errorMessage');
const loading = document.getElementById('loading');
const cityName = document.getElementById('cityName');
const weather = document.getElementById('weather');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');

// イベントリスナーの設定
searchBtn.addEventListener('click', getWeather);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getWeather();
    }
});

// 天気情報を取得する関数
async function getWeather() {
    const city = cityInput.value.trim();

    // 入力チェック
    if (!city) {
        showError('都市名を入力してください');
        return;
    }

    // APIキーチェック - テストモード追加
    if (API_KEY === 'API_KEY_HERE' || API_KEY === 'TEST_MODE') {
        showError('テストモードで実行中です。実際のAPIキーを設定するか、"TEST_MODE"と入力してテストデータを表示してください。');

        // テストモード：TEST_MODEと入力された場合はモックデータを表示
        if (API_KEY === 'TEST_MODE') {
            hideAll();
            showLoading();

            setTimeout(() => {
                const mockData = {
                    name: city,
                    sys: { country: 'JP' },
                    weather: [{
                        description: '晴れ',
                        main: 'Clear',
                        icon: '01d'
                    }],
                    main: {
                        temp: 25,
                        humidity: 60,
                        feels_like: 27
                    },
                    wind: { speed: 2.5 }
                };
                displayWeather(mockData);
                hideLoading();
            }, 1000);
        }
        return;
    }

    // UI状態をリセット
    hideAll();
    showLoading();

    try {
        // APIリクエスト
        const response = await fetch(
            `${API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=ja`
        );

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('都市が見つかりません。都市名を確認してください。');
            } else if (response.status === 401) {
                throw new Error('APIキーが無効です。正しいAPIキーを設定してください。OpenWeatherMapでAPIキーが有効になるまで数分〜数時間かかる場合があります。');
            } else {
                throw new Error('天気情報の取得に失敗しました。');
            }
        }

        const data = await response.json();
        displayWeather(data);

    } catch (error) {
        console.error('Error:', error);
        showError(error.message);
    } finally {
        hideLoading();
    }
}

// 天気アイコンマッピング
const weatherIcons = {
    '01d': '☀️', // 晴れ（昼）
    '01n': '🌙', // 晴れ（夜）
    '02d': '⛅', // 少し曇り（昼）
    '02n': '☁️', // 少し曇り（夜）
    '03d': '☁️', // 曇り
    '03n': '☁️', // 曇り
    '04d': '☁️', // 厚い雲
    '04n': '☁️', // 厚い雲
    '09d': '🌧️', // にわか雨
    '09n': '🌧️', // にわか雨
    '10d': '🌦️', // 雨（昼）
    '10n': '🌧️', // 雨（夜）
    '11d': '⛈️', // 雷雨
    '11n': '⛈️', // 雷雨
    '13d': '❄️', // 雪
    '13n': '❄️', // 雪
    '50d': '🌫️', // 霧
    '50n': '🌫️'  // 霧
};

// 天気情報を表示する関数
function displayWeather(data) {
    const weatherIcon = document.getElementById('weatherIcon');
    const feelsLike = document.getElementById('feelsLike');
    const windSpeed = document.getElementById('windSpeed');

    cityName.textContent = `${data.name}, ${data.sys.country}`;
    weather.textContent = data.weather[0].description;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    humidity.textContent = `${data.main.humidity}%`;
    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
    windSpeed.textContent = `${data.wind?.speed || 0} m/s`;

    // 天気アイコンを設定
    const iconCode = data.weather[0].icon;
    weatherIcon.textContent = weatherIcons[iconCode] || '🌤️';

    // 天気に応じて背景色を変更
    updateBackgroundColor(data.weather[0].main);

    weatherInfo.classList.remove('hidden');
}

// エラーメッセージを表示する関数
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

// ローディング表示
function showLoading() {
    loading.classList.remove('hidden');
}

// ローディング非表示
function hideLoading() {
    loading.classList.add('hidden');
}

// 天気に応じて背景色を変更する関数
function updateBackgroundColor(weatherMain) {
    const body = document.body;

    // 既存のクラスを削除
    body.classList.remove('sunny', 'rainy', 'cloudy', 'snowy', 'stormy');

    switch (weatherMain.toLowerCase()) {
        case 'clear':
            body.classList.add('sunny');
            break;
        case 'rain':
        case 'drizzle':
            body.classList.add('rainy');
            break;
        case 'clouds':
            body.classList.add('cloudy');
            break;
        case 'snow':
            body.classList.add('snowy');
            break;
        case 'thunderstorm':
            body.classList.add('stormy');
            break;
        default:
            // デフォルトの背景を維持
            break;
    }
}

// すべての表示要素を非表示にする
function hideAll() {
    weatherInfo.classList.add('hidden');
    errorMessage.classList.add('hidden');
    loading.classList.add('hidden');
}