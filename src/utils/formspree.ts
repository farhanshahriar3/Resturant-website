export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xoearnob';

export async function submitToFormspree(
  data: Record<string, any>
): Promise<{ ok: boolean; error?: string }> {
  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        ...data,
        _subject: `New submission: ${data.formType || 'Website Inquiry'} - Modak Cafe`,
        sourceUrl: window.location.href,
        submittedAt: new Date().toLocaleString()
      })
    });

    if (response.ok) {
      return { ok: true };
    } else {
      const errorData = await response.json().catch(() => ({}));
      return {
        ok: false,
        error: errorData.error || 'Submission failed. Please try again.'
      };
    }
  } catch (err: any) {
    console.error('Formspree submission error:', err);
    return {
      ok: false,
      error: err?.message || 'Network error occurred during submission.'
    };
  }
}
