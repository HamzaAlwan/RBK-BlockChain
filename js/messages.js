
//function get(){
// var xhr = new XMLHttpRequest();
//    xhr.open("GET", 'resume');
//    xhr.responseType = "blob";
//    xhr.onload = function () {
//    if (this.status === 200) {
//       var blob = new Blob([xhr.response], {type: "application/pdf"});
//       var objectUrl = URL.createObjectURL(blob);
//       window.open(objectUrl);
//    }
//    };
//    xhr.send();
//}

// $('#hello').on('click', function () {
//     $.ajax({
//         url: '/resume',
//         method: 'GET',
//         success: function (data) {
//             var file = new Blob([new Uint8Array(data.data.data)]);
//             var a = document.createElement('a');
//             var url = window.URL.createObjectURL(file);
//             a.href = url;
//             a.download = data.name;
//             a.click();
//             window.URL.revokeObjectURL(url);
//         }
//     });
// });

//$(function () {
//    prompt("hello", "", "")
//})
    
$(function () {
  $.ajax({
        url: '/msg',
        type: 'GET',
        success: function (data) {
            var $name, i, n = 1, total = data.length;
            $('<p>' + 'Total Applicants: ' + total + '<p>').appendTo($('#messages'))
            for(i = 0; i < data.length; i++){
                $name = $('<p class="col-md-1">' + n + '-' + '</p>' + '<p class="col-md-2">' + data[i].date.substring(0, 10) + '<p><ul class="text-center col-md-9 row">' + '<li class="col-md-6">'+ '<span>' + "Name: " + '</span>' + data[i].name + '</li>'
                + '<li class="col-md-6">'+ '<span>' + "Email: " + '</span>' + data[i].email + '</li>'
                + '<li class="col-md-6">'+ '<span>' + "Phone Number: " + '</span>' + data[i].message + '</li></ul>'
                 )
                n++
                $name.appendTo($('#messages'))
            }
        },
        error: function () {
            alert.log("Error")
        }
    });
});