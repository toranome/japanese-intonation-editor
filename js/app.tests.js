var app = new AppViewModel();
app.inputText("abcd");

app.highIndices([0,0,0,0,0]);
console.log("abcd");
console.log(app.textAsHtml());

app.highIndices([0,1,0,0,0]);
console.log("a<drop>b</drop>cd");
console.log(app.textAsHtml());

app.highIndices([0,1,1,1,1]);
console.log("a<high>bcd</high>");
console.log(app.textAsHtml());

app.highIndices([0,1,1,1,0]);
console.log("a<high>bc</high><drop>d</drop>");
console.log(app.textAsHtml());