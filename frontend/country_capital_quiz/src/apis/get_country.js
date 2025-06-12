export const getCountry = async () => {
  try {
    const res = await fetch('/get_country');
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return { success: true, data };
  } catch (err) {
    console.error('Error in getCountry:', err);
    return { success: false, error: err };
  }
};