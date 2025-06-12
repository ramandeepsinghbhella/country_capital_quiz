export const postCheckAnswer = async ({ id, country, capital }) => {
  try {
    const res = await fetch('/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, country, capital })
    });

    if (res.status === 200) {
      return { success: true };
    } else if (res.status === 400) {
      const data = await res.json();
      return { success: false, correctAnswer: data.correct_answer };
    } else {
      throw new Error(`Unexpected response: ${res.status}`);
    }
  } catch (err) {
    console.error('Error in postCheckAnswer:', err);
    return { success: false, error: err };
  }
};