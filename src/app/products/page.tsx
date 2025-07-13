
export const dynamic = "force-dynamic";
type Product = {
  _id: string;
  name: string;
  price: number;
};
export default async function ProductsPage() {
  
    const res = await fetch('http://localhost:3000/api/items');
    const data = await res.json();
  return (
    <div>
      <ul>
        {data.map((item: Product) => (
          <li key={item._id}>{item.name} - ${item.price}</li>
        ))}
      </ul>
    </div>
  );
}