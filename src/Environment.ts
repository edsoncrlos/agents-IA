export abstract class Environment {
    environment: Array<Array<number>>;
    static n = 10;
    static m = 10;
    protected itens: Array<Item> = new Array();
    private carry: Item | null;
    private pos = [0, 0];

    constructor () {
        this.environment = new Array(Environment.n);

        for (let i = 0; i < Environment.n; i++) {
            this.environment[i] = new Array(Environment.m).fill(0);    
        }
        this.environment[0][0] = 1;

        this.carry = null;
    }

    getPos() {
        return this.pos;
    }

    private getItem(posx: number, posy: number) {
        return this.itens.find((e) => {
            if (e.posx == posx && e.posy == posy) {
                return e;
            }
        })
    }

    getContent(x: number, y: number) {
        const item = this.getItem(x, y);
        if (item) {
            return item;
        }
        return null;
    }

    public bindItem(x: number, y: number) {
        if (!this.carry) {
            const item = this.getItem(x, y);
    
            if (item) {
                this.carry = item;
            }
        }
    }

    public unBindItem() {
        this.carry = null;
    }

    public move(startX: number, startY: number, endX: number, endY: number) {
        this.environment[startX][startY] = 0;
        this.environment[endX][endY] = 1;

        this.pos = [endX, endY];
        if (this.carry != null) {
            this.carry.posx = endX;
            this.carry.posy = endY;
        }
    }

    public getItens() {
        return this.itens;
    }

    protected addItem(x: number, y: number, score: number) {
        this.itens.push(new Item(score, x, y));
    }
}

export class RealEnvironment extends Environment {
    private scoreItem1 = 10;
    private scoreItem2 = 20;

    constructor () {
        super();
        this.populateItens();
    }

    private populateItens() {
        for (let i = 0; i < 5; i++) {
            this.getPosRandomly(this.scoreItem1);
            this.getPosRandomly(this.scoreItem2);
        }
    }

    private getPosRandomly(score: number) {
        const x = Math.floor(Math.random() * Environment.n);
        const y = Math.floor(Math.random() * Environment.m);
    
        if (this.environment[x][y] == this.scoreItem1 || this.environment[x][y] == this.scoreItem2) {
            this.getPosRandomly(score);
        } else {
            this.addItem(x, y, score);
            this.environment[x][y] = score;
        }
    }
}

export class TestEnviroment extends Environment {
    constructor() {
        super();
    }

    public addItem(x: number, y: number, score: number) {
        this.environment[x][y] = score;
        super.addItem(x, y, score);
    }
}

export class Item {
    public score;
    public posx;
    public posy;
    
    constructor (score: number, posx: number, posy: number) {
        this.score = score;
        this.posx = posx;
        this.posy = posy;
    }
}