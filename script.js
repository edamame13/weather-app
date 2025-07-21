// OpenWeatherMap API設定
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY_STORAGE = 'weather_app_api_key';
const BUILT_IN_API_KEY = 'API_KEY_PLACEHOLDER'; // GitHub Actionsで置換される

// DOM要素の取得
const apiKeySection = document.getElementById('apiKeySection');
const mainApp = document.getElementById('mainApp');
const apiKeyInput = document.getElementById('apiKeyInput');
const saveApiKeyBtn = document.getElementById('saveApiKeyBtn');
const changeApiKeyBtn = document.getElementById('changeApiKeyBtn');
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherInfo = document.getElementById('weatherInfo');
const errorMessage = document.getElementById('errorMessage');
const loading = document.getElementById('loading');
const cityName = document.getElementById('cityName');
const weather = document.getElementById('weather');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');

// アプリ初期化
document.addEventListener('DOMContentLoaded', initializeApp);

// イベントリスナーの設定
saveApiKeyBtn.addEventListener('click', saveApiKey);
changeApiKeyBtn.addEventListener('click', showApiKeySection);
searchBtn.addEventListener('click', getWeather);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getWeather();
    }
});
apiKeyInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        saveApiKey();
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

    // APIキーを取得
    const API_KEY = getApiKey();
    
    if (!API_KEY) {
        showError('APIキーが設定されていません');
        showApiKeySection();
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
                localStorage.removeItem(API_KEY_STORAGE); // 無効なAPIキーを削除
                throw new Error('APIキーが無効です。新しいAPIキーを設定してください。');
            } else {
                throw new Error('天気情報の取得に失敗しました。');
            }
        }

        const data = await response.json();
        displayWeather(data);

    } catch (error) {
        console.error('Error:', error);
        showError(error.message);
        
        // APIキーエラーの場合は設定画面に戻る
        if (error.message.includes('APIキーが無効')) {
            setTimeout(() => {
                showApiKeySection();
            }, 2000);
        }
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

// アプリ初期化関数
function initializeApp() {
    const apiKey = getApiKey();
    
    // デバッグ情報（本番では削除推奨）
    console.log('Config API Key status:', window.WEATHER_APP_CONFIG?.API_KEY ? 'Available' : 'Not available');
    console.log('Built-in API Key status:', BUILT_IN_API_KEY !== 'API_KEY_PLACEHOLDER' ? 'Available' : 'Not available');
    console.log('Local storage API Key:', localStorage.getItem(API_KEY_STORAGE) ? 'Available' : 'Not available');
    
    if (apiKey) {
        showMainApp();
        // 組み込みAPIキーがある場合は設定情報を非表示
        if ((window.WEATHER_APP_CONFIG?.API_KEY) || (BUILT_IN_API_KEY && BUILT_IN_API_KEY !== 'API_KEY_PLACEHOLDER')) {
            const apiKeyInfo = document.querySelector('.api-key-info');
            if (apiKeyInfo) {
                apiKeyInfo.style.display = 'none';
            }
        }
    } else {
        showApiKeySection();
    }
}

// APIキー保存関数
function saveApiKey() {
    const apiKey = apiKeyInput.value.trim();
    
    if (!apiKey) {
        showError('APIキーを入力してください');
        return;
    }
    
    // APIキーの基本的な形式チェック（32文字の英数字）
    if (!/^[a-zA-Z0-9]{32}$/.test(apiKey)) {
        showError('APIキーの形式が正しくありません（32文字の英数字である必要があります）');
        return;
    }
    
    localStorage.setItem(API_KEY_STORAGE, apiKey);
    apiKeyInput.value = '';
    showMainApp();
    showSuccess('APIキーが保存されました！');
}

// APIキー設定画面を表示
function showApiKeySection() {
    apiKeySection.classList.remove('hidden');
    mainApp.classList.add('hidden');
    hideAll();
}

// メインアプリを表示
function showMainApp() {
    apiKeySection.classList.add('hidden');
    mainApp.classList.remove('hidden');
}

// 保存されたAPIキーを取得
function getApiKey() {
    // まず設定ファイルからAPIキーをチェック（GitHub Actionsでデプロイされた場合）
    if (window.WEATHER_APP_CONFIG && window.WEATHER_APP_CONFIG.API_KEY) {
        return window.WEATHER_APP_CONFIG.API_KEY;
    }
    // 次に組み込みAPIキーをチェック
    if (BUILT_IN_API_KEY && BUILT_IN_API_KEY !== 'API_KEY_PLACEHOLDER') {
        return BUILT_IN_API_KEY;
    }
    // 最後にローカルストレージをチェック
    return localStorage.getItem(API_KEY_STORAGE);
}

// 成功メッセージを表示
function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success';
    successDiv.textContent = message;
    successDiv.style.cssText = `
        background: #00b894;
        color: white;
        padding: 12px;
        border-radius: 8px;
        text-align: center;
        margin-bottom: 1rem;
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1000;
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        document.body.removeChild(successDiv);
    }, 3000);
}

// すべての表示要素を非表示にする
function hideAll() {
    weatherInfo.classList.add('hidden');
    errorMessage.classList.add('hidden');
    loading.classList.add('hidden');
}