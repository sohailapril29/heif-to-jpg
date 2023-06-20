from flask import Flask, render_template, request, jsonify
from PIL import Image
import os
import uuid

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/convert', methods=['POST', 'GET'])
def convert():
    if request.method == 'POST':
        image_file = request.files['imageFile']
        if image_file:
            # Generate a unique filename
            filename = str(uuid.uuid4()) + '.jpg'
            # Save the image temporarily
            temp_path = os.path.join('temp', filename)
            image_file.save(temp_path)

            try:
                # Open and convert the HEIF image to JPG
                image = Image.open(temp_path)
                output_path = os.path.join('converted', filename)
                image.save(output_path, 'JPEG')

                response = {
                    'image_url': output_path
                }
                return jsonify(response)
            except Exception as e:
                return str(e)
            finally:
                # Remove the temporary HEIF image file
                os.remove(temp_path)

        return 'No image file received'

    return 'Method Not Allowed'

if __name__ == '__main__':
    app.run(debug=True)
