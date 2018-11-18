function getResume(id) {
    $.ajax({
        url: '/resume',
        type: 'POST',
        data: {
            id: id
        },
        success: function (data) {
            data = JSON.parse(data.resume)
            var file = new Blob([new Uint8Array(data.data.data)]);
            var a = document.createElement('a');
            var url = window.URL.createObjectURL(file);
            a.href = url;
            a.download = data.name;
            a.click();
            window.URL.revokeObjectURL(url);
        },
        error: function () {
            console.log("getResume Failed")
        }
    });
}




$(function () {
    $.ajax({
        url: '/applicants',
        type: 'GET',
        success: function (data) {
            var $name, i, n = 1,
                total = data.length;
            $('<p>' + 'Total Applicants: ' + total + '<p>').appendTo($('#resumes'))
            for (i = 0; i < data.length; i++) {

                $name = $('<p class="col-md-1">' + n + '-' + '</p><ul class="text-center col-md-11 row">' + '<li class="col-md-6">' + '<span>' + "Name: " + '</span>' + data[i].name + '</li>' +
                    '<li class="col-md-6">' + '<span>' + "Email: " + '</span>' + data[i].email + '</li>' +
                    '<li class="col-md-6">' + '<span>' + "Phone Number: " + '</span>' + data[i].phoneNumber + '</li>' +
                    '<li class="col-md-6">' + '<span>' + "Nationality: " + '</span>' + data[i].nationality + '</li>' +
                    '<li class="col-md-6">' + '<span>' + "City: " + '</span>' + data[i].city + '</li>' +
                    '<li class="col-md-6">' + '<span>' + "Coding experiance: " + '</span>' + data[i].experiance + '</li>' +
                    '<li class="col-md-6">' + '<span>' + "Years of experiance: " + '</span>' + data[i].yearsOfExperiance + '</li>' +
                    '<li class="col-md-6">' + '<span>' + "Currently working: " + '</span>' + data[i].isWorking + '</li>' +
                    '<li class="col-md-6">' + '<span>' + "JavaScript Level: " + '</span>' + data[i].javaScript + '</li>' +
                    '<li class="col-md-6">' + '<span>' + "OOP Level: " + '</span>' + data[i].oop + '</li>' +
                    '<li class="col-md-6">' + '<span>' + "Github account link: " + '</span>' + data[i].github + '</li>' +
                    '<li class="col-md-6" ' + 'onclick=' + 'getResume(' + '"' + data[i]._id + '"' + ')' + '>' + '<span>' + "Download resume: " + '</span>' + '<span class="download">' + data[i].resume + '</span></li>' +
                    '<li id="experiance" class="col-md-12">' + '<span>' + "A brief intro about work experience: " + '</span>' + data[i].about + '</li></ul>'
                )
                n++
                $name.appendTo($('#resumes'))
            }
        },
        error: function () {
            alert.log("Error")
        }
    });
});