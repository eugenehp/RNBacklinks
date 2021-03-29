//
//  Action.js
//  ShowBacklinks
//
//  Created by eugene on 3/29/21.
//

var Action = function() {};

Action.prototype = {
    
    run: function(arguments) {
        // Here, you can run code that modifies the document and/or prepares
        // things to pass to your action's native code.
        
        // We will not modify anything, but will pass the body's background
        // style to the native code.
      
        alert("1\n" + JSON.stringify(arguments, null, 2))
        
        arguments.completionFunction({ "currentBackgroundColor" : document.body.style.backgroundColor })
    },
    
    finalize: function(arguments) {
        // This method is run after the native code completes.
        
        // We'll see if the native code has passed us a new background style,
        // and set it on the body.
      
      alert("2\n" + JSON.stringify(arguments, null, 2))
        
        var newBackgroundColor = arguments["newBackgroundColor"]
        if (newBackgroundColor) {
            // We'll set document.body.style.background, to override any
            // existing background.
            document.body.style.background = newBackgroundColor
        } else {
            // If nothing's been returned to us, we'll set the background to
            // blue.
            document.body.style.background= "blue"
        }
    }
    
};
    
var ExtensionPreprocessingJS = new Action
