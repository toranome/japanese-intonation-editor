function AppViewModel() {
    var self = this;

    var MarkElement = {
        High: "high",
        Drop: "drop"
    };

    var MarkCssClass = {
        None: "mark mark-none",
        High: "mark mark-high",
        Drop: "mark mark-drop"
    };

    self.inputText = ko.observable("ひらがなで かいて");
    self.highIndices = ko.observableArray([0,1,1,0,0,0,1,0,0,0]);

    self.getClassAt = function(index) {
        if (self.highIndices().length <= index || !self.highIndices()[index]) {
            return MarkCssClass.None;
        }

        if (!self.highIndices()[index+1]) {
            return MarkCssClass.Drop;
        }

        return MarkCssClass.High;
    };

    self.placeholderCharacter = ko.computed(function(){
        var buffer = self.highIndices();
        var placeholderClass = (buffer[buffer.length-1]) == 0 ? MarkCssClass.None : MarkCssClass.High;
        var result = {
            text: "〇",
            css: {}
        }
        result.css[placeholderClass] = true;
        return result;
    });

    self.toggleFinalIntonation = function() {
        if (self.highIndices().length != self.inputText.length + 1) {
            console.warn("The number of intonation buttons should be one more than the number of characters");
        }
        var buffer = self.highIndices();
        buffer[buffer.length-1] = 1 - buffer[buffer.length-1];
        self.highIndices(buffer);
    }

    self.toggleIntonation = function(item) {
        var buffer = self.highIndices();
        buffer[item.key] = 1 - buffer[item.key];
        self.highIndices(buffer);
    }

    self.displayText = ko.computed(function(){
        var results = [];

        for(var i=0; i<self.inputText().length; i++) {
            var result = {
                text: self.inputText()[i],
                css: {},
                key: i
            }
            result.css[self.getClassAt(i)] = true;
            results.push(result);
        }

        return results;
    });

    self.compactDisplayText = ko.computed(function(){
        var results = [];

        for(var i=0; i<self.inputText().length; i++) {
            var item = results.pop();

            if (item != undefined && item.css[self.getClassAt(i)]) {
                item.text += self.inputText()[i];
                results.push(item);
                continue;
            }

            if (item != undefined) {
                results.push(item);
            }

            item = {
                text: self.inputText()[i],
                css: {}
            };
            item.css[self.getClassAt(i)] = true;

            results.push(item);
        }

        return results;
    });

    self.asHtml = function(item) {
        if (item.css[MarkCssClass.None]) {
            return item.text;
        }

        if (item.css[MarkCssClass.High]) {
            return "<high>" + item.text + "</high>";
        }

        if (item.css[MarkCssClass.Drop]) {
            return "<drop>" + item.text + "</drop>";
        }
    };

    self.textAsHtml = ko.computed(function() {
        var results = "";
        self.compactDisplayText().forEach(function(item){
            results += self.asHtml(item);
        });
        return results;
    });
}

ko.applyBindings(new AppViewModel());