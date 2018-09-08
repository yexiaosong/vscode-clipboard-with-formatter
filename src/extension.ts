'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { commands, window } from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "vscode-clipboard-with-formatter" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    const copy = commands.registerCommand('extension.copy', () => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        window.showInformationMessage('extension.copy');
    });

    const cut = commands.registerCommand('extension.cut', () => {
        window.showInformationMessage('extension.cut');
    });

    const paste = commands.registerCommand('extension.paste', () => {
        window.showInformationMessage('extension.paste');
    });


    context.subscriptions.concat([copy, cut, paste]);
}

// this method is called when your extension is deactivated
export function deactivate() {
}