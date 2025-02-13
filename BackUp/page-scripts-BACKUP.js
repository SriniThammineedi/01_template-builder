//  All functionality declarations for the page


// Change theme mode from Dark to Light and Light to Dark
document.getElementById('change-theme').addEventListener('click', function () {
  var themeContainer = document.getElementById('themeOuter');

  if (themeContainer.classList.contains('theme-dark')) {
    themeContainer.classList.remove('theme-dark');
    themeContainer.classList.add('theme-light');
  } else {
    themeContainer.classList.remove('theme-light');
    themeContainer.classList.add('theme-dark');
  }
});






// Function to change background based on selected radio button
window.onload = function () {
  changeBackground();
  changeDecor();
  setupEditableOptions();
};

function changeBackground() {
  const backgroundSelector = document.getElementById('background-selector');
  const bgRadios = document.querySelectorAll('input[name="back-bg"]');

  bgRadios.forEach((radio) => {
    radio.addEventListener('change', function () {
      if (this.checked) {
        const imgElement = document.querySelector(`img[for='${this.id}']`);

        if (imgElement) {
          backgroundSelector.style.backgroundImage = `url(${imgElement.src})`;

        } else {
          console.error(`Image for background radio ID ${this.id} not found`);
        }
      }
    });
  });
}

// Change decorators on Background Both Top and Bottom at a time
function changeDecor() {
  const topImg = document.getElementById('top-decorator');
  const bottomImg = document.getElementById('bottom-decorator');
  const decorRadios = document.querySelectorAll('input[name="back-decor"]');

  decorRadios.forEach((radio) => {
    radio.addEventListener('change', function () {
      if (this.checked) {
        const imgElement = document.querySelector(`img[for='${this.id}']`);

        if (imgElement) {

          if (imgElement.classList.contains('top-center')) {
            topImg.src = imgElement.src;
          } else if (imgElement.classList.contains('bottom-center')) {
            bottomImg.src = imgElement.src;
          }
        } else {
          console.error(`Image for decor radio ID ${this.id} not found`);
        }
      }
    });
  });
}







// Left sidebar toggle
document.querySelectorAll('.dropdownlink').forEach(item => {
  item.addEventListener('click', function () {
    document.querySelectorAll('.expandable-menu li.active').forEach(activeItem => {
      activeItem.classList.remove('active');
    });

    const parent = this.parentElement;
    parent.classList.add('active');
    const parentId = parent.id;
    const menuContainerId = parentId + '-menu-container';
    const workSpace = document.getElementById('designerSpace');

    document.querySelectorAll('.accorParentContainer.active').forEach(activeMenu => {
      activeMenu.classList.remove('active');
    });

    const menuContainer = document.getElementById(menuContainerId);
    if (menuContainer) {
      menuContainer.classList.add('active');
    }


    document.querySelector('.asideLeft').classList.add('expanded');
    workSpace.classList.add('shrink');
  });
});

document.querySelectorAll('.accorParentContainer').forEach(menu => {
  const closeButton = menu.querySelector('.close-btn');

  if (closeButton) {
    closeButton.addEventListener('click', function () {
      document.querySelectorAll('.expandable-menu li.active').forEach(activeItem => {
        activeItem.classList.remove('active');
      });

      menu.classList.remove('active');
      document.querySelector('.asideLeft').classList.remove('expanded');
      document.getElementById('designerSpace').classList.remove('shrink');
    });
  }

  window.addEventListener('click', function (event) {
    if (!menu.contains(event.target) && !event.target.closest('.dropdownlink')) {
      menu.classList.remove('active');
      document.querySelector('.asideLeft').classList.remove('expanded');
      document.getElementById('designerSpace').classList.remove('shrink');
    }
  });

  menu.addEventListener('click', function (event) {
    event.stopPropagation();
  });
});







// Show Editable Options At Right Panel Based On Selected Section
function showSectionOptions(optionsId) {
  document.querySelectorAll('.edit-options').forEach(optionDiv => {
    optionDiv.style.display = 'none';
  });

  const optionsDiv = document.getElementById(optionsId);
  if (optionsDiv) {
    optionsDiv.style.display = 'flex';
  }
}

document.querySelectorAll('.selectable').forEach(section => {
  section.addEventListener('click', function (event) {
    event.stopPropagation();

    document.querySelectorAll('.selectable').forEach(sec => sec.classList.remove('selected'));

    section.classList.add('selected');

    const optionsId = section.getAttribute('data-options');

    showSectionOptions(optionsId);
  });
});

document.getElementById('designerSpace').addEventListener('click', function (event) {
  event.stopPropagation();

  document.querySelectorAll('.selectable').forEach(sec => sec.classList.remove('selected'));
  document.querySelectorAll('.edit-options').forEach(optionDiv => {
    optionDiv.style.display = 'none';
    document.getElementById('exportOptions').style.display = 'flex';
  });
});






// Export Template from HTML to Image Using Canvas Converter
document.querySelectorAll('.publishBtn').forEach(button => {
  button.addEventListener('click', function () {
    const element = document.getElementById('themeOuter');
    const loadingDiv = document.getElementById('loadingDiv');

    loadingDiv.style.display = 'flex';

    setTimeout(function () {
      const isMobile = window.innerWidth < 992;
      const scale = isMobile ? (1080 / element.offsetWidth) : 2.77;

      html2canvas(element, {
        scale: scale,
        useCORS: true,
        logging: true,
      }).then(function (canvas) {
        const imgData = canvas.toDataURL('image/png');

        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'template-image.png';
        link.click();

        loadingDiv.style.display = 'none';
      });
    }, 3000);
  });
});






// Change Photo Frame From Right Panel
const headFrame = document.getElementById('temp-header');
const head1 = document.getElementById('head-1');
const head2 = document.getElementById('head-2');
const head3 = document.getElementById('head-3');
const head4 = document.getElementById('head-4');

function updateClass() {
  if (head1.checked) {
    headFrame.classList.remove('set-2', 'set-3', 'set-4');
    headFrame.classList.add('default');
  } else if (head2.checked) {
    headFrame.classList.remove('default', 'set-3', 'set-4');
    headFrame.classList.add('set-2');
  } else if (head3.checked) {
    headFrame.classList.remove('default', 'set-2', 'set-4');
    headFrame.classList.add('set-3');
  } else if (head4.checked) {
    headFrame.classList.remove('default', 'set-2', 'set-3');
    headFrame.classList.add('set-4');
  }
}

head1.addEventListener('change', updateClass);
head2.addEventListener('change', updateClass);
head3.addEventListener('change', updateClass);
head4.addEventListener('change', updateClass);





// Update caption styles on header from edit panel
let selectedElement = null;

function setupEditableOptions() {
  document.querySelectorAll('.selectable').forEach(element => {
    element.addEventListener('click', function () {
      selectedElement = this;
      updateOptionsPanel(selectedElement);
    });
  });

  const customFontDropdown = document.getElementById('customFontDropdown');
  const selectedFontDiv = customFontDropdown.querySelector('.selected-font');
  const fontDropdown = customFontDropdown.querySelector('.font-dropdown');
  const fontOptions = customFontDropdown.querySelectorAll('.font-option');

  selectedFontDiv.addEventListener('click', function () {
    fontDropdown.classList.toggle('show');
  });

  fontOptions.forEach(option => {
    option.addEventListener('click', function () {
      const fontName = this.getAttribute('data-font');
      selectedFontDiv.textContent = this.textContent.trim();
      if (selectedElement) {
        selectedElement.style.fontFamily = fontName;
      }
      fontDropdown.classList.remove('show');
    });
  });

  const fontSizeSelect = document.getElementById('fontSize');
  const fontStyleSelect = document.getElementById('fontStyle');
  const fontWeightSelect = document.getElementById('fontWeight');
  const textAlignSelect = document.getElementById('textAlign');
  const textColorInput = document.getElementById('textColor');

  fontSizeSelect.addEventListener('change', function () {
    if (selectedElement) {
      selectedElement.style.fontSize = this.value + 'px';
    }
  });

  fontStyleSelect.addEventListener('change', function () {
    if (selectedElement) {
      selectedElement.style.fontStyle = this.value;
    }
  });

  fontWeightSelect.addEventListener('change', function () {
    if (selectedElement) {
      selectedElement.style.fontWeight = this.value;
    }
  });

  textAlignSelect.addEventListener('change', function () {
    if (selectedElement) {
      selectedElement.style.textAlign = this.value;
    }
  });

  textColorInput.addEventListener('input', function () {
    if (selectedElement) {
      selectedElement.style.color = this.value;
    }
  });
}

function updateOptionsPanel(element) {
  const computedStyle = window.getComputedStyle(element);
  const fontFamily = computedStyle.fontFamily.split(',')[0].trim().replace(/['"]/g, '').toLowerCase();
  const fontWeight = computedStyle.fontWeight;

  const selectedFontDiv = document.querySelector('.selected-font');
  selectedFontDiv.textContent = fontFamily;

  const fontWeightSelect = document.getElementById('fontWeight');
  Array.from(fontWeightSelect.options).forEach(option => {
    option.selected = option.value === (fontWeight === 'bold' ? '700' : fontWeight);
  });

  document.getElementById('fontSize').value = parseInt(computedStyle.fontSize);
  document.getElementById('fontStyle').value = computedStyle.fontStyle;
  document.getElementById('textAlign').value = computedStyle.textAlign;
  document.getElementById('textColor').value = rgbToHex(computedStyle.color);
}

function rgbToHex(rgb) {
  const rgbArray = rgb.match(/\d+/g);
  return rgbArray ? `#${((1 << 24) + (parseInt(rgbArray[0]) << 16) + (parseInt(rgbArray[1]) << 8) + parseInt(rgbArray[2])).toString(16).slice(1)}` : '#000000';
}







// Add New class to asideRight Panel to show and hide in mobile divices
document.addEventListener('DOMContentLoaded', function () {
  const asideRight = document.querySelector('.asideRight');
  const mainArea = document.getElementById('designerSpace');
  const toggleButton = document.getElementById('mobileToggle');
  const toggleSpan = toggleButton.querySelector('span');
  
  mainArea.classList.remove('lessHeight');
  asideRight.classList.remove('hideDiv');
  
  toggleButton.addEventListener('click', function () {
    if (window.innerWidth < 992) {
      const hasLessHeight = mainArea.classList.contains('lessHeight');

      if (!hasLessHeight) {
        mainArea.classList.add('lessHeight');
        asideRight.classList.add('hideDiv');
        toggleSpan.textContent = 'Hide';
      } else {
        if (!document.querySelector('.selectable.selected')) {
          mainArea.classList.remove('lessHeight');
          asideRight.classList.remove('hideDiv');
        }
        toggleSpan.textContent = 'Show';
      }
    }
  });

  document.querySelectorAll('.selectable').forEach(item => {
    item.addEventListener('click', function () {
      if (window.innerWidth < 992) {
        this.classList.toggle('selected');

        const anySelected = document.querySelector('.selectable.selected');

        if (anySelected) {
          mainArea.classList.add('lessHeight');
          asideRight.classList.remove('hideDiv');          
          toggleSpan.textContent = 'Show';
        } else {
          mainArea.classList.add('lessHeight');
          asideRight.classList.add('hideDiv');
          toggleSpan.textContent = 'Hide';
        }
      }
    });
  });
});







// Add ClipArt to the selected element
const radios = document.querySelectorAll('input[name="siders"]');

radios.forEach(radio => {
  radio.addEventListener('change', function() {
    const selectedImageSrc = this.getAttribute('data-img');
    const clipArts = document.querySelectorAll('#temp-header .clipArt');

    clipArts.forEach(clipArt => {
      const imgTag = clipArt.querySelector('img');
      if (imgTag) {
        imgTag.src = selectedImageSrc;
      }

      clipArt.classList.add('active');
    });
  });
});


