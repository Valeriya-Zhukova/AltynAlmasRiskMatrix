import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ItbiRiskMatrixWebPartStrings';
import ItbiRiskMatrix from './components/ItbiRiskMatrix';
import { IItbiRiskMatrixProps } from './components/IItbiRiskMatrixProps';

import { getSP } from './pnpjsConfig';

export interface IItbiRiskMatrixWebPartProps {
	description: string;
}

export default class ItbiRiskMatrixWebPart extends BaseClientSideWebPart<IItbiRiskMatrixWebPartProps> {
	public async onInit(): Promise<void> {
		await super.onInit();

		//Initialize our _sp object that we can then use in other packages without having to pass around the context.
		getSP(this.context);
	}

	public render(): void {
		const element: React.ReactElement<IItbiRiskMatrixProps> = React.createElement(ItbiRiskMatrix, {
			description: this.properties.description,
		});

		ReactDom.render(element, this.domElement);
	}

	protected onDispose(): void {
		ReactDom.unmountComponentAtNode(this.domElement);
	}

	protected get dataVersion(): Version {
		return Version.parse('1.0');
	}

	protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
		return {
			pages: [
				{
					header: {
						description: strings.PropertyPaneDescription,
					},
					groups: [
						{
							groupName: strings.BasicGroupName,
							groupFields: [
								PropertyPaneTextField('description', {
									label: strings.DescriptionFieldLabel,
								}),
							],
						},
					],
				},
			],
		};
	}
}
