import Title from "@/app/(components)/layout/Title";
import { createUserData } from "@/utils/helpers";
import dynamic from "next/dynamic";
import Divider from "@/app/(components)/layout/Divider";
import SummaryTable from "@/app/(components)/data/SummaryTable";

const InfoCard = dynamic(() => import("@/app/(components)/data/InfoCard"));

const userRows = [
  createUserData({
    id: "1",
    firstName: "khalifa",
    otherNames: "bakari",
    lastName: "fumo",
    email: "khalifafumo5@gmail.com",
    phone: "0712345678",
    role: "user",
    nationalId: "39386977",
    status: "active",
    createdAt: new Date("2004-10-19 10:23:54"),
    lastActive: new Date("2014-10-19 10:23:54"),
  }),
  createUserData({
    id: "2",
    firstName: "khalifa",
    otherNames: "bakari",
    lastName: "fumo",
    email: "khalifafumo5@gmail.com",
    phone: "0712345678",
    role: "user",
    nationalId: "39386977",
    status: "active",
    createdAt: new Date("2004-10-19 10:23:54"),
    lastActive: new Date("2014-10-19 10:23:54"),
  }),
  createUserData({
    id: "3",
    firstName: "khalifa",
    otherNames: "bakari",
    lastName: "fumo",
    email: "khalifafumo5@gmail.com",
    phone: "0712345678",
    role: "user",
    nationalId: "39386977",
    status: "active",
    createdAt: new Date("2004-10-19 10:23:54"),
    lastActive: new Date("2014-10-19 10:23:54"),
  }),
  createUserData({
    id: "4",
    firstName: "khalifa",
    otherNames: "bakari",
    lastName: "fumo",
    email: "khalifafumo5@gmail.com",
    phone: "0712345678",
    role: "user",
    nationalId: "39386977",
    status: "active",
    createdAt: new Date("2004-10-19 10:23:54"),
    lastActive: new Date("2014-10-19 10:23:54"),
  }),
  createUserData({
    id: "5",
    firstName: "khalifa",
    otherNames: "bakari",
    lastName: "fumo",
    email: "khalifafumo5@gmail.com",
    phone: "0712345678",
    role: "user",
    nationalId: "39386977",
    status: "active",
    createdAt: new Date("2004-10-19 10:23:54"),
    lastActive: new Date("2014-10-19 10:23:54"),
  }),
];

export default function Admin() {
  return (
    <main>
      <Title title="Admin Dashboard" pageTitle />

      {/* Accounts Summary */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          columnGap: 0,
          rowGap: "15px",
        }}
      >
        <InfoCard admin content="balance" amount={2000000000} />
        <InfoCard admin content="shares" amount={200000000} />
        <InfoCard admin content="loans" amount={200000} />
        <InfoCard admin content="welfare" amount={20000} />
      </div>

      <Divider />

      {/* User Summary */}
      <Title title="Recent Users" />
      <SummaryTable admin rows={userRows} />

      <Divider />
      {/* Transactions Summary */}
      <Title title="Recent Transactions" />
      <SummaryTable admin rows={[]} />
    </main>
  );
}
