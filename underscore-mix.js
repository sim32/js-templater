/*надстройка над шаблонизатором underscore*/
var templatesEvents = [];
var renderedView  = [];

_.templateSettings.variable = "fv"; // front variables

_.mixin({

    /*на входе имя шаблона и колбэк*/
    onTemplateReady: function(name, callback) {
        if(!_.isString(name) | !_.isFunction(callback)) {
            return false;
        }

        templatesEvents.push({element: name, callback: callback });
    },

    /*на входе имя шаблона*/
    destroyEvents: function(element) {
        if(!_.isString(element)) {
            return false;
        }
        templatesEvents = _.reject(templatesEvents, function(event) {
            if(event.element != element) return true;
        })
    },

    reRenderContaintTemplate: function(name, callback) {
        var id = _.getIdByTplName(name);
        var templateText = _.findWhere(renderedView, {id: id}).templateText;

        if(!_.isUndefined(id)) {
            var deprElement = $('[template-id='+id+']');
            if(deprElement.length) {

                var renderer = _.partial(function(replacement, result) {
                    var func = _.template(templateText);

                    renderedView = _.reject(renderedView, function(elem) {
                        if(id == elem.id) return true;
                    });

                    var html = func( result );
                    id =  _.uniqueId('tpl_');

                    $(replacement).replaceWith($('<container>'+html+'</container>').attr('template-id', id));



                    renderedView.push({
                        name: name,
                        id: id,
                        templateText: templateText

                    });

                }, deprElement);

                callback(renderer);
            }
        }
    },

    renderContaintTemplate: function() {
        $( document ).ready( function() {
            $('.template').each(function(index, val) {
                var templateText = $(val).text();
                var attrs = _.where(templatesEvents, {element: $(val).attr('name') });


                if(_.size(attrs) > 0) {
                    _.each(attrs, function(element, index, list) {

                        var renderer = _.partial(function(val, result) {
                            var func = _.template(templateText);

                            var html = func( result );
                            var id =  _.uniqueId('tpl_');

                            $(val).replaceWith($('<container>'+html+'</container>').attr('template-id', id));

                            renderedView.push({
                                name: element.element,
                                id: id,
                                templateText: templateText
                            })

                        }, val);

                        var attributes = {};

                        $(val.attributes).each(function() {
                            var match = this.nodeName.match(/tpl-data(-(\w+))/);
                            if(!_.isNull(match)) {
                                attributes[ match[2] ] = $(val).attr('tpl-data-'+match[2]);
                            }
                        });
                        element.callback(renderer, attributes);

                    })
                }
            })
        } )
    },
    getIdByTplName: function(name) {
        var element = _.findWhere(renderedView, {name: name});
        if(_.isUndefined(element) ) {
            return element;
        }
        return element.id;
    },

    removeFromPage: function(name) {
        var id = _.getIdByTplName(name);
        if(!_.isUndefined(id)) {
            $('[template-id='+id+']').remove();
            renderedView = _.reject(renderedView, function(elem) {
                if(name == elem.name) return true;
            })
        }
    }


});

_.renderContaintTemplate();