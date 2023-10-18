import * as vscode from 'vscode';
const mathjs = require('mathjs');
const calculator = require('quickmathjs')(mathjs);

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "quickcalc" is now active!');
    calculator.initialise();

    let disposable = vscode.commands.registerCommand('quickcalc.quickcalc', async () => {
        await evaluateDocument();
    });

    context.subscriptions.push(disposable);

    // Event listener for when a document is saved
    // Note: Must only trigger if the document has explicit math block delimiter to minimise unexpected behaviour
    vscode.workspace.onDidSaveTextDocument(async (document: vscode.TextDocument) => {
        const autoEvaluate = vscode.workspace.getConfiguration('quickcalc').get('autoEvaluateOnSave');
        if (autoEvaluate && document.languageId === 'markdown' && /```math/.test(document.getText())) {
            await evaluateDocument();
        }
    });
}

export function deactivate() {}

async function evaluateDocument() {
    const activeEditor = vscode.window.activeTextEditor;
    if (!activeEditor) {
        return;
    }

    const text = activeEditor.document.getText();
    const isMarkdown = activeEditor.document.languageId === 'markdown';
    const isPlaintext = activeEditor.document.languageId === 'plaintext';

    if (isPlaintext || isMarkdown) {
        try {
            let result: string | null = null;
            if (/```math/.test(text)) {
                result = await calculator.calculateWithMathSections(text);
            } else {
                result = await calculator.calculate(text);
            }
            if (result !== null) {
                activeEditor.edit(editBuilder => {
                    const entireRange = new vscode.Range(
                        activeEditor.document.positionAt(0),
                        activeEditor.document.positionAt(text.length)
                    );
                    editBuilder.replace(entireRange, result as string);
                });
            } else {
                throw new Error("QuickCalc encountered an issue evaluating the content. Ensure the math expressions are correctly formatted.");
            }
        } catch (error) {
            if (error instanceof Error) {
                vscode.window.showErrorMessage(`QuickCalc Error: ${error.message}`);
            } else {
                vscode.window.showErrorMessage(`QuickCalc encountered an unknown error.`);
            }
        }
    } else {
        vscode.window.showInformationMessage('QuickCalc: Only markdown and plaintext files are supported at this stage. Contributions are welcome!');
    }
}
