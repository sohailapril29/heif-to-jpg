document.addEventListener('DOMContentLoaded', function() {
  var imageFileInput = document.getElementById('imageFile');
  var convertBtn = document.getElementById('convertBtn');
  var preview = document.getElementById('preview');
  
  convertBtn.addEventListener('click', function() {
    var imageFiles = imageFileInput.files;
    
    if (imageFiles.length > 0) {
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
              
              // Convert the canvas to a Data URL representing a JPEG image
              var convertedImageData = canvas.toDataURL('image/jpeg');
              
              // Create a new image element for the converted image
              var convertedImage = document.createElement('img');
              convertedImage.src = convertedImageData;
              convertedImage.alt = 'Converted Image';
              
              // Create a grid item to hold the converted image
              var gridItem = document.createElement('div');
              gridItem.classList.add('grid-item');
              gridItem.appendChild(convertedImage);
              
              // Append the grid item to the preview container
              preview.appendChild(gridItem);
            };
            
            image.src = event.target.result;
          };
        })(imageFile);
        
        reader.readAsDataURL(imageFile);
      }
    }
  });
});
