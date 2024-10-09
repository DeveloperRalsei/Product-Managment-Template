import { DashboardLayout } from "@/layouts/DashboardLayout";
import { withAuth } from "@/lib/withAuth";

export const getServerSideProps = withAuth();

export default function Dashboard() {
  return <DashboardLayout>
    <h1>Dashboard</h1>
  </DashboardLayout>;
}
