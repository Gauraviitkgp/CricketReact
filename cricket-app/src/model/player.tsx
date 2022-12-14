import { createData, NotOut, RunsTableInput } from "./runsTable";

export default class Batting {
    Batsman1:RunsTableInput = createData("",0,0,0,0);
    Batsman2:RunsTableInput = createData("",0,0,0,0);

    constructor (){
    }

    setBatsman1(b:RunsTableInput){
        this.Batsman1 = b;
    }

    setBatsman2(b:RunsTableInput){
        this.Batsman2 = b;
        if (this.Batsman1.strike && this.Batsman2.strike ){
            this.Batsman2.strike = false;
        }
    }

    valid():boolean{
        if (this.Batsman1.name === "" || this.Batsman2.name === ""){
            return false;
        }

        return true;
    }

    onStrike():RunsTableInput {
        if (this.Batsman1.strike){
            return this.Batsman1;
        }

        return this.Batsman2;
    }

    nonStrike():RunsTableInput{
        if (this.Batsman1.strike){
            return this.Batsman2;
        }

        return this.Batsman1;
    }

    addRuns(runs:number){
        let batter = this.onStrike();

        batter.runs += runs;
		batter.balls += 1;

		if (runs === 4) {
			batter.fours += 1;
		} else if (runs === 6) {
			batter.sixes += 1;
		}

        if (runs%2 === 1){
            this.rotateStrike();
        }
    }

    rotateStrike() {
        this.Batsman1.strike = !this.Batsman1.strike;
        this.Batsman2.strike = !this.Batsman2.strike;
    }

    existsByName(name:string):boolean{
        if (this.valid()&& ((this.Batsman1.name === name && this.Batsman1.howout === NotOut) || (this.Batsman2.name === name && this.Batsman2.howout === NotOut) )){
            return true;
        }

        return false;
    }

    batterOut(howout:string){
        let batter = this.onStrike();
        console.log(batter);
        batter.howout = howout;
        batter.strike = false;
    }
    
    print(){
        console.log(this.Batsman1);
        console.log(this.Batsman2);
    }
}