/*first initial template*/
_.onTemplateReady('firstTemplate', function(callback, attribs) {
    callback({count: 9});
});

/*if need reinitial tpl you must usage reRenderContaintTemplate with tamplate name at first param and
* function with any logic on second param. At the end of function callback
* */
$(document).on('click', function() {
    _.reRenderSingleTemplate('firstTemplate', function(callback) {
        var max = 10, min = 0;
        var cnt = Math.floor(Math.random() * (max - min + 1)) + min;
        callback({count: cnt});
    })
});