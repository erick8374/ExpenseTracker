interface AccountInterface {
    id?: number;
    name?: string;
    balance?: number;
    created_at?:Date;
    updated_at?:Date;
    user?: number;
    total_income:number;

  }
  
  export default AccountInterface;