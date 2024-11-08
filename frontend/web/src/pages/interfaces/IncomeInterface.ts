interface IncomeInterface {
    id: number;
    description: string;
    user:number;
    value: number;
    date: string;
    account: {name:string,id:number};
  }

export default IncomeInterface;