class TypeMap{
    constructor(){
        this.Pairs = [];
    }

    AddPair(Key, Value){
        this.Pairs.push(new Pair(Key, Value));
    }

    FindValue(Key){
        for (let i = 0; i < this.Pairs.length; i++){
            if (Key == this.Pairs.Key){
                return this.Pairs.Value;
            }
        }
    }
}