$(document).ready(function() {
    // Handle form submission
    $("#uploadForm").submit(function(event) {
      event.preventDefault();
      var form = $(this)[0];
      var formData = new FormData(form);
  
      $.ajax({
        type: "POST",
        url: "/convert",
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
          // Display the converted image
          $("#outputContainer").show();
          $("#outputImage").attr("src", response.image_url);
          $("#downloadLink").attr("href", response.image_url);
        },
        error: function(error) {
          alert("Error converting image: " + error.responseText);
        }
      });
    });
  });
  