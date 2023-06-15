
const loaderContainer = document.getElementById('loader-container');

export function hideLoading() {

      loaderContainer.style.display = 'none';
      console.log("hide")
};

export function displayLoading() {
    loaderContainer.style.display = 'flex';
};