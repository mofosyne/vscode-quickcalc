# QuickCalc for VS Code

![Extension Logo](images/logo.png)

A seamless integration of the [QuickMathJS - NPM](https://www.npmjs.com/package/quickmathjs?activeTab=readme) calculator into VS Code, allowing you to perform mathematical calculations directly within your editor. Perfect for those working with markdown or plaintext files and want real-time calculations without leaving the VS Code environment. The syntax of this calculator is intended to emulate the style of plaintext maths sent over email (much like how markdown/commonmark is intended to match the natural email writing style of people)

![Preview Animation](images/preview.gif)

## Avalibility

This extention is avaliable on both VSCode at the Visual Studio Marketplace and Codium on Open-VSX as shown below:

* Visual Studio Marketplace: <https://marketplace.visualstudio.com/items?itemName=mofosyne.quickcalc>
* Open-VSX: <https://open-vsx.org/extension/mofosyne/quickcalc>

## Features

- **Inline Calculations**: Perform calculations directly within your files.
- **Markdown & Plaintext Support**: Specifically tailored for markdown and plaintext files.
- **Intuitive Syntax**: Use the ```calc delimiter in markdown files to define sections for calculations.
- **Real-time Results**: Instantly see the result of your calculations.

## How to Use

1. Open a markdown or plaintext file in VS Code.
2. Type out your calculations. For markdown files, wrap your calculations with the ```calc delimiter.
    - If missing, then the entire document is assumed to be a calculation sheet. This is okay in a pitch, but may cause some issues if '=' or ':' is misrecognised.
3. Execute the `QuickCalc` command (default shortcut: `Ctrl+Shift+Q`).
4. See the results inline within your file!

**Example**:

    # Markdown Document
    example content

    ```calc
    # Basic Expressions with Direct Calculation
    1 + 1 = ?
          = ?

    # Variable Assignment with Explicit Value Retrieval
    a = 3
    a: ?

    # Simultaneous Assignment And Results
    c = a + 3 = ?

    # 2> spaces as alt method for Explicit Value Retrieval
      c = ?
    ```

After running the command, this becomes:

    # Markdown Document
    example content

    ```calc
    # Basic Expressions with Direct Calculation
    1 + 1 = 2
          = 2

    # Variable Assignment with Explicit Value Retrieval
    a = 3
    a: 3

    # Simultaneous Assignment And Results
    c = a + 3 = 6

    # 2> spaces as alt method for Explicit Value Retrieval
      c = 6
    ```

https://github.com/mofosyne/QuickMathJS

## Requirements

- VS Code version 1.50 or newer.
- No external dependencies!

## Extension Settings

QuickCalc is designed for seamless use. However, there are a few settings for customization:

- `quickcalc.autoEvaluateOnSave`: Automatically evaluate math expressions in Markdown files on save when wrapped in \`\`\`calc blocks. Defaults to `true`.

## Known Issues

- Only supports markdown and plaintext files for now. We're looking to expand to other formats soon.
- Complex calculations might require wrapping in the ```calc delimiter even in plaintext files for accurate results.

## Release Notes

### 1.0.0

- Initial release of QuickCalc for VS Code.
- Supports inline calculations for markdown and plaintext files.

## Contribute

Got suggestions or found a bug? [Open an issue](https://github.com/mofosyne/vscode-quickcalc/issues) on our GitHub repository. Contributions via pull requests are very welcome!

## Acknowledgements

- Math.js: For the core mathematical functions.

## License

This extension is licensed under the [GNU General Public License v3.0](https://github.com/mofosyne/vscode-quickcalc/blob/main/LICENSE).

---

## For More Information

- [Original QuickMathJS Repository](https://github.com/mofosyne/QuickMathJS)
- [VS Code's Extension Development Documentation](https://code.visualstudio.com/api)

**Enjoy your calculations within VS Code!**
