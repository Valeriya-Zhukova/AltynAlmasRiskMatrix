import * as React from 'react';
import styles from './ItbiRiskMatrix.module.scss';
import { IItbiRiskMatrixProps } from './IItbiRiskMatrixProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IRisk } from './interfaces';
import { SPFI, spfi } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/site-users/web';
import { getSP } from '../pnpjsConfig';
import * as ReactDOM from 'react-dom';

export interface ItbiRiskMatrixState {
	risks: IRisk[];
}

export default class ItbiRiskMatrix extends React.Component<IItbiRiskMatrixProps, ItbiRiskMatrixState> {
	private _sp: SPFI;

	constructor(props: IItbiRiskMatrixProps, state: ItbiRiskMatrixState) {
		super(props);
		this.state = {
			risks: [],
		};
		this._sp = getSP();
	}

	public componentDidMount(): void {
		// console.log(this.state);
		this._getRisks();
	}

	public render(): React.ReactElement<IItbiRiskMatrixProps> {
		return (
			<div className={`${styles.itbiRiskMatrix}`}>
				<div className={`${styles.container}`}>
					<div className={`${styles.wrapper}`}>
						<div className={`${styles.row}`}>
							<div className={`${styles.item1} ${styles.backgr}`}>Вероятность →</div>
						</div>

						<div className={`${styles.row}`}>
							<div></div>
							<div></div>
							<div></div>
							<div className={`${styles.item} ${styles.rowBordernl} ${styles.level}`}>
								Редко <br />
								Менее 5%
							</div>
							<div className={`${styles.item} ${styles.rowBordernl} ${styles.level}`}>
								Маловероятно <br />
								От 5% до 15%
							</div>
							<div className={`${styles.item} ${styles.rowBordernl} ${styles.level}`}>
								Возможно <br />
								От 16% до 30%
							</div>
							<div className={`${styles.item} ${styles.rowBordernl} ${styles.level}`}>
								Вероятно <br />
								От 31% до 75%
							</div>
							<div className={`${styles.item} ${styles.rowBordernl} ${styles.rowBorderr} ${styles.level}`}>
								Почти наверняка <br />
								Более 75%
							</div>
						</div>

						<div className={`${styles.row}`}>
							<div className={`${styles.item} ${styles.classRow1} ${styles.rowBordernlt} ${styles.level}`}>A</div>
							<div className={`${styles.item} ${styles.rowBordernlt} ${styles.level}`}>B</div>
							<div className={`${styles.item} ${styles.rowBordernlt} ${styles.level}`}>C</div>
							<div className={`${styles.item} ${styles.rowBordernlt} ${styles.level}`}>D</div>
							<div className={`${styles.item} ${styles.rowBordernlt} ${styles.rowBorderr} ${styles.level}`}>E</div>
						</div>

						<div className={`${styles.row}`}>
							<div className={`${styles.item} ${styles.levelTitle}`}>Уровень</div>
							<div className={`${styles.item}`}>1</div>
							<div className={`${styles.item}`}>2</div>
							<div className={`${styles.item}`}>3</div>
							<div className={`${styles.item}`}>4</div>
							<div className={`${styles.item}`}>5</div>
						</div>

						<div className={`${styles.row} ${styles.rowHeight}`} id='5'>
							<div className={`${styles['itemCol']} ${styles['descCol']} ${styles['rowBorder']} ${styles.level}`}>
								Катастрофическое
							</div>
							<div className={`${styles.item}`}>5</div>

							{this._getRiskRow(5, 'Катастрофическое', false)}
						</div>

						<div className={`${styles.row} ${styles.rowHeight}`} id='4'>
							<div className={`${styles['itemCol']} ${styles['descCol']} ${styles['rowBorder']} ${styles.level}`}>
								Суровое
							</div>
							<div className={`${styles.item}`}>4</div>

							{this._getRiskRow(4, 'Суровое', false)}
						</div>

						<div className={`${styles.row} ${styles.rowHeight}`} id='3'>
							<div className={`${styles['itemCol']} ${styles['descCol']} ${styles['rowBorder']} ${styles.level}`}>
								Серьезное
							</div>
							<div className={`${styles.item}`}>3</div>

							{this._getRiskRow(3, 'Серьезное', false)}
						</div>

						<div className={`${styles.row} ${styles.rowHeight}`} id='2'>
							<div className={`${styles['itemCol']} ${styles['descCol']} ${styles['rowBorder']} ${styles.level}`}>
								Существенное
							</div>
							<div className={`${styles.item}`}>2</div>

							{this._getRiskRow(2, 'Существенное', false)}
						</div>

						<div className={`${styles.row} ${styles.rowHeight}`} id='1'>
							<div className={`${styles.item} ${styles['headerCol']} ${styles.backgr}`}>Последствие →</div>
							<div
								className={`${styles['itemCol']} ${styles['descCol']} ${styles['rowBorder']} ${styles['rowBordert']} ${styles.level}`}
							>
								Мелкое
							</div>
							<div className={`${styles.item}`}>1</div>

							{this._getRiskRow(1, 'Мелкое', true)}
						</div>
					</div>
				</div>
			</div>
		);
	}

	private _getRisks = async (): Promise<void> => {
		try {
			const sp = spfi(this._sp);
			let _listName = this.props.listName ? this.props.listName : 'Риски';
			// console.log(_listName);
			// New subsite Web
			// const web = Web([sp.web, 'https://altynalmaskz.sharepoint.com/org/risk']);
			// const items: any = await web.lists.getByTitle('Риски').items.select('Title', 'Num', 'Code')();

			// const list = sp.web.lists.getByTitle(_listName).getParentInfos();
			// console.log(list);

			const items: any = await sp.web.lists
				.getByTitle(_listName)
				.items.select('Id', 'Title', 'Num', 'Code', 'FileDirRef')();
			// const itemsL: any = await sp.web.lists.getByTitle('Риски').items();
			// console.log(itemsL);

			const _risks = items.map((item) => {
				// console.log(item.FileDirRef);
				return {
					riskID: item.ID,
					riskTitle: item.Title,
					riskCode: item.Num,
					riskLevel: item.Code,
					listInternalName: item.FileDirRef,
				};
			});

			this.setState({ risks: _risks });
			// console.log(this.state);
		} catch (err) {
			console.log(err);
		}
	};

	private _getRiskRow = function (coeff: number, levelName: string, isLast: boolean): any {
		const letters = ['A', 'B', 'C', 'D', 'E'];
		const colorCodes = {
			green: ['1A', '2B', '2A', '3A'],
			yellow: ['3C', '4D', '4B', '6C', '6B', '4A', '8B', '5A'],
			orange: ['5E', '8D', '10E', '9C', '12D', '12C', '10B', '15C'],
			red: ['15E', '16D', '20E', '20D', '25E'],
		};

		let color: string;
		let riskRow: string = '';
		let currentRisks: string | any[];

		for (let i = 0; i < 5; i++) {
			let _riskLevel: string = `${coeff * (i + 1)}${letters[i]}`;
			let riskLink: string;
			let risksList: string = '';

			if (colorCodes.green.includes(_riskLevel)) {
				color = 'green';
			} else if (colorCodes.yellow.includes(_riskLevel)) {
				color = 'yellow';
			} else if (colorCodes.orange.includes(_riskLevel)) {
				color = 'orange';
			} else if (colorCodes.red.includes(_riskLevel)) {
				color = 'red';
			}

			// console.log(_riskLevel, color);

			currentRisks = this.state.risks.filter((risk) => risk?.riskLevel === _riskLevel);
			// console.log(currentRisks ? currentRisks : 'not found');

			// console.log(this.state.risks);

			for (let j = 0; j < currentRisks.length; j++) {
				riskLink = `https://altynalmaskz.sharepoint.com${currentRisks[j]?.listInternalName}/DispForm.aspx?ID=${currentRisks[j]?.riskID}`;
				risksList += `
											<a href=${riskLink} target='_blank' class=${styles.itemLink}>				
												<div class=${styles.circle}>
													${currentRisks[j]?.riskCode}
													<div class="${styles.tooltiptext}">
														${currentRisks[j]?.riskTitle}
													</div>
												</div>
											</a>														
											`;
				// console.log(currentRisks[j].riskCode);
			}

			riskRow += `
				<div class="${styles.iteml} ${styles[color]}">
					<div class=${styles.text}>
						${_riskLevel}
					</div>
					<div class=${styles.itemc} id=${_riskLevel}>
						${risksList}
					</div>					
				</div>
			`;
		}
		// console.log(riskRow);

		let rowHeader = isLast
			? `
				<div class="${styles.item} ${styles.headerCol} ${styles.backgr}">Последствие →</div>
				<div
					class="${styles.itemCol} ${styles.descCol} ${styles.rowBorder} ${styles.rowBordert} ${styles.level}">
					${levelName}
				</div>
				<div class={${styles.item}}>${coeff}</div>
			`
			: `
				<div class="${styles.rowBorder} ${styles.descCol} ${styles.itemCol} ${styles.level}">
					${levelName}
				</div>
				<div class=${styles.item}>${coeff}</div>
		`;

		const row = document.getElementById(`${coeff + ''}`);
		// console.log(row);
		row ? (row.innerHTML = rowHeader) : '';
		row ? row.insertAdjacentHTML('beforeend', riskRow) : '';
		riskRow = '';
	};
}
