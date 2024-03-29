/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import './iconlabel.css';
import * as dom from '../../../browser/dom';
import { HighlightedLabel } from '../highlightedLabel';
import { Disposable, IMatch } from 'util-kit';

export interface IIconLabelCreationOptions {
	supportHighlights?: boolean;
	supportDescriptionHighlights?: boolean;
	supportCodicons?: boolean;
}

export interface IIconLabelValueOptions {
	title?: string;
	descriptionTitle?: string;
	hideIcon?: boolean;
	extraClasses?: string[];
	italic?: boolean;
	matches?: IMatch[];
	labelEscapeNewLines?: boolean;
	descriptionMatches?: IMatch[];
}

class FastLabelNode {
	private disposed: boolean | undefined;
	private _textContent: string | undefined;
	private _className: string | undefined;
	private _title: string | undefined;
	private _empty: boolean | undefined;

	constructor(private _element: HTMLElement) {
	}

	get element(): HTMLElement {
		return this._element;
	}

	set textContent(content: string) {
		if (this.disposed || content === this._textContent) {
			return;
		}

		this._textContent = content;
		this._element.textContent = content;
	}

	set className(className: string) {
		if (this.disposed || className === this._className) {
			return;
		}

		this._className = className;
		this._element.className = className;
	}

	set title(title: string) {
		if (this.disposed || title === this._title) {
			return;
		}

		this._title = title;
		if (this._title) {
			this._element.title = title;
		} else {
			this._element.removeAttribute('title');
		}
	}

	set empty(empty: boolean) {
		if (this.disposed || empty === this._empty) {
			return;
		}

		this._empty = empty;
		this._element.style.marginLeft = empty ? '0' : '';
	}

	dispose(): void {
		this.disposed = true;
	}
}

export class IconLabel extends Disposable {
	private domNode: FastLabelNode;
	private labelDescriptionContainer: FastLabelNode;
	private labelNode: FastLabelNode | HighlightedLabel;
	private descriptionNode: FastLabelNode | HighlightedLabel | undefined;
	private descriptionNodeFactory: () => FastLabelNode | HighlightedLabel;

	constructor(container: HTMLElement, options?: IIconLabelCreationOptions) {
		super();

		this.domNode = this._register(new FastLabelNode(dom.append(container, dom.$('.monaco-icon-label'))));

		this.labelDescriptionContainer = this._register(new FastLabelNode(dom.append(this.domNode.element, dom.$('.monaco-icon-label-description-container'))));

		if (options?.supportHighlights) {
			this.labelNode = new HighlightedLabel(dom.append(this.labelDescriptionContainer.element, dom.$('a.label-name')), !!options.supportCodicons);
		} else {
			this.labelNode = this._register(new FastLabelNode(dom.append(this.labelDescriptionContainer.element, dom.$('a.label-name'))));
		}

		if (options?.supportDescriptionHighlights) {
			this.descriptionNodeFactory = () => new HighlightedLabel(dom.append(this.labelDescriptionContainer.element, dom.$('span.label-description')), !!options.supportCodicons);
		} else {
			this.descriptionNodeFactory = () => this._register(new FastLabelNode(dom.append(this.labelDescriptionContainer.element, dom.$('span.label-description'))));
		}
	}

	get element(): HTMLElement {
		return this.domNode.element;
	}

	setLabel(label?: string, description?: string, options?: IIconLabelValueOptions): void {
		const classes = ['monaco-icon-label'];
		if (options) {
			if (options.extraClasses) {
				classes.push(...options.extraClasses);
			}

			if (options.italic) {
				classes.push('italic');
			}
		}

		this.domNode.className = classes.join(' ');
		this.domNode.title = options?.title || '';

		if (this.labelNode instanceof HighlightedLabel) {
			this.labelNode.set(label || '', options?.matches, options?.title, options?.labelEscapeNewLines);
		} else {
			this.labelNode.textContent = label || '';
		}

		if (description || this.descriptionNode) {
			if (!this.descriptionNode) {
				this.descriptionNode = this.descriptionNodeFactory(); // description node is created lazily on demand
			}

			if (this.descriptionNode instanceof HighlightedLabel) {
				this.descriptionNode.set(description || '', options ? options.descriptionMatches : undefined);
				if (options?.descriptionTitle) {
					this.descriptionNode.element.title = options.descriptionTitle;
				} else {
					this.descriptionNode.element.removeAttribute('title');
				}
			} else {
				this.descriptionNode.textContent = description || '';
				this.descriptionNode.title = options?.descriptionTitle || '';
				this.descriptionNode.empty = !description;
			}
		}
	}
}
