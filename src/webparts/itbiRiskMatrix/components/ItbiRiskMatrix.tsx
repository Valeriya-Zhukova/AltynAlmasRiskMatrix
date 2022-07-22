import * as React from 'react';
import styles from './ItbiRiskMatrix.module.scss';
import { IItbiRiskMatrixProps } from './IItbiRiskMatrixProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IRisk } from './interfaces';
import { SPFI, spfi } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/site-users/web';
import { getSP } from '../pnpjsConfig';

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
		console.log(this.state);

		this._getRisks();
		this._getRiskRow(5);
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
							<div className={`${styles.item} ${styles['row-bordernl']} ${styles.level}`}>
								Редко <br />
								Менее 5%
							</div>
							<div className={`${styles.item} ${styles['row-bordernl']} ${styles.level}`}>
								Маловероятно <br />
								От 5% до 15%
							</div>
							<div className={`${styles.item} ${styles['row-bordernl']} ${styles.level}`}>
								Возможно <br />
								От 16% до 30%
							</div>
							<div className={`${styles.item} ${styles['row-bordernl']} ${styles.level}`}>
								Вероятно <br />
								От 31% до 75%
							</div>
							<div className={`${styles.item} ${styles['row-bordernl']} ${styles['row-borderr']} ${styles.level}`}>
								Почти наверняка <br />
								Более 75%
							</div>
						</div>

						<div className={`${styles.row}`}>
							<div className={`${styles.item} ${styles['class-row1']} ${styles['row-bordernlt']} ${styles.level}`}>
								A
							</div>
							<div className={`${styles.item} ${styles['row-bordernlt']} ${styles.level}`}>B</div>
							<div className={`${styles.item} ${styles['row-bordernlt']} ${styles.level}`}>C</div>
							<div className={`${styles.item} ${styles['row-bordernlt']} ${styles.level}`}>D</div>
							<div className={`${styles.item} ${styles['row-bordernlt']} ${styles['row-borderr']} ${styles.level}`}>
								E
							</div>
						</div>

						<div className={`${styles.row}`}>
							<div className={`${styles.item} ${styles['level-title']}`}>Уровень</div>
							<div className={`${styles.item}`}>1</div>
							<div className={`${styles.item}`}>2</div>
							<div className={`${styles.item}`}>3</div>
							<div className={`${styles.item}`}>4</div>
							<div className={`${styles.item}`}>5</div>
						</div>

						<div className={`${styles.row} ${styles['row-height']}`}>
							<div className={`${styles['item-col']} ${styles['desc-col']} ${styles['row-border']} ${styles.level}`}>
								Катастрофическое
							</div>
							<div className={`${styles.item}`}>5</div>

							<div className={`${styles.iteml} ${styles.yellow}`}>
								<div className={`${styles.text}`} id='5A'>
									5A
								</div>
								<div className={`${styles.itemc}`}></div>
							</div>

							<div className={`${styles.iteml} ${styles.orange}`}>
								<div className={`${styles.text}`} id='10B'>
									10B
								</div>
								<div className={`${styles.itemc}`}></div>
							</div>

							<div className={`${styles.iteml} ${styles.orange}`}>
								<div className={`${styles.text}`} id='15C'>
									15C
								</div>
								<div className={`${styles.itemc}`}></div>
							</div>

							<div className={`${styles.iteml} ${styles.red}`}>
								<div className={`${styles.text}`} id='20D'>
									20D
								</div>
								<div id='20D' className={`${styles.itemc}`}></div>
							</div>

							<div className={`${styles.iteml} ${styles.red}`}>
								<div className={`${styles.text}`} id='25E'>
									25E
								</div>
								<div id='25E' className={`${styles.itemc}`}></div>
							</div>
						</div>

						<div className={`${styles.row} ${styles['row-height']}`}>
							<div className={`${styles['item-col']} ${styles['desc-col']} ${styles['row-border']} ${styles.level}`}>
								Суровое
							</div>
							<div className={`${styles.item}`}>4</div>

							<div className={`${styles.iteml} ${styles.yellow}`}>
								<div className={`${styles.text}`} id='4A'>
									4A
								</div>
								<div className={`${styles.itemc}`}></div>
							</div>

							<div className={`${styles.iteml} ${styles.orange}`}>
								<div className={`${styles.text}`} id='8B'>
									8B
								</div>
								<div className={`${styles.itemc}`}></div>
							</div>

							<div className={`${styles.iteml} ${styles.orange}`}>
								<div className={`${styles.text}`} id='12C'>
									12C
								</div>
								<div className={`${styles.itemc}`}></div>
							</div>

							<div className={`${styles.iteml} ${styles.red}`}>
								<div className={`${styles.text}`} id='16D'>
									16D
								</div>
								<div className={`${styles.itemc}`}></div>
							</div>

							<div className={`${styles.iteml} ${styles.red}`}>
								<div className={`${styles.text}`} id='20E'>
									20E
								</div>
								<div className={`${styles.itemc}`}></div>
							</div>
						</div>

						<div className={`${styles.row} ${styles['row-height']}`}>
							<div className={`${styles['item-col']} ${styles['desc-col']} ${styles['row-border']} ${styles.level}`}>
								Серьезное
							</div>
							<div className={`${styles.item}`}>3</div>

							<div className={`${styles.iteml} ${styles.green}`}>
								<div className={`${styles.text}`} id='3A'>
									3A
								</div>
								<div className={`${styles.itemc}`}></div>
							</div>

							<div className={`${styles.iteml} ${styles.orange}`}>
								<div className={`${styles.text}`} id='6B'>
									6B
								</div>
								<div className={`${styles.itemc}`}></div>
							</div>

							<div className={`${styles.iteml} ${styles.orange}`}>
								<div className={`${styles.text}`} id='9C'>
									9C
								</div>
								<div className={`${styles.itemc}`}></div>
							</div>

							<div className={`${styles.iteml} ${styles.red}`}>
								<div className={`${styles.text}`} id='12D'>
									12D
								</div>
								<div className={`${styles.itemc}`}></div>
							</div>

							<div className={`${styles.iteml} ${styles.red}`}>
								<div className={`${styles.text}`} id='15E'>
									15E
								</div>
								<div className={`${styles.itemc}`}></div>
							</div>
						</div>

						<div className={`${styles.row} ${styles['row-height']}`}>
							<div className={`${styles['item-col']} ${styles['desc-col']} ${styles['row-border']} ${styles.level}`}>
								Существенное
							</div>
							<div className={`${styles.item}`}>2</div>

							<div className={`${styles.iteml} ${styles.green}`}>
								<div className={`${styles.text}`} id='2A'>
									2A
								</div>
								<div className={`${styles.itemc}`}></div>
							</div>

							<div className={`${styles.iteml} ${styles.orange}`}>
								<div className={`${styles.text}`} id='4B'>
									4B
								</div>
								<div className={`${styles.itemc}`}></div>
							</div>

							<div className={`${styles.iteml} ${styles.orange}`}>
								<div className={`${styles.text}`} id='6C'>
									6C
								</div>
								<div className={`${styles.itemc}`}></div>
							</div>

							<div className={`${styles.iteml} ${styles.red}`}>
								<div className={`${styles.text}`} id='8D'>
									8D
								</div>
								<div className={`${styles.itemc}`}></div>
							</div>

							<div className={`${styles.iteml} ${styles.red}`}>
								<div className={`${styles.text}`} id='10E'>
									10E
								</div>
								<div className={`${styles.itemc}`}></div>
							</div>
						</div>

						<div className={`${styles.row} ${styles['row-height']}`}>
							<div className={`${styles.item} ${styles['header-col']} ${styles.backgr}`}>Последствие →</div>
							<div
								className={`${styles['item-col']} ${styles['desc-col']} ${styles['row-border']} ${styles['row-bordert']} ${styles.level}`}
							>
								Мелкое
							</div>
							<div className={`${styles.item}`}>1</div>

							<div className={`${styles.iteml} ${styles.green}`}>
								<div className={`${styles.text}`} id='1A'>
									1A
								</div>
								<div className={`${styles.itemc}`}></div>
							</div>
							<div className={`${styles.iteml} ${styles.green}`}>
								<div className={`${styles.text}`} id='2B'>
									2B
								</div>
								<div className={`${styles.itemc}`}></div>
							</div>
							<div className={`${styles.iteml} ${styles.orange}`}>
								<div className={`${styles.text}`} id='3C'>
									3C
								</div>
								<div className={`${styles.itemc}`}></div>
							</div>
							<div className={`${styles.iteml} ${styles.red}`}>
								<div className={`${styles.text}`} id='4D'>
									4D
								</div>
								<div className={`${styles.itemc}`}></div>
							</div>

							<div className={`${styles.iteml} ${styles.red}`}>
								<div className={`${styles.text}`} id='5E'>
									5E
								</div>
								<div className={`${styles.itemc}`}></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	private _getRisks = async (): Promise<void> => {
		try {
			const sp = spfi(this._sp);

			const items: any = await sp.web.lists.getByTitle('Риски').items.select('Title', 'Num', 'Code')();

			const _risks = items.map((item) => {
				riskTitle: item.Title;
				riskCode: item.Num;
				riskLevel: item.Code;
			});

			console.log(items);

			this.setState({ risks: _risks });
			console.log(this.state);
		} catch (err) {
			console.log(err);
		}
	};

	private _getRiskRow = (coeff: number): string => {
		const letters = ['A', 'B', 'C', 'D', 'E'];
		const colorCodes = {
			green: ['1A', '2B', '2A', '3A'],
			yellow: ['3C', '4D', '4B', '6C', '6B', '4A', '8B', '5A'],
			orange: ['5E', '8D', '10E', '9C', '12D', '12C', '10B', '15C'],
			red: ['15E', '16D', '20E', '20D', '25E'],
		};

		let color;

		let riskRow: string = '';

		for (let i = 0; i < 5; i++) {
			let code = `${coeff * (i + 1)}${letters[i]}`;

			if (colorCodes.green.includes(code)) {
				color = 'green';
			} else if (colorCodes.yellow.includes(code)) {
				color = 'yellow';
			} else if (colorCodes.orange.includes(code)) {
				color = 'orange';
			} else if (colorCodes.red.includes(code)) {
				color = 'red';
			}

			console.log(code, color);

			riskRow += `
				<div className={${styles.iteml} ${styles[color]}}>
					<div className={${styles.text}} id=${code}>
						${code}
					</div>
					<div className={${styles.itemc}}></div>
				</div>
			`;
		}
		console.log(riskRow);
		console.log(this);

		return riskRow;
	};
}
