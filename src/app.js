// See https://github.com/quilljs/parchment

let Inline = Quill.import('blots/inline');
let Parchment = Quill.import('parchment');
let Scope = Parchment.Scope
let ClassAttributor = Parchment.Attributor.Class

let startTags = {
    'high': '<span class="high">',
    'drop': '<span class="drop">'
};

let endTags = {
    'high': '</span>',
    'drop': '</span>'
};

function getTextChangeCallback(htmlDisplaySelector, quill) {
    return function(delta, oldDelta) {
        let fullDelta = quill.editor.delta;
        let textBuilder = [];

        fullDelta.forEach(function(d) {
            if (d.attributes && d.attributes['accent']) {
                let accent = d.attributes['accent'];
                textBuilder.push(startTags[accent]);
                textBuilder.push(d.insert);
                textBuilder.push(endTags[accent]);
            }
            else {
                textBuilder.push(d.insert);
            }
        });

        let text = textBuilder.join('');
        $(htmlDisplaySelector).text(text);
    }
}

function onClickAccent(blotName) {
    if (['high', 'drop'].some(function(v) { return v ==blotName; })) {
        quill.format('accent', blotName);
    }
    else {
        quill.format('accent', null);
    }
}

function getKeyBindingHandler(accentType) {
    return function(range, context) {
        if (quill.getFormat(range)['accent'] == accentType) {
            this.quill.format('accent', false);
        }
        else {
            this.quill.format('accent', accentType);
        }
    }
}

let AccentAttributor = new ClassAttributor('accent', 'accent', { scope: Scope.INLINE });
Quill.register(AccentAttributor);