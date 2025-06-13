export class FuturisticTextAnimator {
    constructor(elementId, texts) {
        this.container = document.getElementById(elementId);
        if (!this.container) {
            console.error(`FuturisticTextAnimator: Element with id "${elementId}" not found.`);
            return;
        }
        this.texts = texts;
        this.textIndex = 0;
        this.isAnimating = false; // Prevents cycles from overlapping
        this.init();
    }

    init() {
        this.addEventListeners();
        this.runAnimationCycle();
    }

    runAnimationCycle() {
        if (this.isAnimating) return;
        this.isAnimating = true;

        this.setupText(this.texts[this.textIndex]);
        this.animateIn();

        setTimeout(() => {
            this.animateOut(() => {
                this.textIndex = (this.textIndex + 1) % this.texts.length;
                this.isAnimating = false;
                this.runAnimationCycle();
            });
        }, 4000);
    }

    setupText(text) {
        this.container.innerHTML = '';
        const words = text.split(/\s+/);

        words.forEach(wordStr => {
            const wordWrapper = document.createElement('span');
            wordWrapper.className = 'word-wrapper';
            const wordSpan = document.createElement('span');
            wordSpan.className = 'word';
            const isHighlighted = wordStr.startsWith('*') && wordStr.endsWith('*');
            const cleanWord = isHighlighted ? wordStr.substring(1, wordStr.length - 1) : wordStr;
            if (isHighlighted) {
                wordSpan.classList.add('highlight');
            }
            cleanWord.split('').forEach(char => {
                const letterSpan = document.createElement('span');
                letterSpan.className = 'letter';
                letterSpan.textContent = char;
                const x = (Math.random() - 0.5) * 500;
                const y = (Math.random() - 0.5) * 300;
                const rot = (Math.random() - 0.5) * 360;
                letterSpan.style.setProperty('--tx', `${x}px`);
                letterSpan.style.setProperty('--ty', `${y}px`);
                letterSpan.style.setProperty('--rt', `${rot}deg`);
                wordSpan.appendChild(letterSpan);
            });
            wordWrapper.appendChild(wordSpan);
            this.container.appendChild(wordWrapper);
            this.container.appendChild(document.createTextNode(' '));
        });

        this.addHoverListeners();
    }

    animateIn() {
        let letterIndex = 0;
        const letters = Array.from(this.container.querySelectorAll('.letter'));
        letters.forEach(letter => {
            setTimeout(() => letter.classList.add('visible'), letterIndex * 30);
            letterIndex++;
        });
    }

    animateOut(onCompleteCallback) {
        const hoveredWrapper = this.container.querySelector('.word-wrapper.hover-active');
        if (hoveredWrapper) {
            hoveredWrapper.classList.remove('hover-active');
        }

        setTimeout(() => {
            let letterIndex = 0;
            const letters = Array.from(this.container.querySelectorAll('.letter'));
            letters.forEach(letter => {
                const x = (Math.random() - 0.5) * 500;
                const y = (Math.random() - 0.5) * 300;
                const rot = (Math.random() - 0.5) * 360;
                letter.style.setProperty('--tx', `${x}px`);
                letter.style.setProperty('--ty', `${y}px`);
                letter.style.setProperty('--rt', `${rot}deg`);
                setTimeout(() => letter.classList.remove('visible'), letterIndex * 25);
                letterIndex++;
            });
            setTimeout(onCompleteCallback, letters.length * 25 + 1000);
        }, 50);
    }
    
    addEventListeners() {
        if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', this.handleTilt.bind(this));
        }
        document.body.addEventListener('mousemove', this.handleMagneticMouseMove.bind(this));
        this.container.addEventListener('mouseleave', this.handleMagneticMouseLeave.bind(this));
    }

    addHoverListeners() {
        const wrappers = this.container.querySelectorAll('.word-wrapper');
        wrappers.forEach(wrapper => {
            wrapper.addEventListener('mouseenter', () => wrapper.classList.add('hover-active'));
            wrapper.addEventListener('mouseleave', () => wrapper.classList.remove('hover-active'));
        });
    }

    handleTilt(event) {
        const { beta, gamma } = event;
        const tiltX = gamma * 0.2;
        const tiltY = beta * 0.2;
        this.container.style.transform = `translate(${tiltX}px, ${tiltY}px)`;
        document.body.style.transform = `translate(${-tiltX * 0.1}px, ${-tiltY * 0.1}px)`;
    }

    handleMagneticMouseMove(e) {
        const letters = Array.from(this.container.querySelectorAll('.letter'));
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        letters.forEach(letter => {
            if (!letter.classList.contains('visible')) return;
            const rect = letter.getBoundingClientRect();
            const letterCenterX = rect.left + rect.width / 2;
            const letterCenterY = rect.top + rect.height / 2;
            const deltaX = mouseX - letterCenterX;
            const deltaY = mouseY - letterCenterY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            const maxDistance = 150;
            if (distance < maxDistance) {
                const force = 1 - (distance / maxDistance);
                const pullStrength = 15;
                const pullX = deltaX * force * (pullStrength / distance);
                const pullY = deltaY * force * (pullStrength / distance);
                letter.style.transition = 'transform 0.1s linear';
                letter.style.transform = `translate(${pullX}px, ${pullY}px)`;
            } else {
                letter.style.transition = 'transform 0.5s cubic-bezier(0.2, 1.5, 0.7, 1)';
                letter.style.transform = 'translate(0,0)';
            }
        });
    }

    handleMagneticMouseLeave() {
        const letters = Array.from(this.container.querySelectorAll('.letter'));
        letters.forEach(letter => {
            letter.style.transition = 'transform 1s cubic-bezier(0.19, 1, 0.22, 1)';
            letter.style.transform = 'translate(0,0)';
        });
    }
}
