import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import SummaryCard from "./summary-card";

interface SummaryCardsProps {
  balance: number;
  investmentsTotal: number;
  depositsTotal: number;
  expensesTotal: number;
}

const SummaryCards = async ({
  balance,
  investmentsTotal,
  depositsTotal,
  expensesTotal,
}: SummaryCardsProps) => {
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
          ammount={depositsTotal}
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
