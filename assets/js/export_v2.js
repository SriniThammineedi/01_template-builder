

document.querySelectorAll('.exportBtn').forEach(button => {
    button.addEventListener('click', async function () {
        const loadingDiv = document.getElementById('loadingDiv');
        loadingDiv.style.display = 'flex';
        button.disabled = true;
        await new Promise(resolve => setTimeout(resolve, 2000));
        try {
            if (button.classList.contains('exportAsHTML')) {
                await exportAsHTML();
            } else if (button.classList.contains('exportAsImage')) {
                await exportAsImage();
            }
        } finally {
            loadingDiv.style.display = 'none';
            button.disabled = false;
        }
    });
});


async function exportAsHTML() {
    const content = document.getElementById('themeOuter').outerHTML;
    let styles = '';
    const cssFile = 'assets/css/temp_builder_mainV2.css';
    const response = await fetch(cssFile);
    const data = await response.text();
    const updatedCSS = data.replace(/(\.\.\/images\/)/g, 'assets/images/');
        
        styles = `<style>
            ${updatedCSS}
            .overlay {
                position: absolute;
                inset: 0;
                background: rgba(0, 0, 0, 0);
                z-index: 10;
                pointer-events: all;
            }
        </style>`;

        const overlayDiv = `<div class="overlay"></div>`;
        
        const htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Exported Template</title>

                <!-- Google Fonts Declaration -->
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto+Slab:wght@100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&family=Doppio+One&family=Birthstone&family=Bowlby+One&display=swap"
                    rel="stylesheet" />

                <!-- Telugu Fonts -->
                <link
                    href="https://fonts.googleapis.com/css2?family=Akaya+Telivigala&family=Chathura:wght@100;300;400;700;800&family=Dhurjati&family=Gurajada&family=Lakki+Reddy&family=Mallanna&family=Mandali&family=NTR&family=Ramabhadra&family=Tiro+Telugu:ital@0;1&family=Anek+Telugu:wght@100..800&display=swap"
                    rel="stylesheet">
                ${styles}
            </head>
            <body>
                ${content}
                ${overlayDiv}
            </body>
            </html>`;

        const blob = new Blob([htmlContent], { type: 'text/html' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'exported_template.html';
        link.click();
}

// Export script for exporting as image/webview
async function exportAsImage() {
    const targetElement = document.getElementById('themeOuter');
    const isMobile = window.innerWidth <= 768;
    const scale = isMobile ? (1080 / targetElement.offsetWidth) : 2.5;

    const canvas = await html2canvas(targetElement, {
        scale: scale,
        useCORS: true,
    });
        const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'exported_template.png';
    link.click();
}


