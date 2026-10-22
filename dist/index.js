"use strict";

/* global jsonDom, jsonDomComponents -- both loaded as plain scripts in index.html before this native ES module runs, not npm imports */
window.jsonDom = jsonDom;
var _jsonDomComponents = jsonDomComponents,
  text = _jsonDomComponents.text,
  main = _jsonDomComponents.main,
  header = _jsonDomComponents.header,
  heading = _jsonDomComponents.heading,
  paragraph = _jsonDomComponents.paragraph;
var renderPage = function renderPage() {
  var mainHeader = header([heading(1, [text('Task Manager')])]);
  var mainContent = main([paragraph('A simple storage, retrieval, sorting and prioritizing system for tasks.')]);
  var documentItem = jsonDom.documentItem;
  jsonDom.updateDomItems(documentItem);
  documentItem.body.children.push(mainHeader, mainContent);
  jsonDom.updateChildNodes(documentItem.body);
  jsonDom.updateElements(mainHeader);
  jsonDom.updateElements(mainContent);
};
renderPage();