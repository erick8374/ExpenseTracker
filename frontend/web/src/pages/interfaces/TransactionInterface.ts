interface TransactionInterface {
  id?:number;
  type?: string;
  amount?: number;
  description?: string;
  date?: string;
  created_at?: string;
  updated_at?: string;
  user?: 1;
  account?: {name: string,id:number};
  category?: {name: string,id:number};
  }

export default TransactionInterface;