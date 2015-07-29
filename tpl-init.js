/*example:

 _.onTemplateReady('second', function(callback){
 callback({greetings:'example'});
 })

 */

_.onTemplateReady('firstTemplate', function(callback, attribs) {
    callback({count: 9});
})

$(document).on('click', function() {
    _.reRenderContaintTemplate('firstTemplate', function(callback) {
        var cnt = Math.floor(Math.random() * (10 - 0 + 1)) + 0;
        callback({count: cnt});
    })
})