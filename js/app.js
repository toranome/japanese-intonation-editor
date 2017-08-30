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
    self.highIndices = ko.observableArray([0,1,1,0,0,0,1,0,0]);

    self.getClassAt = function(index) {
        if (self.highIndices().length <= index || !self.highIndices()[index]) {
            return MarkCssClass.None;
        }

        if (!self.highIndices()[index+1]) {
            return MarkCssClass.Drop;
        }

        return MarkCssClass.High;
    };

    self.displayText = ko.computed(function(){
        var results = [];

        for(var i=0; i<self.inputText().length; i++) {
            var item = results.pop();

            if (item != undefined && item.mark == self.getClassAt(i)) {
                item.text += self.inputText()[i];
                results.push(item);
                continue;
            }

            if (item != undefined) {
                results.push(item);
            }

            item = {
                text: self.inputText()[i],
                mark: self.getClassAt(i),
            };

            results.push(item);
        }

        return results;
    });

    self.asHtml = function(item) {
        if (item.mark == MarkCssClass.None) {
            return item.text;
        }

        if (item.mark == MarkCssClass.High) {
            return "<high>" + item.text + "</high>";
        }

        if (item.mark == MarkCssClass.Drop) {
            return "<drop>" + item.text + "</drop>";
        }
    };

    self.textAsHtml = ko.computed(function() {
        var results = "";
        self.displayText().forEach(function(item){
            results += self.asHtml(item);
        });
        return results;
    });
}

ko.applyBindings(new AppViewModel());