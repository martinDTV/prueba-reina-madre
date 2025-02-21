import DefaultLayout from "@/layouts/default";
import { useAuth } from "@/context/AuthContext";
import ComponentLoginIndex from "@/components/ComponentsIndexPage/ComponentLoginIndex";
import ComponentStart from "@/components/ComponentStart/ComponentStart";

export default function IndexPage() {
  const { user } = useAuth();

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <main className="w-full h-full">
          {user === undefined ? (
            <div className="w-full flex justify-center items-center">
              <ComponentLoginIndex />
            </div>
          ) : (
            <ComponentStart />
          )}
        </main>
      </section>
    </DefaultLayout>
  );
}
