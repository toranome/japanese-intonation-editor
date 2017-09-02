describe("App", function() {
  var app;

  beforeEach(function() {
    app = new AppViewModel();
    app.inputText("abcd");
  });

  describe("when all intonation is low", function() {
    beforeEach(function() {
      app.highIndices([0,0,0,0,0]);
    });

    it("html should be the same as input text", function() {
      expect(app.textAsHtml()).toEqual("abcd");
    });
  });

  describe("when only second character's intonation is high", function() {
    beforeEach(function() {
      app.highIndices([0,1,0,0,0]);
    });

    it("html should have a drop tag around the second character", function() {
      expect(app.textAsHtml()).toEqual("a<drop>b</drop>cd");
    });
  });

  describe("when all but the first character is high", function() {
    beforeEach(function() {
      app.highIndices([0,1,1,1,1]);
    });

    it("html should have high tag around all but first character", function() {
      expect(app.textAsHtml()).toEqual("a<high>bcd</high>");
    });
  });

  describe("when all but the first and last characters are high", function() {
    beforeEach(function() {
      app.highIndices([0,1,1,1,0]);
    });

    it("html should have a mix of high and drop tags", function() {
      expect(app.textAsHtml()).toEqual("a<high>bc</high><drop>d</drop>");
    });
  });
});
