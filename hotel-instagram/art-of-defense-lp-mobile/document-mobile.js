// フォーム送信処理
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.download-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // 実際の処理はここに実装
            alert('資料のダウンロードリンクをメールでお送りします（テスト）');
        });
    }
    
    // スクロールアニメーション
    const observerOptions = {
        root: null,
        rootMargin: '-50px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // アニメーション対象要素
    const animateElements = document.querySelectorAll('.benefit-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});