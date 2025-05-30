export async function GET(request, { params }) {
  try {
    const response = await fetch(`https://https://9753b703-d6ef-480c-8852-fbb4240099e7.mock.pstmn.io/properties/${params.id}`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Error fetching property details:', error);
    return Response.json(
      { error: 'Failed to fetch property details' },
      { status: 500 }
    );
  }
} 