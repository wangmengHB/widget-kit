/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import './codicon/codicon.css';
import './codicon/codicon-animations.css';
import { strings } from 'util-kit';

const { escape } = strings;

function expand(text: string): string {
	return text.replace(/\$\((([a-z0-9\-]+?)(~([a-z0-9\-]*?))?)\)/gi, (_match, _g1, name, _g3, animation) => {
		return `<span class="codicon codicon-${name} ${animation ? `codicon-animation-${animation}` : ''}"></span>`;
	});
}

export function renderCodicons(label: string): string {
	return expand(escape(label));
}

export class CodiconLabel {

	constructor(
		private readonly _container: HTMLElement
	) { }

	set text(text: string) {
		this._container.innerHTML = renderCodicons(text || '');
	}

	set title(title: string) {
		this._container.title = title;
	}
}
