export async function GET() {
  try {
    const res = await fetch('https://propertylist.free.beeceptor.com/propertylist');
    const data = await res.json();
    return Response.json({ properties: data, total: data.length });
  } catch (err) {
    console.error('Fetch error:', err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
