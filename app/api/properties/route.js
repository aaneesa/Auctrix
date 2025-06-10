export async function GET() {
  try {
    console.log('Fetching properties from mock server...');
    const response = await fetch('https://propertylist.free.beeceptor.com/propertylist', {
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      console.error('Mock server response not OK:', response.status, response.statusText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Total properties received:', data.length);
  
    return Response.json({ 
      properties: data,
      total: data.length 
    });
  } catch (error) {
    console.error('Error in properties API route:', error);
    return Response.json(
      { 
        error: 'Failed to fetch properties',
        details: error.message
      },
      { status: 500 }
    );
  }
} 