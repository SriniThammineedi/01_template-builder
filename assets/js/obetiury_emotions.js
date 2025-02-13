// Obitury Emotions
const iconFiles = {
    'roses': 'assets/images/roses-btn.json',
    'heart': 'assets/images/heart-btn.json'
};

const animationFiles = {
    'roses': 'assets/images/roses-anim.json',
    'heart': 'assets/images/heart-anim.json'
};

function loadIcon(buttonId, iconPath) {
    const iconElement = document.querySelector(`#${buttonId} .icon`);
    
    lottie.loadAnimation({
        container: iconElement,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: iconPath
    });
}

// Initialize animation
function playAnimation(animationPath) {
    const animationContainer = document.getElementById('animation-container');
    animationContainer.innerHTML = '';
    animationContainer.style.display = 'block';

    const animationInstance = lottie.loadAnimation({
        container: animationContainer,
        renderer: 'canvas',
        loop: false,
        autoplay: true,
        path: animationPath,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    });

    animationInstance.addEventListener('complete', function() {
        animationContainer.style.display = 'none';
    });
}

// Initialize icons and count increment
function initializeCounts(buttonId) {
    const countLabel = document.querySelector(`#${buttonId} .count`);
    let storedCount = localStorage.getItem(`${buttonId}-count`);
    if (!storedCount) {
        storedCount = 0;
        localStorage.setItem(`${buttonId}-count`, storedCount);
    }
    countLabel.textContent = storedCount;
}

function toggleCount(buttonId) {
    const countLabel = document.querySelector(`#${buttonId} .count`);
    let count = parseInt(countLabel.textContent, 10);
    let isIncremented = localStorage.getItem(`${buttonId}-incremented`);

    if (isIncremented === 'true') {
        count -= 1;
        localStorage.setItem(`${buttonId}-incremented`, 'false');
    } else {
        count += 1;
        localStorage.setItem(`${buttonId}-incremented`, 'true');
    }

    localStorage.setItem(`${buttonId}-count`, count);
    countLabel.textContent = count;

    if (count === 1) {
        playAnimation(animationFiles[buttonId]);
    }
}

function setupButtons() {
    Object.keys(iconFiles).forEach(buttonId => {
        loadIcon(buttonId, iconFiles[buttonId]);
        initializeCounts(buttonId);
        
        document.getElementById(buttonId).addEventListener('click', function() {
            toggleCount(buttonId);
        });
    });
}

setupButtons();