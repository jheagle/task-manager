/* global jsonDom, jsonDomComponents -- both loaded as plain scripts in index.html before this native ES module runs, not npm imports */
window.jsonDom = jsonDom
const { text, main, header, heading, paragraph } = jsonDomComponents

const renderPage = () => {
  const mainHeader = header([heading(1, [text('Task Manager')])])
  const mainContent = main([
    paragraph('A simple storage, retrieval, sorting and prioritizing system for tasks.')
  ])
  const documentItem = jsonDom.documentItem
  jsonDom.updateDomItems(documentItem)

  documentItem.body.children.push(mainHeader, mainContent)

  jsonDom.updateChildNodes(documentItem.body)
  jsonDom.updateElements(mainHeader)
  jsonDom.updateElements(mainContent)
}

renderPage()
