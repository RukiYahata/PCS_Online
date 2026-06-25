// URLパラメータを解析して現在のフォームにhidden要素としてすべて埋め込む関数
function relayParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const form = document.getElementById('form');
    if (!form) return;

    urlParams.forEach((value, key) => {
        // すでにフォームに存在する同名のフィールドはスキップ（最新の入力を優先するため）
        if (!form.querySelector(`[name="${key}"]`)) {
            const hiddenInput = document.createElement('input');
            hiddenInput.type = 'hidden';
            hiddenInput.name = key;
            hiddenInput.value = value;
            form.appendChild(hiddenInput);
        }
    });
}

// フォーム送信時に必須入力を検証する関数
function validateRequiredFields(event, message) {
    const form = event.target;
    if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        alert(message || "必須項目を入力してください。");
        return false;
    }
    return true;
}

// 現在の時間を YYYY-MM-DD HH:mm:ss 形式で取得
function getFormattedFormattedTime() {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    return `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
}

document.addEventListener("DOMContentLoaded", relayParameters);
