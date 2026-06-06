const products = [
  { id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
  { id: "fc-2050", name: "power laces", averagerating: 4.7 },
  { id: "fs-1987", name: "time circuits", averagerating: 3.5 },
  { id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
  { id: "jj-1969", name: "warp equalizer", averagerating: 5.0 }
];

function getProductName(id) {
  const product = products.find(item => item.id === id);
  return product ? product.name : id;
}

function formatFeatures(params) {
  const features = params.getAll('usefulFeatures');
  return features.length ? features.join(', ') : 'None selected';
}

function buildSummary(params) {
  const productId = params.get('productName');
  const productName = productId ? getProductName(productId) : 'Unknown product';
  const rating = params.get('rating') || 'Not provided';
  const date = params.get('installationDate') || 'Not provided';
  const features = formatFeatures(params);
  const reviewText = params.get('writtenReview') || 'No review entered';
  const userName = params.get('userName') || 'Anonymous';

  return `
    <dl>
      <div>
        <dt>Product</dt>
        <dd>${productName}</dd>
      </div>
      <div>
        <dt>Overall rating</dt>
        <dd>${rating} star${rating === '1' ? '' : 's'}</dd>
      </div>
      <div>
        <dt>Date of installation</dt>
        <dd>${date}</dd>
      </div>
      <div>
        <dt>Useful features</dt>
        <dd>${features}</dd>
      </div>
      <div>
        <dt>Written review</dt>
        <dd>${reviewText}</dd>
      </div>
      <div>
        <dt>Submitted by</dt>
        <dd>${userName}</dd>
      </div>
    </dl>
  `;
}

function updateReviewCounter() {
  const storageKey = 'reviewSubmitCount';
  const currentCount = Number(localStorage.getItem(storageKey) || 0) + 1;
  localStorage.setItem(storageKey, currentCount);
  return currentCount;
}

function showConfirmation() {
  const params = new URLSearchParams(window.location.search);
  const summary = document.querySelector('.review-summary');
  const message = document.querySelector('.review-message');

  if (!params.has('productName') || !params.has('rating')) {
    message.textContent = 'No review data was found. Please return to the form and submit your review.';
    summary.innerHTML = '';
    return null;
  }

  message.textContent = 'Your review has been received and added to the count.';
  summary.innerHTML = buildSummary(params);
  return true;
}

document.addEventListener('DOMContentLoaded', () => {
  const validSubmission = showConfirmation();
  const reviewCount = validSubmission ? updateReviewCounter() : Number(localStorage.getItem('reviewSubmitCount') || 0);
  document.getElementById('reviewCount').textContent = reviewCount;
});
