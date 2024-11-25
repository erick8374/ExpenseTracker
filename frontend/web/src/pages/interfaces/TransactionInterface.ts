interface TransactionInterface {
  id?:number;
  type?: "income" | "expense";
  amount?: number;
  description?: string;
  date?: string;
  created_at?: string;
  updated_at?: string;
  user?: {name: string,id:number};
  account?: {name: string,id:number};
  category?: {name: string,id:number}
  }

export default TransactionInterface;