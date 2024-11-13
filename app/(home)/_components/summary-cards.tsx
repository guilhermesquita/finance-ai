import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import SummaryCard from "./summary-card";
import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";

interface SummaryCardsProps {
  month: string;
}

const SummaryCards = async ({ month }: SummaryCardsProps) => {
  const { userId } = await auth();

  const where = {
    date: {
      gte: new Date(`2024-${month}-01`),
      lt: new Date(`2024-${month}-31`),
    },
  };

  const depositTotal = Number(
    (
      await db.transaction.aggregate({
        where: {
          userId: userId as string,
          type: "DEPOSIT",
          ...where,
        },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );

  const investmentsTotal = Number(
    (
      await db.transaction.aggregate({
        where: {
          userId: userId as string,
          type: "INVESTMENT",
          ...where,
        },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );

  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        where: {
          userId: userId as string,
          type: "EXPENSE",
          ...where,
        },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );

  const balance = Number(depositTotal) - investmentsTotal - expensesTotal;

  return (
    <div className="space-y-6">
      <SummaryCard
        ammount={balance}
        title={"Saldo"}
        size="large"
        icon={<PiggyBankIcon size={16} />}
      />

      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          ammount={investmentsTotal}
          title={"Investido"}
          icon={<PiggyBankIcon size={14} />}
        />
        <SummaryCard
          ammount={depositTotal}
          title={"Receita"}
          icon={<TrendingUpIcon size={14} />}
        />
        <SummaryCard
          ammount={expensesTotal}
          title={"Despesas"}
          icon={<TrendingDownIcon size={14} />}
        />
      </div>
    </div>
  );
};

export default SummaryCards;
