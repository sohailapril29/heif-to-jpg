document.addEventListener('DOMContentLoaded', function() {
  var imageFileInput = document.getElementById('imageFile');
  var convertBtn = document.getElementById('convertBtn');
  var downloadBtn = document.getElementById('downloadBtn');
  var preview = document.getElementById('preview');
  var convertedImages = [];

  convertBtn.addEventListener('click', function() {
    var imageFiles = imageFileInput.files;

    if (imageFiles.length > 0) {
      convertBtn.disabled = true;

      for (var i = 0; i < imageFiles.length; i++) {
        var imageFile = imageFiles[i];
        var reader = new FileReader();

        reader.onload = (function(file) {
          return function(event) {
            var image = new Image();

            image.onload = function() {
              var canvas = document.createElement('canvas');
              var ctx = canvas.getContext('2d');

              // Set canvas dimensions to match the image
              canvas.width = image.width;
              canvas.height = image.height;

              // Draw the image onto the canvas
              ctx.drawImage(image, 0, 0);

              // Convert the canvas to a Blob representing a JPEG image
              canvas.toBlob(function(blob) {
                // Create a new file from the Blob
                var convertedImageFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpg", { type: "image/jpeg" });

                // Create a new image element for the converted image
                var convertedImage = document.createElement('img');
                convertedImage.src = URL.createObjectURL(convertedImageFile);
                convertedImage.alt = 'Converted Image';

                // Create a grid item to hold the converted image
                var gridItem = document.createElement('div');
                gridItem.classList.add('grid-item');
                gridItem.appendChild(convertedImage);

                // Append the grid item to the preview container
                preview.appendChild(gridItem);

                // Add the converted image to the array
                convertedImages.push(convertedImageFile);

                // Enable download button if all images are converted
                if (convertedImages.length === imageFiles.length) {
                  downloadBtn.disabled = false;
                }
              }, 'image/jpeg', 1);
            };

            image.src = event.target.result;
          };
        })(imageFile);

        reader.readAsDataURL(imageFile);
      }
    }
  });

  downloadBtn.addEventListener('click', function() {
    var zip = new JSZip();

    convertedImages.forEach(function(imageFile) {
      zip.file(imageFile.name, imageFile);
    });

    zip.generateAsync({ type: 'blob' })
      .then(function(blob) {
        saveAs(blob, 'converted_images.zip');
      });
  });
});
