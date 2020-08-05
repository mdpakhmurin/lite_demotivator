function createImage(url, text){
    var img = new Image();
    img.src = url;
    img.crossOrigin = 'anonymous';

    img.onload = function(){
        var newImgHeight = img.height*400/img.width;

        text = text.split('\n')

        var canvas = document.createElement('canvas');
        var context = canvas.getContext("2d");
        canvas.width = 500;
        canvas.height = 120+newImgHeight+Object.keys(text).length*30;

        context.fillRect(0, 0, canvas.width, canvas.height);

        context.drawImage(img, 50, 50, 400, newImgHeight);

        context.strokeStyle="#FFFFFF";
        context.lineWidth = 3;
        context.strokeRect(45, 45, 410, newImgHeight+10);

        context.font = "30px Times New Roman";
        context.fillStyle = "white";
        context.textAlign = "center";
        text.forEach(function(item, i, text) {
            context.fillText(item, 250, newImgHeight + 100 + 30*i);
        });

        var resultimage = new Image();
        resultimage.src = canvas.toDataURL("image/png");
        document.body.appendChild(resultimage);
    };
}

function readFile(input) {
    let file = input.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function() {
        document.forms.inputForm.url.value = reader.result;
    };
}

function send(){
    var form = document.forms.inputForm;
    document.forms.inputForm.remove();

    createImage(form.elements.url.value, form.elements.text.value);
}