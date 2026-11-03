"use strict";
var taskManager = (() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res, err) => function __init() {
    if (err) throw err[0];
    try {
      return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    } catch (e) {
      throw err = [e], e;
    }
  };

  // js-build-tools-inject:process
  var init_process = __esm({
    "js-build-tools-inject:process"() {
    }
  });

  // js-build-tools-cjs:dist/index.js
  init_process();
  window.jsonDom = jsonDom;
  var {
    text,
    main,
    header,
    heading,
    paragraph
  } = jsonDomComponents;
  var renderPage = () => {
    const mainHeader = header([heading(1, [text("Task Manager")])]);
    const mainContent = main([paragraph("A simple storage, retrieval, sorting and prioritizing system for tasks.")]);
    const documentItem = jsonDom.documentItem;
    jsonDom.updateDomItems(documentItem);
    documentItem.body.children.push(mainHeader, mainContent);
    jsonDom.updateChildNodes(documentItem.body);
    jsonDom.updateElements(mainHeader);
    jsonDom.updateElements(mainContent);
  };
  renderPage();
})();
if (typeof module === 'object' && module && module.exports) { module.exports = taskManager }
