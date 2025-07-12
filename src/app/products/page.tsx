

export default async function ProductsPage() {
    const res = await fetch('http://localhost:3000/api/items');
    const data = await res.json();
  return (
    <div>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}