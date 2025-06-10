import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    console.log('Fetching property with ID:', params.id);
    const response = await fetch(`https://auctrix-backend.onrender.com/api/properties/${params.id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    console.log('API Response Status:', response.status);

    if (response.status === 404) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('API Error Response:', errorData);
      throw new Error(errorData.message || `Failed to fetch property: ${response.status}`);
    }

    const data = await response.json();
    console.log('API Response Data:', data);

    if (!data || typeof data !== 'object') {
      throw new Error('Invalid response format from API');
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in property API route:', error);
    if (error.message.includes('Failed to fetch')) {
      return NextResponse.json(
        { 
          error: 'Unable to connect to the server. Please check your internet connection.',
          details: error.message
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { 
        error: error.message || 'Failed to fetch property details',
        details: error.stack
      },
      { status: 500 }
    );
  }
} 