
function getActivePage() {
  return document.querySelector('.page.active');
}


document.getElementById('canvas').addEventListener('click', function (e) {
  if (e.target.classList.contains('page')) {
      document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
      e.target.classList.add('active');
  }
});


document.getElementById('addText').addEventListener('click', function () {
  const activePage = getActivePage();
  if (activePage) {
      const textElement = document.createElement('div');
      textElement.contentEditable = true;
      textElement.innerText = "Editable Text";
      textElement.style.margin = "10px 0";
      textElement.style.border = "1px dashed gray";
      textElement.style.padding = "5px";
      textElement.style.cursor = "text";
      activePage.appendChild(textElement);
  } else {
      alert("Please select a page.");
  }
});


document.getElementById('addImage').addEventListener('click', function () {
  const activePage = getActivePage();
  if (activePage) {
      const imgInput = document.createElement('input');
      imgInput.type = 'file';
      imgInput.accept = 'image/*';
      imgInput.addEventListener('change', function (event) {
          const file = event.target.files[0];
          if (file) {
              const imgElement = document.createElement('img');
              imgElement.src = URL.createObjectURL(file);
              imgElement.style.maxWidth = "100%";
              imgElement.style.margin = "10px 0";
              imgElement.style.cursor = "move";
              imgElement.style.position = "relative";  // Allows for resizing

              
              activePage.appendChild(imgElement);

              
              addResizeHandles(imgElement);
          }
      });
      imgInput.click();
  } else {
      alert("Please select a page.");
  }
});


function addResizeHandles(imgElement) {
  const resizeHandle = document.createElement('div');
  resizeHandle.style.width = '10px';
  resizeHandle.style.height = '10px';
  resizeHandle.style.position = 'absolute';
  resizeHandle.style.bottom = '0';
  resizeHandle.style.right = '0';
  resizeHandle.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  resizeHandle.style.cursor = 'se-resize';
  imgElement.appendChild(resizeHandle);

  let isResizing = false;

 
  resizeHandle.addEventListener('mousedown', function (e) {
      e.preventDefault();
      isResizing = true;

      
      const startX = e.clientX;
      const startY = e.clientY;
      const startWidth = imgElement.offsetWidth;
      const startHeight = imgElement.offsetHeight;

     
      function onMouseMove(e) {
          if (isResizing) {
              const newWidth = startWidth + (e.clientX - startX);
              const newHeight = startHeight + (e.clientY - startY);

             
              imgElement.style.width = newWidth + 'px';
              imgElement.style.height = newHeight + 'px';
          }
      }

      
      function onMouseUp() {
          isResizing = false;
          window.removeEventListener('mousemove', onMouseMove);
          window.removeEventListener('mouseup', onMouseUp);
      }

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
  });
}








document.getElementById('addPage').addEventListener('click', function () {
  const newPage = document.createElement('div');
  newPage.classList.add('page');
  newPage.contentEditable = true;
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  newPage.classList.add('active');
  document.getElementById('canvas').appendChild(newPage);
});


document.getElementById('changeBgColor').addEventListener('click', function () {
  const activePage = getActivePage();
  if (activePage) {
      const color = prompt("Enter a background color (e.g., #f0f0f0 or lightblue):");
      if (color) {
          activePage.style.backgroundColor = color;
      }
  } else {
      alert("Please select a page.");
  }
});


document.getElementById('fontSelector').addEventListener('change', function () {
  const activePage = getActivePage();
  if (activePage) {
      const selectedFont = this.value;
      activePage.style.fontFamily = selectedFont;
  } else {
      alert("Please select a page.");
  }
});


document.getElementById('textAlignLeft').addEventListener('click', function () {
  const activePage = getActivePage();
  if (activePage) {
      activePage.style.textAlign = "left";
  } else {
      alert("Please select a page.");
  }
});

document.getElementById('textAlignCenter').addEventListener('click', function () {
  const activePage = getActivePage();
  if (activePage) {
      activePage.style.textAlign = "center";
  } else {
      alert("Please select a page.");
  }
});

document.getElementById('textAlignRight').addEventListener('click', function () {
  const activePage = getActivePage();
  if (activePage) {
      activePage.style.textAlign = "right";
  } else {
      alert("Please select a page.");
  }
});


document.getElementById('download').addEventListener('click', function () {
  const element = document.getElementById('canvas');
  const opt = {
      margin: 1,
      filename: 'ebook.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  html2pdf().from(element).set(opt).save();
});


const previewModal = document.getElementById("previewModal");
const previewCanvas = document.getElementById("previewCanvas");

document.getElementById("preview").addEventListener("click", function () {
  previewModal.style.display = "block";

  
  previewCanvas.innerHTML = '';

  
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => {
      const clonedPage = page.cloneNode(true);
      previewCanvas.appendChild(clonedPage);
  });
});

const closeModal = document.getElementsByClassName("close")[0];
closeModal.addEventListener("click", function () {
  previewModal.style.display = "none";
});

window.onclick = function (event) {
  if (event.target == previewModal) {
      previewModal.style.display = "none";
  }
};


runSpeechRecog = () => {
  document.getElementById("output").innerHTML = "Loading text...";
  var output = document.getElementById('output');
  var action = document.getElementById('action');
  let recognization = new webkitSpeechRecognition();
  recognization.onstart = () => {
     action.innerHTML = "Listening...";
  }
  recognization.onresult = (e) => {
     var transcript = e.results[0][0].transcript;
     output.innerHTML = transcript;
     output.classList.remove("hide")
     action.innerHTML = "";
  }
  recognization.start();
};


document.getElementById('bookmark').addEventListener('click', function () {
  const selection = window.getSelection();
  if (selection.rangeCount) {
      const range = selection.getRangeAt(0);
      const bookmark = document.createElement('span');
      bookmark.classList.add('bookmark');
      bookmark.innerText = '[BOOKMARK]';
      range.deleteContents();
      range.insertNode(bookmark);
  }
});



// Check for browser compatibility for SpeechRecognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

let isListening = false;

// Function to get the active page
function getActivePage() {
    return document.querySelector('.page.active');
}

// Set up the Voice Typing button click event
document.getElementById('voiceTyping').addEventListener('click', function () {
    if (isListening) {
        recognition.stop(); // Stop voice recognition
        this.textContent = 'Start Voice Typing'; // Change button text
    } else {
        recognition.start(); // Start voice recognition
        this.textContent = 'Stop Voice Typing'; // Change button text
    }
    isListening = !isListening; // Toggle the listening state
});

// Event listener for when the SpeechRecognition API gets a result
recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript; // Get the transcribed text
    const activePage = getActivePage();
    if (activePage) {
        const textElement = document.createElement('div');
        textElement.contentEditable = true;
        textElement.innerText = transcript; // Add the transcribed text
        textElement.style.margin = "10px 0";
        textElement.style.border = "1px dashed gray";
        textElement.style.padding = "5px";
        textElement.style.cursor = "text";
        activePage.appendChild(textElement); // Append the text to the active page
    }
};

// Handle any errors that occur with speech recognition
recognition.onerror = function (event) {
    console.error("Speech recognition error: ", event.error);
};

// Reset the button text when the recognition ends
recognition.onend = function () {
    isListening = false;
    document.getElementById('voiceTyping').textContent = 'Start Voice Typing'; // Change button text
};



