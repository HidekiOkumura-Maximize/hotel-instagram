document.addEventListener('DOMContentLoaded', () => {
    // Safari用：リロード時に自動的にトップへスクロール
    if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
        window.scrollTo(0, 0);
        // 少し遅延させてもう一度実行（Safariの履歴復元対策）
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 0);
    }
    // Hero Section Animation
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        setTimeout(() => { heroSection.classList.add('in-view'); }, 100);

        const subHeadlineSpan = document.querySelector('.sub-headline .typewriter');
        if (subHeadlineSpan) {
            const text = subHeadlineSpan.textContent;
            subHeadlineSpan.textContent = '';
            subHeadlineSpan.style.minHeight = '1.5em'; // Prevent layout shift
            setTimeout(() => {
                let i = 0;
                const typing = setInterval(() => {
                    if (i < text.length) {
                        subHeadlineSpan.textContent += text.charAt(i);
                        i++;
                    } else {
                        clearInterval(typing);
                    }
                }, 80);
            }, 100);
        }
    }

    // Intersection Observer for scroll animations
    const animatedElements = document.querySelectorAll('.hero, .problem-section, .solution-interlude, .solution-service-section, .result-section, .plan-section, .conclusion-text, .final-cta-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Safe animation for diagnosis section
    const diagnosisSection = document.querySelector('.diagnosis-offer');
    if (diagnosisSection) {
        const diagnosisObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-50px'
        });
        
        diagnosisObserver.observe(diagnosisSection);
    }
    
    // Separate observer for service cards with higher threshold
    const serviceCards = document.querySelectorAll('.service-item');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, {
        threshold: 0.3
    });
    
    serviceCards.forEach(card => {
        cardObserver.observe(card);
    });
    
    // Future cards observer removed - section deleted

    // Mini Flow Chart Logic
    const miniFlowChartContainer = document.querySelector('.flow-chart-container-mini');
    if (miniFlowChartContainer) {
        const svg = miniFlowChartContainer.querySelector('.flow-chart-svg-mini');
        
        // Add background grid and gradients
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        
        // Instagram gradient for strokes
        const instagramGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        instagramGradient.setAttribute('id', 'instagram-gradient');
        instagramGradient.setAttribute('x1', '0%');
        instagramGradient.setAttribute('y1', '0%');
        instagramGradient.setAttribute('x2', '100%');
        instagramGradient.setAttribute('y2', '100%');
        
        const stops = [
            { offset: '0%', color: '#f09433' },
            { offset: '25%', color: '#e6683c' },
            { offset: '50%', color: '#dc2743' },
            { offset: '75%', color: '#cc2366' },
            { offset: '100%', color: '#bc1888' }
        ];
        
        stops.forEach(stop => {
            const stopElement = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stopElement.setAttribute('offset', stop.offset);
            stopElement.setAttribute('stop-color', stop.color);
            instagramGradient.appendChild(stopElement);
        });
        
        defs.appendChild(instagramGradient);
        
        // Instagram gradient for text
        const instagramGradientText = instagramGradient.cloneNode(true);
        instagramGradientText.setAttribute('id', 'instagram-gradient-text');
        defs.appendChild(instagramGradientText);
        const pattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
        pattern.setAttribute('id', 'grid');
        pattern.setAttribute('width', '20');
        pattern.setAttribute('height', '20');
        pattern.setAttribute('patternUnits', 'userSpaceOnUse');
        
        const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line1.setAttribute('x1', '0');
        line1.setAttribute('y1', '0');
        line1.setAttribute('x2', '0');
        line1.setAttribute('y2', '20');
        line1.setAttribute('stroke', 'rgba(255,255,255,0.05)');
        
        const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line2.setAttribute('x1', '0');
        line2.setAttribute('y1', '0');
        line2.setAttribute('x2', '20');
        line2.setAttribute('y2', '0');
        line2.setAttribute('stroke', 'rgba(255,255,255,0.05)');
        
        pattern.appendChild(line1);
        pattern.appendChild(line2);
        defs.appendChild(pattern);
        svg.appendChild(defs);
        
        const bgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        bgRect.setAttribute('width', '100%');
        bgRect.setAttribute('height', '100%');
        bgRect.setAttribute('fill', 'url(#grid)');
        svg.appendChild(bgRect);
        
        // Create SVG elements
        const nodes = {
            ota: { x: 50, y: 100, width: 200, height: 80, label: 'OTA', subLabel: 'ホテル発見' },
            instagram: { x: 300, y: 100, width: 200, height: 80, label: 'Instagram', subLabel: '審査' },
            exit: { x: 600, y: 50, width: 180, height: 80, label: '離脱', subLabel: '92%' },
            booking: { x: 600, y: 160, width: 180, height: 80, label: '予約行動', subLabel: '8%' }
        };

        // Create node groups
        Object.keys(nodes).forEach(key => {
            const node = nodes[key];
            const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            g.classList.add('node', `node-${key}`);
            
            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', node.x);
            rect.setAttribute('y', node.y);
            rect.setAttribute('width', node.width);
            rect.setAttribute('height', node.height);
            
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', node.x + node.width / 2);
            text.setAttribute('y', node.y + node.height / 2 - (node.subLabel ? 10 : 0));
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('dominant-baseline', 'middle');
            
            // Special handling for booking node
            if (key === 'booking') {
                const tspan1 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                tspan1.textContent = '予約';
                text.appendChild(tspan1);
                
                const tspan2 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                tspan2.textContent = '行動';
                tspan2.setAttribute('font-size', '16px');
                tspan2.setAttribute('fill', 'rgba(255,255,255,0.7)');
                text.appendChild(tspan2);
            } else {
                text.textContent = node.label;
            }
            
            const subText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            subText.setAttribute('x', node.x + node.width / 2);
            subText.setAttribute('y', node.y + node.height / 2 + 15);
            subText.setAttribute('text-anchor', 'middle');
            subText.setAttribute('dominant-baseline', 'middle');
            subText.classList.add('sub-text');
            // Special handling for percentage display
            if (key === 'exit' || key === 'booking') {
                subText.classList.add('percentage-text');
                if (key === 'booking') {
                    subText.classList.add('success');
                }
            }
            subText.textContent = node.subLabel;
            
            g.appendChild(rect);
            g.appendChild(text);
            if (node.subLabel) g.appendChild(subText);
            svg.appendChild(g);
        });

        // Create paths
        const paths = [
            {
                id: 'path-ota-ig',
                d: `M ${nodes.ota.x + nodes.ota.width} ${nodes.ota.y + nodes.ota.height / 2} 
                    L ${nodes.instagram.x} ${nodes.instagram.y + nodes.instagram.height / 2}`,
                stroke: '#666'
            },
            {
                id: 'path-ig-exit',
                d: `M ${nodes.instagram.x + nodes.instagram.width} ${nodes.instagram.y + nodes.instagram.height / 2 - 10} 
                    L ${nodes.exit.x} ${nodes.exit.y + nodes.exit.height / 2}`,
                stroke: '#e53e3e'
            },
            {
                id: 'path-ig-booking',
                d: `M ${nodes.instagram.x + nodes.instagram.width} ${nodes.instagram.y + nodes.instagram.height / 2 + 10} 
                    L ${nodes.booking.x} ${nodes.booking.y + nodes.booking.height / 2}`,
                stroke: '#22c55e'
            }
        ];

        paths.forEach(pathData => {
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('id', pathData.id);
            path.setAttribute('d', pathData.d);
            path.setAttribute('stroke', pathData.stroke);
            path.classList.add('flow-path');
            svg.appendChild(path);
        });

        // Percentage texts are now part of subLabel in nodes

        // Flow paths are now visible and animated immediately via CSS
    }

    // Conclusion text is now visible immediately via CSS

    // Solution Interlude Section - removed all animations
    
    // Scrolling keywords control - stop at result section
    const scrollingKeywords = document.querySelector('.scrolling-keywords');
    const resultSectionForKeywords = document.querySelector('.result-section');
    
    if (scrollingKeywords && resultSectionForKeywords) {
        const handleKeywordsScroll = () => {
            const resultRect = resultSectionForKeywords.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // When result section comes into view (実績セクション)
            if (resultRect.top <= windowHeight * 0.8) {
                scrollingKeywords.classList.add('stopped');
                // Optionally hide it completely when result section is fully in view
                if (resultRect.top <= windowHeight * 0.2) {
                    scrollingKeywords.classList.add('hidden');
                }
            } else {
                scrollingKeywords.classList.remove('stopped');
                scrollingKeywords.classList.remove('hidden');
            }
        };
        
        window.addEventListener('scroll', handleKeywordsScroll);
        handleKeywordsScroll();
    }
    
    // Sky background control
    const skyBg = document.querySelector('.fixed-sky-bg');
    const solutionSection = document.querySelector('.solution-service-section');
    const problemSection = document.querySelector('.problem-section');
    const resultSection = document.querySelector('.result-section');
    
    if (skyBg && solutionSection) {
        const handleScroll = () => {
            const solutionRect = solutionSection.getBoundingClientRect();
            const problemRect = problemSection ? problemSection.getBoundingClientRect() : null;
            const resultRect = resultSection ? resultSection.getBoundingClientRect() : null;
            const windowHeight = window.innerHeight;
            
            // 実績セクションが画面の上部に到達したら非表示
            if (resultRect && resultRect.top <= windowHeight * 0.1) {
                skyBg.style.opacity = '0';
                return;
            }
            
            // ソリューションセクションが完全に画面外（上）に出たら非表示
            if (solutionRect.bottom <= 0) {
                skyBg.style.opacity = '0';
                return;
            }
            
            // ソリューションセクションが画面内にある場合
            if (solutionRect.top < windowHeight && solutionRect.bottom > 0) {
                // 問題セクションが画面から出た後は常に表示
                if (problemRect && problemRect.bottom < windowHeight * -0.2) {
                    skyBg.style.opacity = '1';
                } else if (problemRect && problemRect.bottom >= windowHeight * -0.2) {
                    // 問題セクションがまだ見えている間は非表示
                    skyBg.style.opacity = '0';
                }
            } else {
                // ソリューションセクションが画面外では非表示
                skyBg.style.opacity = '0';
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        handleScroll();
    }
    
    // Plan section cosmic animation trigger
    const planSection = document.querySelector('.plan-section');
    if (planSection) {
        const checkIfAtBottom = () => {
            const rect = planSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const scrollBottom = window.scrollY + window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            
            // Check if we're near the bottom of the page
            if (scrollBottom >= documentHeight - 100 || rect.top <= windowHeight * 0.1) {
                if (!planSection.classList.contains('at-bottom')) {
                    planSection.classList.add('at-bottom');
                    // Fire particles animation removed
                }
            }
        };
        
        window.addEventListener('scroll', checkIfAtBottom);
        checkIfAtBottom();
    }
    
    
    // Modal functionality
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modal = document.getElementById('contact-modal');
    
    // Open modal
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }
    
    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Closing wrapper background visibility control
    const closingWrapper = document.querySelector('.closing-wrapper');
    
    if (closingWrapper) {
        const style = document.createElement('style');
        document.head.appendChild(style);
        
        const checkClosingPosition = () => {
            const wrapperRect = closingWrapper.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            
            // Show background when closing wrapper comes into view
            if (wrapperRect.top <= viewportHeight) {
                style.textContent = '.closing-wrapper::before { opacity: 1 !important; }';
            } else {
                style.textContent = '.closing-wrapper::before { opacity: 0 !important; }';
            }
        };
        
        window.addEventListener('scroll', checkClosingPosition);
        checkClosingPosition(); // Initial check
    }

    // Flow Canvas Animation (新しい静的フロー)
    const canvas = document.getElementById('flowCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        
        // サイズ設定
        function setCanvasSize() {
            const wrapper = canvas.parentElement;
            canvas.width = wrapper.offsetWidth;
            canvas.height = wrapper.offsetHeight;
        }
        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        // 座標を計算
        function getCoords() {
            const w = canvas.width;
            const h = canvas.height;
            return {
                ota: { x: w * 0.2 - 5, y: h * 0.5 - 40 },
                instagram: { x: w * 0.5 - 5, y: h * 0.5 - 40 },
                reservation: { x: w * 0.8 - 80, y: h * 0.25 - 5 },
                departure: { x: w * 0.8 - 100, y: h * 0.75 - 10 }
            };
        }

        // パルスアニメーション用のクラス
        class PulseLight {
            constructor(path, delay, speed = 0.015) {
                this.path = path;
                this.progress = 0;
                this.delay = delay;
                this.speed = speed;
                this.active = false;
            }

            update() {
                if (this.delay > 0) {
                    this.delay -= 0.016; // 約60fps
                    return;
                }

                this.active = true;
                this.progress += this.speed;
                
                if (this.progress > 1) {
                    this.progress = 0;
                    this.delay = 0.5; // 再スタートまでの待機
                    this.active = false;
                }
            }

            getPosition(coords) {
                if (!this.active) return null;

                if (this.path === 'toInstagram') {
                    const t = this.progress;
                    return {
                        x: coords.ota.x + (coords.instagram.x - coords.ota.x) * t,
                        y: coords.ota.y + (coords.instagram.y - coords.ota.y) * t,
                        opacity: 1 - Math.abs(t - 0.5) * 0.3
                    };
                } else if (this.path === 'toReservation') {
                    const t = this.progress;
                    const start = coords.instagram;
                    const end = coords.reservation;
                    
                    // 直線パス
                    return {
                        x: start.x + (end.x - start.x) * t,
                        y: start.y + (end.y - start.y) * t,
                        opacity: 1 - Math.abs(t - 0.5) * 0.3
                    };
                } else if (this.path === 'toDeparture') {
                    const t = this.progress;
                    const start = coords.instagram;
                    const end = coords.departure;
                    
                    // 直線パス
                    return {
                        x: start.x + (end.x - start.x) * t,
                        y: start.y + (end.y - start.y) * t,
                        opacity: 1 - Math.abs(t - 0.5) * 0.3
                    };
                }
                return null;
            }

            draw(ctx, coords) {
                const pos = this.getPosition(coords);
                if (!pos) return;

                // 光のグラデーション効果
                const gradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 20);
                if (this.path === 'toReservation') {
                    gradient.addColorStop(0, `rgba(252, 175, 69, ${pos.opacity})`);
                    gradient.addColorStop(0.5, `rgba(252, 175, 69, ${pos.opacity * 0.5})`);
                    gradient.addColorStop(1, 'rgba(252, 175, 69, 0)');
                } else if (this.path === 'toDeparture') {
                    gradient.addColorStop(0, `rgba(225, 48, 108, ${pos.opacity})`);
                    gradient.addColorStop(0.5, `rgba(225, 48, 108, ${pos.opacity * 0.5})`);
                    gradient.addColorStop(1, 'rgba(225, 48, 108, 0)');
                } else {
                    gradient.addColorStop(0, `rgba(255, 255, 255, ${pos.opacity})`);
                    gradient.addColorStop(0.5, `rgba(255, 255, 255, ${pos.opacity * 0.5})`);
                    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                }

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(pos.x, pos.y, 15, 0, Math.PI * 2);
                ctx.fill();

                // 中心の明るい部分
                ctx.fillStyle = this.path === 'toReservation' ? 
                    `rgba(252, 175, 69, ${pos.opacity})` : 
                    this.path === 'toDeparture' ?
                    `rgba(225, 48, 108, ${pos.opacity})` :
                    `rgba(255, 255, 255, ${pos.opacity})`;
                ctx.beginPath();
                ctx.arc(pos.x, pos.y, 6, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // 静的な線とドットを描画
        function drawStaticElements(coords) {
            // Safari対応のため shadowBlur を使わない
            ctx.save();
            
            // 線のスタイル設定
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            
            // OTA → Instagram
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.lineWidth = 2;
            ctx.setLineDash([12, 6]);
            ctx.beginPath();
            ctx.moveTo(coords.ota.x, coords.ota.y);
            ctx.lineTo(coords.instagram.x, coords.instagram.y);
            ctx.stroke();

            // Instagram → 8%
            ctx.strokeStyle = 'rgba(252, 175, 69, 0.3)';
            ctx.lineWidth = 2;
            ctx.setLineDash([]);
            ctx.beginPath();
            ctx.moveTo(coords.instagram.x, coords.instagram.y);
            ctx.lineTo(coords.reservation.x, coords.reservation.y);
            ctx.stroke();

            // Instagram → 92%
            ctx.strokeStyle = 'rgba(225, 48, 108, 0.4)';
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(coords.instagram.x, coords.instagram.y);
            ctx.lineTo(coords.departure.x, coords.departure.y);
            ctx.stroke();

            // 接続ドット（Safariに最適化）
            drawDots(coords);
            
            ctx.restore();
        }

        // ドットを描画（Safari対応版）
        function drawDots(coords) {
            const dots = [
                { pos: coords.ota, color: 'rgba(255, 255, 255, 0.9)', size: 12, glowSize: 8 },
                { pos: coords.instagram, color: 'rgba(225, 48, 108, 0.9)', size: 12, glowSize: 8 },
                { pos: coords.reservation, color: 'rgba(252, 175, 69, 0.9)', size: 8, glowSize: 5 },
                { pos: coords.departure, color: 'rgba(225, 48, 108, 0.9)', size: 8, glowSize: 5 }
            ];

            dots.forEach(dot => {
                // 外側のグロー（複数の半透明円で表現）
                for (let i = 3; i > 0; i--) {
                    ctx.fillStyle = dot.color.replace('0.9', `${0.1 * i}`);
                    ctx.beginPath();
                    ctx.arc(dot.pos.x, dot.pos.y, dot.size + i * dot.glowSize, 0, Math.PI * 2);
                    ctx.fill();
                }
                
                // メインドット
                ctx.fillStyle = dot.color;
                ctx.beginPath();
                ctx.arc(dot.pos.x, dot.pos.y, dot.size, 0, Math.PI * 2);
                ctx.fill();
                
                // 中心の明るい部分
                ctx.fillStyle = 'white';
                ctx.beginPath();
                ctx.arc(dot.pos.x, dot.pos.y, dot.size * 0.5, 0, Math.PI * 2);
                ctx.fill();
            });
        }

        // パルスライトを作成
        const lights = [
            new PulseLight('toInstagram', 0),
            new PulseLight('toInstagram', 0.8),
            new PulseLight('toReservation', 1.5),
            new PulseLight('toDeparture', 1.7),
            new PulseLight('toDeparture', 2.5),
            new PulseLight('toDeparture', 3.3),
        ];

        // アニメーションループ
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const coords = getCoords();
            
            // 静的要素を描画
            drawStaticElements(coords);
            
            // パルスライトを更新・描画
            lights.forEach(light => {
                light.update();
                light.draw(ctx, coords);
            });
            
            requestAnimationFrame(animate);
        }

        // アニメーション開始
        setTimeout(() => {
            animate();
        }, 200);
    }
});