
//  All functionality declarations for the page




////////////////////////////////////////////////////////////////
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






////////////////////////////////////////////////////////////////
// Change Template background and Extract background from Injected Template
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

function changeDecor() {
  const topImg = document.getElementById('top-decorator');
  const bottomImg = document.getElementById('bottom-decorator');
  const decorRadios = document.querySelectorAll('input[name="top-decor"], input[name="bot-decor"]');

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

// Function to display the templates of the selected category
document.addEventListener('DOMContentLoaded', function() {
  const categories = document.querySelectorAll('[data-category]');
  const radioButtons = document.querySelectorAll('input[name="temp"]');
  
  function showTemplate(categoryId) {
    categories.forEach((cat) => {
      if (cat.dataset.category === categoryId) {
        cat.classList.remove('hidden');
        cat.classList.add('active');
      } else {
        cat.classList.add('hidden');
        cat.classList.remove('active');
      }
    });
  }

  radioButtons.forEach((radio) => {
    radio.addEventListener('click', function() {
      showTemplate(this.id);
    });
  });

  showTemplate('birthday');
});

// Function to load the selected template from the category
function loadTemplate(templateId) {
  const category = templateId.split('-')[0];
  const templateFileName = templateId + '.html';

  fetch(`./templates/${category}/${templateFileName}`)
    .then((response) => response.text())
    .then((data) => {
      const updatedData = data.replace(/(\.\.\/\.\.\/assets\/)/g, './assets/');
      const parser = new DOMParser();
      const doc = parser.parseFromString(updatedData, 'text/html');
      const newTemplateWrapper = doc.querySelector('.template-wrapper');
      const inlineBackgroundImage = newTemplateWrapper.style.backgroundImage;

      if (inlineBackgroundImage && inlineBackgroundImage !== 'none') {
        const backgroundSelector = document.getElementById('background-selector');
        backgroundSelector.style.backgroundImage = inlineBackgroundImage;
        newTemplateWrapper.style.backgroundImage = 'none';
      }

      const currentWrapper = document.querySelector('.template-wrapper');
      if (currentWrapper) {
        currentWrapper.replaceWith(newTemplateWrapper);
      }
      changeBackground();
      changeDecor();
    })
    .catch((error) => {
      console.error('Error loading template:', error);
    });
}


function addBackgroundThumbnail(backgroundImage) {
  const newId = 'bg-' + document.querySelectorAll('.radioSet').length;
  const radioSet = document.createElement('div');
  radioSet.classList.add('radioSet');
  const input = document.createElement('input');
  input.type = 'radio';
  input.name = 'back-bg';
  input.id = newId;
  const label = document.createElement('label');
  label.setAttribute('for', newId);
  const span = document.createElement('span');
  span.textContent = 'New Background';
  label.appendChild(span);
  const img = document.createElement('img');
  const bgUrl = backgroundImage.match(/url\(["']?([^"']*)["']?\)/)[1];
  img.src = bgUrl;
  img.alt = 'New Background Image';
  img.setAttribute('for', newId);
  radioSet.appendChild(input);
  radioSet.appendChild(label);
  radioSet.appendChild(img);
  const backBgList = document.getElementById('backBg');
  backBgList.appendChild(radioSet);

  changeBackground();
}












//////////////////////////////////////////////////////////////
// Left sidebar toggle
document.querySelectorAll('.dropdownlink').forEach(item => {
  item.addEventListener('click', function (event) {
    const parent = this.parentElement;
    
    if (parent.classList.contains('exportMenu')) {
      return;
    }

    document.querySelectorAll('.expandable-menu li.active').forEach(activeItem => {
      activeItem.classList.remove('active');
    });

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











/////////////////////////////////////////////////////////////////
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











/////////////////////////////////////////////////////////
// Photo Frame Chnaging Options
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











///////////////////////////////////////////////////////////////
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











//////////////////////////////////////////////////////////////////////////
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










//////////////////////////////////////////////////////////////////////////
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










//////////////////////////////////////////////////////////////////////////////
// Show and hide Template divs based on selected radio button
function showTemplate(selectedId) {
  const idMap = {
    'birthday': 'birthdayTemps',
    'obituary': 'obituaryTemps',    
    'admission': 'admissionTemps',
    'promotion': 'promotionTemps',
    'inauguration': 'inaugurationTemps',
    'greetings': 'greetingTemps',
    'political': 'politicalTemps',
    'wedding': 'weddingTemps',
    'anniversary': 'anniversaryTemps',
    'retirement': 'retirementTemps',
    'coaching': 'coachingTemps',
    'wanted': 'wantedTemps',
    'events': 'eventsTemps',
    'invitations': 'invitationsTemps'
  };

  const templateDivs = document.querySelectorAll('.inner-container');
  templateDivs.forEach(div => div.classList.add('hidden'));

  const correspondingDivId = idMap[selectedId];
  if (correspondingDivId) {
    document.getElementById(correspondingDivId).classList.remove('hidden');
  }
}









////////////////////////////////////////////////////////////////////////////////
// Convert Divs into Accordion menu
document.addEventListener('DOMContentLoaded', function () {
  const accordionDivs = document.querySelectorAll('.inner-container');

  accordionDivs.forEach(div => {
    const h3 = div.querySelector('h3');
    if (h3) {
      h3.addEventListener('click', function () {
        toggleAccordion(div);
      });
    }
  });

  function toggleAccordion(element) {
    if (element.classList.contains('collapsed')) {
      element.classList.remove('collapsed');
      element.classList.add('expanded');
      element.style.height = element.scrollHeight + "px";
    } else {
      element.classList.add('collapsed');
      element.classList.remove('expanded');
      element.style.height = "36px";
    }
  }

  const toggleAllBtn = document.getElementById('toggleAllBtn');
  let allCollapsed = false;

  toggleAllBtn.addEventListener('click', function () {
    allCollapsed = !allCollapsed;
    accordionDivs.forEach(div => {
      if (allCollapsed) {
        div.classList.add('collapsed');
        div.classList.remove('expanded');
        div.style.height = "36px";
      } else {
        div.classList.remove('collapsed');
        div.classList.add('expanded');
        div.style.height = div.scrollHeight + "px";
      }
    });
  });
});














////////////////////////////////////////////////////////////////////////////////
// Set Top and Left Position of the selected element
let selectedObject = null;
function selectObject(element) {
    selectedObject = element;
    const topVal = parseInt(window.getComputedStyle(selectedObject).top) || 0;
    const leftVal = parseInt(window.getComputedStyle(selectedObject).left) || 0;

    document.querySelector('.top-pos').value = topVal;
    document.querySelector('.left-pos').value = leftVal;
}

function updatePosition() {
    const topPos = parseInt(document.querySelector('.top-pos').value) || 0;
    const leftPos = parseInt(document.querySelector('.left-pos').value) || 0;

    if (selectedObject) {
        selectedObject.style.top = `${topPos}px`;
        selectedObject.style.left = `${leftPos}px`;
        selectedObject.style.position = 'relative';
    }
}

document.querySelectorAll('.position-input').forEach((input) => {
    input.addEventListener('input', updatePosition);
});

document.querySelectorAll('.selectable').forEach((element) => {
    element.addEventListener('click', () => {
        selectObject(element);
    });
});










// //////////////////////////////////////////////////////////////////////////////
// Hide Export Menu while clicking outside of it
document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.querySelector(".exportMenu");
  const menuList = document.getElementById("mobExportDropdown");

  menuButton.addEventListener("click", function () {
    menuList.classList.toggle("active");
  });
});














// /////////////////////////////////////////////////////////////////////////////
// Add Line Decoration to the selected element
function addDecorOnRadioSelection() {
  const radioButtons = document.querySelectorAll('#lineDecors .radioSet input[type="radio"]');

  radioButtons.forEach((radio) => {
    radio.addEventListener('change', (event) => {
      if (event.target.checked) {
        const radioId = event.target.id;
        console.log(`Selected radio button ID: ${radioId}`);

        const associatedImg = document.querySelector(`#lineDecors input#${radioId} + label + .decor-img`);

        if (associatedImg) {
          console.log('Image found:', associatedImg.src);

          let imgDecorDiv = document.getElementById('imgDecor');
          
          if (!imgDecorDiv) {
            imgDecorDiv = document.createElement('div');
            imgDecorDiv.classList.add('selectable');
            imgDecorDiv.id = 'imgDecor';
            imgDecorDiv.setAttribute('data-options', 'imgEditOptions');

            const newImg = document.createElement('img');
            newImg.src = associatedImg.src;
            newImg.alt = associatedImg.alt;
            imgDecorDiv.appendChild(newImg);

            const selectedElement = document.querySelector('.template-wrapper .selectable.selected');
            const parentElement = selectedElement ? selectedElement.parentNode : null;

            if (parentElement) {
              parentElement.insertBefore(imgDecorDiv, selectedElement);
              console.log('New div with image added successfully.');
            } else {
              console.error('No parent node found for the selected element.');
            }
          } else {
            const existingImg = imgDecorDiv.querySelector('img');
            if (existingImg) {
              existingImg.src = associatedImg.src;
              existingImg.alt = associatedImg.alt;
              console.log('Image replaced in existing #imgDecor div.');
            }
          }

          imgDecorDiv.addEventListener('click', () => {
            const currentlySelected = document.querySelector('#imgDecor.selected');
            if (currentlySelected) {
              currentlySelected.classList.remove('selected');
            }

            imgDecorDiv.classList.add('selected');
            console.log(`Selected class added on click to div with id: ${imgDecorDiv.id}`);
          });

        } else {
          console.error('No corresponding image found for the selected radio button.');
        }
      }
    });
  });
}

addDecorOnRadioSelection();






// All Category Templates Filter
document.addEventListener("DOMContentLoaded", function () {
    const filterInput = document.getElementById("filterTemplates");
    const resetButton = document.getElementById("clearFilters");
    const templateContainer = document.getElementById("templates-menu-container");
    const categories = templateContainer.querySelectorAll(".inner-container");
    const defaultCategory = templateContainer.querySelector("[data-category='birthday']");

    function resetCategories() {
        categories.forEach(cat => cat.classList.add("hidden"));
        if (defaultCategory) defaultCategory.classList.remove("hidden");
    }

    function filterTemplates() {
        const filterText = filterInput.value.toLowerCase().trim();
        let hasResults = false;

        if (filterText === "") {
            resetCategories();
            resetButton.style.display = "none";
            return;
        }

        categories.forEach(category => {
            let categoryHasMatch = false;
            const radioBtns = category.querySelectorAll(".radioSet");

            radioBtns.forEach(set => {
                const labelText = set.querySelector("label span").textContent.toLowerCase();
                if (labelText.includes(filterText)) {
                    set.style.display = "flex";
                    categoryHasMatch = true;
                } else {
                    set.style.display = "none";
                }
            });

            if (categoryHasMatch) {
                category.classList.remove("hidden");
                hasResults = true;
            } else {
                category.classList.add("hidden");
            }
        });

        resetButton.style.display = hasResults ? "inline-block" : "none";
    }

    filterInput.addEventListener("input", filterTemplates);
    resetButton.addEventListener("click", function () {
        filterInput.value = "";
        categories.forEach(cat => cat.querySelectorAll(".radioSet").forEach(set => set.style.display = "flex"));
        resetCategories();
        resetButton.style.display = "none";
    });

    resetCategories();
});













// Drag and Drop Functionality for Objects
document.addEventListener("DOMContentLoaded", () => {
  const objectItems = document.querySelectorAll(".draggable-item");
  const templateWrapper = document.querySelector(".template-wrapper");
  const editOptionsPanel = document.getElementById("obj-edit-options");
  let selectedElement = null;
  let lastTapTime = 0;

  objectItems.forEach(item => {
    item.setAttribute("draggable", true);
    item.addEventListener("dragstart", dragStart);

    // Enable double-tap placement for mobile
    item.addEventListener("touchstart", (event) => {
      const currentTime = new Date().getTime();
      if (currentTime - lastTapTime < 300) {
        placeElement(item);
        event.preventDefault();
      }
      lastTapTime = currentTime;
    });
  });

  templateWrapper.addEventListener("dragover", dragOver);
  templateWrapper.addEventListener("drop", dropElement);

  function dragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.outerHTML);
  }

  function dragOver(event) {
    event.preventDefault();
  }

  function dropElement(event) {
    event.preventDefault();
    const draggedElementHTML = event.dataTransfer.getData("text/plain");
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = draggedElementHTML;
    const newElement = tempDiv.firstElementChild;

    placeElement(newElement, event.clientX, event.clientY);
  }

  function placeElement(item, x = 50, y = 50) {
    const newElement = item.cloneNode(true);
    newElement.classList.add("movable", "selectable");
    newElement.setAttribute("data-options", "objEditOptions");

    const wrapperRect = templateWrapper.getBoundingClientRect();
    newElement.style.position = "absolute";
    newElement.style.left = `${x - wrapperRect.left}px`;
    newElement.style.top = `${y - wrapperRect.top}px`;
    newElement.style.width = "100px";

    const aspectRatio = item.naturalHeight / item.naturalWidth || 1;
    newElement.style.height = `${100 * aspectRatio}px`;
    newElement.style.borderRadius = "0";
    newElement.style.opacity = "1";
    newElement.style.zIndex = "1";

    enableSelection(newElement);
    enableDragging(newElement);
    addResizeHandle(newElement, aspectRatio);

    templateWrapper.appendChild(newElement);
  }

  function enableDragging(element) {
    let offsetX, offsetY, isDragging = false;

    element.addEventListener("pointerdown", (event) => {
      if (event.target.classList.contains("resize-handle")) return;

      isDragging = true;
      const rect = element.getBoundingClientRect();
      offsetX = event.clientX - rect.left;
      offsetY = event.clientY - rect.top;
      element.style.cursor = "grabbing";

      function moveElement(moveEvent) {
        if (!isDragging) return;

        const wrapperRect = templateWrapper.getBoundingClientRect();
        let newX = moveEvent.clientX - wrapperRect.left - offsetX;
        let newY = moveEvent.clientY - wrapperRect.top - offsetY;

        element.style.left = `${newX}px`;
        element.style.top = `${newY}px`;
      }

      function stopDragging() {
        isDragging = false;
        element.style.cursor = "grab";
        document.removeEventListener("pointermove", moveElement);
        document.removeEventListener("pointerup", stopDragging);
      }

      document.addEventListener("pointermove", moveElement);
      document.addEventListener("pointerup", stopDragging);
    });
    
    // Touch support for mobile (smooth dragging)
    element.addEventListener("touchstart", (event) => {
      isDragging = true;
      const rect = element.getBoundingClientRect();
      const touch = event.touches[0];

      offsetX = touch.clientX - rect.left;
      offsetY = touch.clientY - rect.top;
      element.style.cursor = "grabbing";

      function moveElement(touchMoveEvent) {
        if (!isDragging) return;
        const touch = touchMoveEvent.touches[0];

        const wrapperRect = templateWrapper.getBoundingClientRect();
        let newX = touch.clientX - wrapperRect.left - offsetX;
        let newY = touch.clientY - wrapperRect.top - offsetY;

        element.style.left = `${newX}px`;
        element.style.top = `${newY}px`;
      }

      function stopDragging() {
        isDragging = false;
        element.style.cursor = "grab";
        document.removeEventListener("touchmove", moveElement);
        document.removeEventListener("touchend", stopDragging);
      }

      document.addEventListener("touchmove", moveElement);
      document.addEventListener("touchend", stopDragging);
    });
  }

  function addResizeHandle(element, aspectRatio) {
    const resizeHandle = document.createElement("div");
    resizeHandle.classList.add("resize-handle");
    element.appendChild(resizeHandle);

    resizeHandle.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      event.stopPropagation();

      let startX = event.clientX;
      let startWidth = parseInt(window.getComputedStyle(element).width, 10);

      function resize(event) {
        let newWidth = startWidth + (event.clientX - startX);
        element.style.width = `${newWidth}px`;
        element.style.height = `${newWidth * aspectRatio}px`;
        document.getElementById("width-input").value = newWidth;
        document.getElementById("height-input").value = newWidth * aspectRatio;
      }

      function stopResize() {
        document.removeEventListener("pointermove", resize);
        document.removeEventListener("pointerup", stopResize);
      }

      document.addEventListener("pointermove", resize);
      document.addEventListener("pointerup", stopResize);
    });
  }

  function enableSelection(element) {
    element.addEventListener("click", (event) => {
      event.stopPropagation();
      if (selectedElement) {
        selectedElement.classList.remove("selected");
      }

      selectedElement = element;
      selectedElement.classList.add("selected");
      editOptionsPanel.style.display = "flex";
      exportOptions.style.display = "none";

      // Populate editable options
      document.getElementById("width-input").value = parseInt(selectedElement.style.width);
      document.getElementById("border-radius-input").value = parseInt(selectedElement.style.borderRadius);
      document.getElementById("opacity-input").value = selectedElement.style.opacity;
      document.getElementById("z-index-input").value = selectedElement.style.zIndex;
      document.getElementById("border-thickness-input").value = selectedElement.style.borderWidth.replace("px", "") || 0;
      document.getElementById("border-color-input").value = selectedElement.style.borderColor || "#000000";
    });
  }

  // Editable Options
  document.getElementById("width-input").addEventListener("input", (e) => {
    if (selectedElement) {
      const aspectRatio = selectedElement.offsetHeight / selectedElement.offsetWidth;
      selectedElement.style.width = `${e.target.value}px`;
      selectedElement.style.height = `${e.target.value * aspectRatio}px`;
      document.getElementById("height-input").value = e.target.value * aspectRatio;
    }
  });

  document.getElementById("border-radius-input").addEventListener("input", (e) => {
    if (selectedElement) selectedElement.style.borderRadius = `${e.target.value}%`;
  });

  document.getElementById("opacity-input").addEventListener("input", (e) => {
    if (selectedElement) selectedElement.style.opacity = e.target.value;
  });

  document.getElementById("z-index-input").addEventListener("input", (e) => {
    if (selectedElement) selectedElement.style.zIndex = e.target.value;
  });

  document.getElementById("border-thickness-input").addEventListener("input", (e) => {
    if (selectedElement) selectedElement.style.borderWidth = `${e.target.value}px`;
  });

  document.getElementById("rotate-input").addEventListener("input", (e) => {
    if (selectedElement) {
        let rotationAngle = e.target.value;
        selectedElement.style.transform = `rotate(${rotationAngle}deg)`;
    }
  });

  document.getElementById("border-color-input").addEventListener("input", (e) => {
    if (selectedElement) selectedElement.style.borderColor = e.target.value;
  });

  document.getElementById("flip-btn-horizontal").addEventListener("click", () => {
    if (selectedElement) {
      selectedElement.style.transform = selectedElement.style.transform.includes("scaleX(-1)")
        ? "scaleX(1)"
        : "scaleX(-1)";
    }
  });

  document.getElementById("flip-btn-vertical").addEventListener("click", () => {
    if (selectedElement) {
      selectedElement.style.transform = selectedElement.style.transform.includes("scaleY(-1)")
        ? "scaleY(1)"
        : "scaleY(-1)";
    }
  });

  document.getElementById("delete-btn").addEventListener("click", () => {
    if (selectedElement) {
      selectedElement.remove();
      editOptionsPanel.style.display = "none";
      selectedElement = null;
    }
  });
});
