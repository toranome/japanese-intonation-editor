
describe("Kana Text", function() {
  var kana;

  beforeEach(function() {
    kana = new KanaText();
    kana.inputText("abcdefgh");
  });

  it("all level flags should be low", function() {
    expect(kana.levels).toEqual([0,0,0,0,0,0,0,0]);
  });

  it("all level-change flags should be low", function() {
    expect(kana.levels).toEqual([0,0,0,0,0,0,0,0]);
  });

  describe("when first character is toggled", function() {
    beforeEach(function() {
      kana.toggleAt(0);
    });

    it("the first level should be high", function() {
      expect(kana.levels).toEqual([1,0,0,0,0,0,0,0]);
    });

    it("the first level-change flag should be high", function() {
      expect(kana.levelChangesNext).toEqual([1,0,0,0,0,0,0,0]);
    });
  });

  describe("when multiple consecutive characters are toggled", function() {
    beforeEach(function() {
      kana.toggleAt(1);
      kana.toggleAt(2);
      kana.toggleAt(3);
    });

    it("the corresponding level flags should be high", function() {
      expect(kana.levels).toEqual([0,1,1,1,0,0,0,0]);
    });

    it("only the level-change flag at the last character's index should be high", function() {
      expect(kana.levelChangesNext).toEqual([0,0,0,1,0,0,0,0]);
    });
  });
});
