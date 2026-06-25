// URLパラメータを解析して現在のフォームにhidden要素としてすべて埋め込む
function relayParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const form = document.getElementById('form');
    if (!form) return;

    urlParams.forEach((value, key) => {
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

// すべてのイベントバインド（実行）をこの1つのDOMContentLoadedに集約します
document.addEventListener("DOMContentLoaded", function() {
    // 1. パラメータの自動中継をここで実行（1回のみ）
    relayParameters();

    // 2. 0〜5、または「はい・いいえ」の未選択チェックを共通化して強制ストップ
    const form = document.getElementById('form');
    if (form) {
        form.addEventListener('submit', function(event) {
            const answerInput = document.getElementById('answer');
            
            // 隠しフィールド 'answer' がフォーム内に存在し、かつ値が空欄（未選択）の場合
            if (answerInput && answerInput.value === "") {
                event.preventDefault(); // 遷移を確実にストップ
                event.stopPropagation();
                alert("選択肢のいずれかをクリックして回答してください。");
                return false;
            }
        });
    }
});
