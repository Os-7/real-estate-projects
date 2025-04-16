import * as cheerio from 'cheerio'

const getCoordinates = async (location) => {
  const apiKey = 'b371cbfb5bae4d88a993520074789f34';  // Replace with your OpenCage API key
  const res = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${apiKey}`);
  const data = await res.json();

  // Log the response to verify the coordinates
  console.log("Geocoding response for location:", location);
  console.log(data);  // Check the raw response for the coordinates

  if (data.results && data.results.length > 0) {
    const { lat, lng } = data.results[0].geometry;
    console.log(`Coordinates for ${location}: Latitude: ${lat}, Longitude: ${lng}`);  // Log the coordinates
    return { latitude: lat, longitude: lng };
  }

  console.log(`No coordinates found for location: ${location}`);
  return { latitude: null, longitude: null };
}



export async function POST(req) {
  const { cityName } = await req.json()
  const url = `https://www.magicbricks.com/new-projects-${cityName}`

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3', // Custom User-Agent
      },
    })

    // Check if the request is successful
    if (!res.ok) {
      throw new Error(`Failed to fetch the page, status: ${res.status}`)
    }

    const html = await res.text()
    const $ = cheerio.load(html)

    const projects = []

    // Create an array of promises for each project
    const projectPromises = $('.mghome__prjblk__imgsec').map(async (_, el) => {
      const name = $(el).find('.mghome__prjblk__prjname').text().trim() || 'Unknown Name'
      const location = $(el).find('.mghome__prjblk__locname').text().trim() || 'Unknown Location'
      const priceRange = $(el).find('.mghome__prjblk__price').text().trim() || 'Price Not Available'
      const bhk = $(el).find('.mghome__prjblk__bhk').text().trim() || 'Unknown BHK'

      // Fetch coordinates for each project
      const { latitude, longitude } = await getCoordinates(location)

      // Return project data
      return {
        id: name + location,
        name,
        location,
        priceRange,
        bhk,
        coordinates: { latitude, longitude },
      }
    }).get() // Convert the map to an array of promises

    // Wait for all the promises to resolve
    const projectsData = await Promise.all(projectPromises)

    //console.log("Fetched projects:", projectsData)

    return Response.json({ projects: projectsData })
  } catch (err) {
    console.error('Error during scraping: ', err)
    return new Response(`Failed to scrape: ${err.message}`, { status: 500 })
  }
}
