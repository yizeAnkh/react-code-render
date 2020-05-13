# react-code-render
实时编译渲染recat代码  
主要内容都在index.js和app.js里  
编辑器用的@uiw/react-codemirror，其实什么编辑器都行，主要是把内容拿出来  
ui组件用的是antd的，如果别的记得在appjs里改下引用，由于react的是按需加载，所以需要根据codestr内容去找到哪些要加载。  
主要逻辑就是：  
  把编辑器的内容（codeStr）拿到--》把jsx转化为js--》new Function() 渲染  
