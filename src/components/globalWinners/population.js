
export function numberOfPlayers() {
	//TODO: add population variance.

	return Math.round(averagePopPlay() * pop.can);
	// const numberOfPlayers = Math.round(0.1425 * pop.can);// feb 7 2020
	// const numberOfPlayers = Math.round(0.26 * pop.can);// feb 7 2020
	// Total ticket sales added to funds after it's cut of shares
	// TODO: Remove the payouts before adding to prizepool
}


function averagePopPlay() {
	return (OLG.popPlayPercentage() + ALC.popPlayPercentage() + WCLC.popPlayPercentage()) / 3
}

const pop = {
	can: 37590000,
	bc: 5071000,
	ab: 437100,
	sk: 1174000,
	ma: 1369000,
	on: 14570000,
	nwt: 44826,
	nu: 8780,
	yk: 35874,
	nb: 776827,
	nl: 521542,
	ns: 971395,
	pe: 156947,
	qc: 8164361
};

const WCLC = {
	rev2018: 326429000,
	rev2019: 468177000,
	avgRevPerDraw: function () {
		return this.rev2019 / 12 / 8
	},
	avgSalesPerDraw: function () {
		return this.avgRevPerDraw() / 5
	},
	pop: pop.ab + pop.ma + pop.nwt + pop.yk + pop.sk + pop.nu,
	popPlayPercentage,
};

const ALC = {
	rev2019: 60617000,
	avgRevPerDraw: function () {
		return this.rev2019 / 12 / 8
	},
	avgSalesPerDraw: function () {
		return this.avgRevPerDraw() / 5
	},
	pop: pop.nb + pop.ns + pop.pe + pop.nl,
	popPlayPercentage,
};

const OLG = {
	avgRevPerDraw: 18600000,
	avgSalesPerDraw: function () {
		return this.avgRevPerDraw / 5
	},
	pop: pop.on,
	popPlayPercentage,
};

// The other two lottery corporations do not provide sales of lottoMAX. They include all draw lottery sales in one sum;
const BCLC = {
	totalLottoRev: 476400000,
	pop: pop.bc,
};

const LottoQuebec = {
	totalLottoRev: 752348000,
	pop: pop.qc
};

function popPlayPercentage() {
	return this.avgSalesPerDraw() / this.pop
}

