var app = require('./chats.main');
app.directive('autoScrollToBottom',autoScrollToBottom)
.directive('ctrlEnterBreakLine',ctrlEnterBreakLine);

function autoScrollToBottom(){
    return {
        link:function(scope,element,attrs){
            scope.$watch(function(){
                return element.children().length;
            },function(){
                var room = element.parent().parent();
                room.prop('scrollTop',room.prop('scrollHeight'));
            });
        }
    }
}

function ctrlEnterBreakLine(){
    return function(scope,element,attrs){
        var ctrlDown = false;
        element.bind('keydown',function(evt){
            if(evt.which === 17){
                ctrlDown = true;
            }
            if(evt.which === 13){
                if(ctrlDown){
                    element.val(element.val() + '\n');
                }else{
                    scope.$apply(function(){
                        scope.$eval(attrs.ctrlEnterBreakLine);
                    });
                    element[0].blur();
                    evt.preventDefault();
                }
            }
        });
        element.bind('keyup',function(evt){
            if(evt.which === 17){
                ctrlDown = false;
            }
        });
    }
}
