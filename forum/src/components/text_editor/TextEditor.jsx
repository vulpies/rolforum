import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

export default class TextEditor extends Component {
	state = {
		editorState: EditorState.createEmpty(),
	}

	onEditorStateChange = (editorState) => {
		this.setState({
			editorState,
		})
	}

	render() {
		const { editorState } = this.state;
		// console.log(6666, draftToHtml(convertToRaw(editorState.getCurrentContent())));
		return (
			<div className="editor__textarea ">
				<Editor
					editorState={editorState}
					toolbarClassName="toolbarClassName"
					wrapperClassName="wrapperClassName"
					editorClassName="editor__textarea send-post-form__text"
					onEditorStateChange={this.onEditorStateChange}
					localization={{
						locale: 'ru',
					}}
					toolbar={{
						options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'image', 'history'],
						inline: {
							options: ['bold', 'italic', 'underline', 'strikethrough'],
							bold: { className: 'btns btns-editor' },
							italic: { className: 'btns btns-editor' },
							underline: { className: 'btns btns-editor' },
							strikethrough: { className: 'btns btns-editor' },
							className: 'text_editor--inline'
						},
						blockType: {
							options: ['Normal', 'Blockquote', 'Code'],
							className: 'btns btns-editor',
						},
						fontSize: {
							className: 'btns btns-editor',
						},
						fontFamily: {
							options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
							className: 'btns btns-editor',
						},
						list: {
							options: ['unordered', 'ordered'],
							unordered: { className: 'btns btns-editor' },
							ordered: { className: 'btns btns-editor' },
						},
						textAlign: {
							options: ['left', 'center', 'right'],
							left: { className: 'btns btns-editor' },
							center: { className: 'btns btns-editor' },
							right: { className: 'btns btns-editor' },
						},
						colorPicker: {
							className: 'btns btns-editor',
						},

						link: {
							options: ['link'],
							link: { className: 'btns btns-editor' },
						},
						emoji: {
							className: 'btns btns-editor',
						},
						image: {
							className: 'btns btns-editor',
						},
						history: {
							undo: { className: 'btns btns-editor' },
							redo: { className: 'btns btns-editor' },
						}
					}}
				/>
			</div>
		)
	}
}