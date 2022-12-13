import { createData, RunsTableInput } from "./runsTable";

export default class Batting {
    Batsman1:RunsTableInput;
    Batsman2:RunsTableInput;

    constructor (batsman1:RunsTableInput,batsman2:RunsTableInput){
        this.Batsman1 = batsman1;
        this.Batsman2 = batsman2;
    }
}