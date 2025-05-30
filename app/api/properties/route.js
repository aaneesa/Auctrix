export async function GET() {
  try {
    console.log('Fetching properties from mock server...');
    const response = await fetch('https://9753b703-d6ef-480c-8852-fbb4240099e7.mock.pstmn.io/properties', {
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
    
    // Ensure we're returning all properties
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