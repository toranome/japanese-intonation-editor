
let Inline = Quill.import('blots/inline');

class HighAccentBlot extends Inline { }
HighAccentBlot.blotName = 'high';
HighAccentBlot.tagName = 'high';

class DropAccentBlot extends Inline { }
DropAccentBlot.blotName = 'drop';
DropAccentBlot.tagName = 'drop';

class LowAccentBlot extends Inline { }
LowAccentBlot.blotName = 'low';
LowAccentBlot.tagName = 'low';

class RiseAccentBlot extends Inline { }
RiseAccentBlot.blotName = 'rise';
RiseAccentBlot.tagName = 'rise';

Quill.register(HighAccentBlot);
Quill.register(DropAccentBlot);
Quill.register(LowAccentBlot);
Quill.register(RiseAccentBlot);

// Another possibility below
/*
class AccentBlot extends Inline {
    static create(value) {
        let node = super.create();
        setAccentType(value);
        return node;
    }

    static setAccentType(value) {
        if (['high', 'low', 'rising', 'falling', 'none'].includes(value)) {
            node.setAttribute('data-accent-type', value);
        }

        console.error('Invalid type ' + value);
    }
    
    static formats(node) {
        node.setAttribute('data-accent-type', 'high');
    }
}
*/