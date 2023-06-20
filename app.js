document.addEventListener('DOMContentLoaded', function() {
  var imageFileInput = document.getElementById('imageFile');
  var convertBtn = document.getElementById('convertBtn');
  var preview = document.getElementById('preview');
  
  convertBtn.addEventListener('click', function() {
    var imageFile = imageFileInput.files[0];
    
    if (imageFile) {
      var reader = new FileReader();
      
      reader.onload = function(event) {
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
          
          // Append the converted image to the preview element
          preview.innerHTML = '';
          preview.appendChild(convertedImage);
        };
        
        image.src = event.target.result;
      };
      
      reader.readAsDataURL(imageFile);
    }
  });
});
