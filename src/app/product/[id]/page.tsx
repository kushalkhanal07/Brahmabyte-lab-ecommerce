// @ts-ignore
import ViewProduct from '@/components/ui/viewProduct'

interface check{
  id: string
}

export default async function Page({ params }: { params: check }) {
  return (
    <div>
      <ViewProduct id={params.id} />
    </div>
  );
}
