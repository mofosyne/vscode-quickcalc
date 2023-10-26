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
        const isPlaintext = document.languageId === 'plaintext';
        const isMarkdown = document.languageId === 'markdown';
        if (autoEvaluate && (isPlaintext || isMarkdown) && /```calc/.test(document.getText())) {
            // Feature is enabled and allowed for this document and Math Block Detected
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

    const originalText = activeEditor.document.getText();
    try {
        let result: string | null = null;
        if (/```calc/.test(originalText)) {
            // Math Block Detected
            result = await calculator.calculateWithMathSections(originalText);
        } else {
            result = await calculator.calculate(originalText);
        }
        
        if (result && result !== originalText) {
            activeEditor.edit(editBuilder => {
                const entireRange = new vscode.Range(
                    activeEditor.document.positionAt(0),
                    activeEditor.document.positionAt(originalText.length)
                );
                editBuilder.replace(entireRange, result as string);
            });
        } else if (!result) {
            throw new Error("QuickCalc encountered an issue evaluating the content. Ensure the math expressions are correctly formatted.");
        }
    } catch (error) {
        if (error instanceof Error) {
            vscode.window.showErrorMessage(`QuickCalc Error: ${error.message}`);
        } else {
            vscode.window.showErrorMessage(`QuickCalc encountered an unknown error.`);
        }
    }
}
