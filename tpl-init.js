/*first initial template*/
_.onTemplateReady('firstTemplate', function (callback, attribs) {
    //nothing happens because firstTemplate has attrib renderOnRequest equals 1
    callback({count: 5});
});
_.onTemplateReady('secondTemplate', function (callback, attribs) {
    //now secondTemplate will be rendered
    callback({count: 6});
});
/*if need reinitial tpl you must usage reRenderSingleTemplate with tamplate name at first param and
 * function with any logic on second param. At the end of function callback
 * */
$(document).on('click', function () {
    _.reRenderSingleTemplate('singleTemplate', function (callback) {
        //singleTemplate missing on page. nothing happens.
        var max = 7, min = 0;
        var cnt = Math.floor(Math.random() * (max - min + 1)) + min;
        callback({count: cnt});
    });

    if (!_.isRendered('firstTemplate')) {
        _.removeFromPage('secondTemplate'); //remove secondTemplate
        _.renderSingleTemplate('firstTemplate', function (callback) { //render firstTemplate
            callback({count: 3});
        })
    };

    setInterval(function(){
        _.reRenderSingleTemplate('firstTemplate', function (callback) {
            var max = 7, min = 0;
            var cnt = Math.floor(Math.random() * (max - min + 1)) + min;
            callback({count: cnt});
        })
    }, 3000);


});