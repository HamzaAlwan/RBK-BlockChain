$(function () {
    $.ajax({
        url: '/msg',
        type: 'GET',
        success: function (data) {
            var $name, i, n = 1,
                total = data.length;
            $('<p>' + 'Total Messages: ' + total + '<p>').appendTo($('#messages'))
            for (i = 0; i < data.length; i++) {
                $name = $('<p class="col-md-1">' + n + '-' + '</p>' + '<p class="col-md-2">' + data[i].date.substring(0, 10) + '<p><ul class="text-center col-md-9 row">' + '<li class="col-md-6">' + '<span>' + "Name: " + '</span>' + data[i].name + '</li>' +
                    '<li class="col-md-6">' + '<span>' + "Email: " + '</span>' + data[i].email + '</li>' +
                    '<li class="col-md-6">' + '<span>' + "Phone Number: " + '</span>' + data[i].message + '</li></ul>'
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