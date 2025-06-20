// diagnosis-mobile.js

document.addEventListener('DOMContentLoaded', function() {
    // フォーム送信処理
    const form = document.querySelector('.diagnosis-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // 実際の処理はここに実装
            alert('診断申し込みを受け付けました。2営業日以内にご連絡いたします。');
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
    const animateElements = document.querySelectorAll('.benefit-item, .step-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});