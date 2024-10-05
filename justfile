NPM := "npm"

LATEST_PACKAGE_VERSION := `cat package.json | jq -r .version`

help:
	just --list

# Install project dependencies
install:
	{{NPM}} install

# Test the application
test:
	{{NPM}} test

# Update NPM Packages
update-latest:
	{{NPM}} install mathjs@latest
	{{NPM}} install quickmathjs@latest
	{{NPM}} update packages

# Update NPM Packages
update:
	{{NPM}} update packages

# Display Git History
history:
	gitk --all

# Display NPM Depency Tree
dependency:
	{{NPM}} ls -all

publisher-install:
	{{NPM}} install -g @vscode/vsce
	{{NPM}} install -g ovsx

# Package (Will generate something like quickcalc-{{LATEST_PACKAGE_VERSION}}.vsix )
package:
	vsce package

# Login To Microsoft VSCODE (If you need to update your Public Access Token)
vscode-login:
	vsce login

# Publish To Microsoft VSCODE (https://marketplace.visualstudio.com/)
vscode-publish:
	vsce publish

# Publish To Codium (https://open-vsx.org/)
openvsx-publish:
	ovsx publish quickcalc-{{LATEST_PACKAGE_VERSION}}.vsix -p ${OPEN_VSX_MARKETPLACE_ACCESS_TOKEN}
