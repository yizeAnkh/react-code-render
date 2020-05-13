import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CodeMirror from '@uiw/react-codemirror';

import { transform } from '@babel/standalone';
import RemoveImports from 'babel-plugin-transform-remove-imports';
import TransformClass from '@babel/plugin-transform-classes';

import * as Antd from 'antd';

import './App.css';
// jsx转换为js
async function babelTransform(input) {
	const specifiers = [];
	const code = transform(input, {
		presets: ['es2015', 'react'],
		plugins: [
			[RemoveImports, { removeAll: true }],
			[TransformClass, { loose: true }],
		],
	}).code;
	return { code, specifiers };
}

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			playerId: `${parseInt(String(Math.random() * 1e9), 10).toString(36)}`,
			errorMessage: '',
		};
	}
	// 获取要加载的antd的模块
	getImportArr(codeStr) {
		const reg0 = new RegExp("import.+from 'antd'", 'g');
		const arr1 = codeStr.match(reg0) || [];
		let arr2 = [];
		arr1.forEach((ele) => {
			const reg1 = new RegExp('{.+}', 'g');
			let a = ele.match(reg1)[0];
			a = a.replace(/^{/, '').replace(/}$/, '').replace(/ /g, '');
			arr2 = a.split(',');
		});
		return arr2;
	}
	async executeCode(codeStr) {
		// console.log(codeStr);
		try {
			const args = ['context', 'React', 'ReactDOM', 'Component'];
			const argv = [this, React, ReactDOM, Component];

			// 尝试根据codestr 获取要加载的ui模块
			const importArr = this.getImportArr(codeStr);
			importArr.forEach((ele) => {
				args.push(ele);
				argv.push(Antd[ele]);
			});

			codeStr = codeStr.replace('_mount_', `document.getElementById('${this.state.playerId}')`);
			const input = `${codeStr}`;
			// console.log(input);
			const { code } = await babelTransform(input);
			// console.log(code);
			args.push(code);
			// eslint-disable-next-line no-new-func
			new Function(...args).apply(null, argv);
			this.setState({ errorMessage: '' });
		} catch (err) {
			let message = '';
			if (err && err.message) {
				message = err.message;
			} else {
				message = JSON.stringify(err);
			}
			this.setState({ errorMessage: message });
		}
	}
	render() {
		const { code } = this.props;
		return (
			<>
				<div>
					{this.state.errorMessage && (
						<pre>
							<code>{this.state.errorMessage}</code>
						</pre>
					)}

					<div id={this.state.playerId} style={{ display: this.state.errorMessage ? 'none' : 'block' }}></div>
				</div>

				<div>
					<CodeMirror
						value={(code || '').replace(/\n$/, '')}
						ref={this.editor}
						options={{
							theme: 'monokai',
							mode: 'jsx',
						}}
						onChange={(editor) => {
							this.executeCode(editor.getValue());
						}}
					/>
				</div>
			</>
		);
	}
}

export default App;
