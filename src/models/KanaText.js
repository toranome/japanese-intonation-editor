function KanaText(text) {
    this.text = text;
    this.levels = [];

    // 0 = levels of current and next character are the same
    // 1 = levels of current and next character different
    // All calculated off this.levels except for last character
    this.levelChangesNext = [];
}

KanaText.prototype.inputText = function(text) {
    this.text = text;
}

KanaText.prototype.toggleAt = function(index) {
}

KanaText.prototype.toggleLast = function(index) {
}

KanaText.prototype.displayCharacters = function() {
    return [
        { character: "", isHigh: false }
    ];
}

KanaText.prototype.groupCharacters = function(options) {
    options = options || {};
    var useDrop = options.useDrop || true;
    var useRise = options.useRise || false;

    // At most one flag is true
    return [
        { text: "", isHigh: false, isDrop: false, isRise: false }
    ];
}