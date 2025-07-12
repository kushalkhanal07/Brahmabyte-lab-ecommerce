// @ts-ignore
import ViewProduct from '@/components/ui/viewProduct'

type PageProps = {
  params: Promise<{ id: string }>; // params is now a Promise
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return (
    <div>
      <ViewProduct id={id} />
    </div>
  );
}
