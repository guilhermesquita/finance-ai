import React from "react";
import { db } from "../_lib/prisma";
import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import { DataTable } from "../_components/ui/data-table";
import { transactionsColumns } from "./collumns";

const Transactions = async () => {
  const transactions = await db.transaction.findMany({});
  return (
    <div className="space-y-6 p-6">
      <div className="flex w-full items-center justify-between">
        <h1>Transactions</h1>
        <Button
          className="rounded-full"
          // onClick={() => db.transaction.create({})}
        >
          Adicionar Transação
          <ArrowDownUpIcon className="ml-2 font-bold" />
        </Button>
      </div>
      <DataTable columns={transactionsColumns} data={transactions} />
    </div>
  );
};

export default Transactions;
