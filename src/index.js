import React from 'react';
import ReactDOM from 'react-dom';

import { Button, Space } from 'antd';
import 'antd/dist/antd.css';

import App from './App';
import * as serviceWorker from './serviceWorker';

// or 'antd/dist/antd.less'

let codeStr = `
import { Button, Space } from 'antd';
ReactDOM.render(
  <Space>
    <Button type="primary">主要按钮</Button>
    <Button type="primary" danger>危险按钮</Button>
  </Space>,
  _mount_
);
`;
let codeStr2 = `
import { Button } from 'antd';
ReactDOM.render(
  <div>
    <Button>主要按钮2</Button>
    <Button danger>微信按钮2</Button>
  </div>,
  _mount_
);
`;
ReactDOM.render(
	<React.StrictMode>
		<h2>编辑框1</h2>
		<App code={codeStr} dependencies={{ Button, Space }} />
		<h2>编辑框2</h2>
		<App code={codeStr2} dependencies={{ Button }} />
		<h2>编辑框3</h2>
		<App dependencies={{ Button }} />
	</React.StrictMode>,
	document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
