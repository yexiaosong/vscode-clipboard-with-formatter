'use strict';
import { commands, window, Range, Position, workspace, TextEditor, ExtensionContext } from 'vscode';
import { format } from './utils/formatter';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
    let clipboardHistory: Array<any> = [];
    let config = workspace.getConfiguration('clipboardFormatter');
    const _maxLength = config.maxLength;

    function addToClipboard(editor: TextEditor) {
        const selections = editor.selections;
        const document = editor.document;
        let lineStart: Position, lineEnd: Position;
        let selectedContent: string;
        selections.forEach(selection => {
            const line = selection.active.line;

            lineStart = !selection.isEmpty ? selection.start
                    : new Position(line, 0);
            lineEnd = !selection.isEmpty ? selection.end
                    : new Position(line, document.lineAt(line).range.end.character);

            selectedContent = document.getText(new Range(lineStart, lineEnd));
            if(clipboardHistory.indexOf(selectedContent) === -1) {
                clipboardHistory.push(selectedContent);
                if (clipboardHistory.length > _maxLength) {
                    clipboardHistory.shift();
                }
            }
        });
    }

    function pasteSelected(context) {
        let editor = window.activeTextEditor;
        if(editor) {
            editor.edit(doc => {
                doc.insert(editor.selection.start, context);
            });
        }
    }

    const copy = commands.registerCommand('extension.copy', () => {
        addToClipboard(window.activeTextEditor);
        commands.executeCommand("editor.action.clipboardCopyAction");
    });

    const cut = commands.registerCommand('extension.cut', () => {
        window.showInformationMessage('extension.cut');
        commands.executeCommand("editor.action.clipboardCutAction");
    });

    const paste = commands.registerCommand('extension.paste', () => {
        commands.executeCommand("editor.action.clipboardPasteAction");
    });

    const showClipboardHistory = commands.registerCommand('extension.clipboardHistory', () => {
        if(!clipboardHistory.length){
            window.showInformationMessage('当前剪贴板内容为空');
        }
        const languageId = window.activeTextEditor.document.languageId;
        const formatContent = format(languageId);
        const formateedItem = clipboardHistory.map(item => formatContent(item));
        Promise.resolve(formateedItem).then(r => {
            window.showQuickPick(r).then(item => {
                pasteSelected(item);
            });
        });
        
    });

    context.subscriptions.concat([copy, cut, paste, showClipboardHistory]);
}

// this method is called when your extension is deactivated
export function deactivate() {
}