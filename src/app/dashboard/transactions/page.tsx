import Link from "next/link";

const transactions = [
  {
    id: 1,
    name: "Prashant Shukla",
    amount: 10,
    transactionId: "pay_LVEX2iP4vmeoaR",
    date: "Fri Mar 24 2023",
    pancard: "0*******R",
  },
];

export default function TransactionsPage() {
  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <Link href="/dashboard" className="hover:underline">
          General
        </Link>{" "}
        / Transactions
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>

      {/* Table */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-left">
              <th className="border border-gray-200 px-4 py-2">ID</th>
              <th className="border border-gray-200 px-4 py-2">Name</th>
              <th className="border border-gray-200 px-4 py-2">Amount</th>
              <th className="border border-gray-200 px-4 py-2">
                Transaction Id
              </th>
              <th className="border border-gray-200 px-4 py-2">Date</th>
              <th className="border border-gray-200 px-4 py-2">Pancard</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="text-gray-700">
                <td className="border border-gray-200 px-4 py-2">{tx.id}</td>
                <td className="border border-gray-200 px-4 py-2 text-blue-500 underline cursor-pointer">
                  {tx.name}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {tx.amount}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {tx.transactionId}
                </td>
                <td className="border border-gray-200 px-4 py-2">{tx.date}</td>
                <td className="border border-gray-200 px-4 py-2">
                  {tx.pancard}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
