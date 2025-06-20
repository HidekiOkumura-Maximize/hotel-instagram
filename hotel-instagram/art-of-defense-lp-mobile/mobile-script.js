// スクロールアニメーション
document.addEventListener('DOMContentLoaded', function() {
    // 監視対象の要素を取得
    const observerTargets = [
        { selector: '.problem-text', delay: 0 },
        { selector: '.flow-item', delay: 200 },
        { selector: '.flow-arrow', delay: 400 },
        { selector: '.flow-split', delay: 600 },
        { selector: '.flow-results', delay: 800 },
        { selector: '.problem-conclusion', delay: 1000 },
        { selector: '.solution-header', delay: 0 },
        { selector: '.solution-point', delay: 100 },
        { selector: '.solution-card', delay: 200 },
        { selector: '.solution-cta', delay: 250 },
        { selector: '.trusted-intro', delay: 0 },
        { selector: '.logo-item', delay: 100 },
        { selector: '.trusted-more', delay: 600 },
        { selector: '.plan-content', delay: 0 },
        { selector: '.showcase-container', delay: 300 },
        { selector: '.cta-content', delay: 0 },
        { selector: '.diagnosis-offer', delay: 0 }
    ];

    // Intersection Observer のオプション
    const observerOptions = {
        root: null,
        rootMargin: '-50px',
        threshold: 0.2
    };

    // Observer のコールバック関数
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    // diagnosis-offerの場合は追加でanimateクラスも付与
                    if (entry.target.classList.contains('diagnosis-offer')) {
                        entry.target.classList.add('animate');
                    }
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    };

    // Observer を作成
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // 各要素を監視対象に追加
    observerTargets.forEach(({ selector, delay }) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            // solution-pointは順番に表示
            if (selector === '.solution-point') {
                element.dataset.delay = delay + (index * 300);
            }
            // solution-cardも順番に表示
            else if (selector === '.solution-card') {
                element.dataset.delay = delay + (index * 150);
            }
            // CTAボタンは2枚目のカードの少し後
            else if (selector === '.solution-cta') {
                element.dataset.delay = delay + 200;
            }
            else {
                element.dataset.delay = delay + (index * 100);
            }
            observer.observe(element);
        });
    });

    // 固定背景画像の表示制御 - プランセクションベース
    let backgroundActivated = false; // 一度表示されたかを記録
    
    function checkBackgroundVisibility() {
        const planSection = document.querySelector('.plan-section');
        const fixedBg = document.querySelector('.fixed-background-container');
        
        if (planSection && fixedBg) {
            const planRect = planSection.getBoundingClientRect();
            
            // プランセクションが画面に少しでも入ったら
            if (planRect.top < window.innerHeight && planRect.bottom > 0) {
                backgroundActivated = true;
            }
            
            // 一度アクティブになったら、上にスクロールしない限り表示し続ける
            if (backgroundActivated) {
                // プランセクションより上に戻った場合のみ非表示
                if (planRect.top > window.innerHeight) {
                    fixedBg.classList.remove('visible');
                    backgroundActivated = false;
                } else {
                    fixedBg.classList.add('visible');
                }
            }
        }
    }
    
    // スクロールイベント
    window.addEventListener('scroll', checkBackgroundVisibility);
    
    // ページ読み込み時にもチェック
    window.addEventListener('load', checkBackgroundVisibility);
    setTimeout(checkBackgroundVisibility, 100);

    // スムーススクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});