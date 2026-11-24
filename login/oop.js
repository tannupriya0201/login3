const editor = document.getElementById('editor');
         const previewModal = document.getElementById('previewModal');
         const previewContent = document.getElementById('previewContent');
         const addImageButton = document.getElementById('addImageButton');
         const addVideoButton = document.getElementById('addVideoButton');
         const newPageButton = document.getElementById('newPageButton');
         const previewButton = document.getElementById('previewButton');
         const logoutButton = document.getElementById('logoutButton');
 
         // Add a new page
         newPageButton.addEventListener('click', () => {
             const newPage = document.createElement('div');
             newPage.className = 'page';
             newPage.contentEditable = true;
             newPage.textContent = 'New Page';
             newPage.addEventListener('dragover', (e) => e.preventDefault());
             newPage.addEventListener('drop', handleDrop);
             editor.appendChild(newPage);
         });
 
         // Add an image
         addImageButton.addEventListener('click', () => {
             const input = document.createElement('input');
             input.type = 'file';
             input.accept = 'image/*';
             input.onchange = (e) => {
                 const file = e.target.files[0];
                 if (file) {
                     const img = document.createElement('img');
                     img.src = URL.createObjectURL(file);
                     img.style.width = '100%';
                     img.style.marginTop = '10px';
                     editor.querySelector('.page:last-child').appendChild(img);
                 }
             };
             input.click();
         });
 
         // Add a video
         addVideoButton.addEventListener('click', () => {
             const input = document.createElement('input');
             input.type = 'file';
             input.accept = 'video/*';
             input.onchange = (e) => {
                 const file = e.target.files[0];
                 if (file) {
                     const video = document.createElement('video');
                     video.src = URL.createObjectURL(file);
                     video.controls = true;
                     video.style.width = '100%';
                     video.style.marginTop = '10px';
                     editor.querySelector('.page:last-child').appendChild(video);
                 }
             };
             input.click();
         });
 
         // Drag and Drop
         document.addEventListener('dragstart', (e) => {
             if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO') {
                 e.dataTransfer.setData('text/plain', e.target.outerHTML);
             }
         });
 
         function handleDrop(e) {
             e.preventDefault();
             const html = e.dataTransfer.getData('text/plain');
             e.target.insertAdjacentHTML('beforeend', html);
         }
 
         // Preview
         previewButton.addEventListener('click', () => {
             previewContent.innerHTML = editor.innerHTML;
             previewModal.style.display = 'flex';
         });
 
         function closePreview() {
             previewModal.style.display = 'none';
         }