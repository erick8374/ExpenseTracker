interface ExpenseInterface {
    id: number;
    description: string;
    value: number;
    date: string;
    category: { name: string; id: number };
  }

  export default ExpenseInterface;