import ViewProduct from '@/components/ui/viewProduct'



export default async function Page({ params }: any) {
  return (
    <div>
      <ViewProduct id={params.id} />
    </div>
  );
}
