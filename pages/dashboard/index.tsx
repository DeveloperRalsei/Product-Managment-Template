import { MainLayout } from "@/layouts/mainLayout";
import { withAuth } from "@/lib/withAuth";

export const getServerSideProps = withAuth();

export default function Dashboard() {
  return <MainLayout>
    <h1>Dashboard</h1>
  </MainLayout>;
}
