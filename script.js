/************************************************
 * ГАЛЕРЕЯ (изображения)
 ************************************************/
const galleryImages = document.querySelectorAll('.gallery-image');
let currentImageIndex = 0;
let galleryTimer;

function showImage(index) {
  galleryImages.forEach((img, i) => {
    img.classList.remove('active');
    if (i === index) {
      img.classList.add('active');
    }
  });
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
  showImage(currentImageIndex);
}

function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  showImage(currentImageIndex);
}

function startGalleryAutoPlay() {
  galleryTimer = setInterval(nextImage, 4000);
}

function stopGalleryAutoPlay() {
  clearInterval(galleryTimer);
}

// Кнопки переключения галереи
document.getElementById('nextImage').addEventListener('click', () => {
  stopGalleryAutoPlay();
  nextImage();
  startGalleryAutoPlay();
});

document.getElementById('prevImage').addEventListener('click', () => {
  stopGalleryAutoPlay();
  prevImage();
  startGalleryAutoPlay();
});

// Запуск галереи
showImage(currentImageIndex);
startGalleryAutoPlay();

/************************************************
 * КАРУСЕЛЬ ОТЗЫВОВ
 ************************************************/
const reviewSlide = document.getElementById('reviewSlide');
const reviewItems = document.querySelectorAll('.review-item');
const nextReviewBtn = document.getElementById('nextReview');
const prevReviewBtn = document.getElementById('prevReview');

let currentReviewIndex = 0;
let itemsPerSlide = 3; // по умолчанию для десктопа
let maxReviewIndex = 0; // вычислим динамически

function getItemsPerSlide() {
  // Если ширина окна < 768, показываем 1 отзыв, иначе 3
  return window.innerWidth < 768 ? 1 : 3;
}

function updateReviewLayout() {
  itemsPerSlide = getItemsPerSlide();
  
  // Рассчитаем максимально возможный индекс
  // чтобы при пролистывании не "улетать" дальше
  maxReviewIndex = Math.max(0, reviewItems.length - itemsPerSlide);

  // Устанавливаем ширину контейнера, чтобы все элементы
  // были в одной "строке" (горизонтальная лента)
  reviewSlide.style.width = (reviewItems.length * (100 / itemsPerSlide)) + '%';
  
  // Каждому отзыву задаём ширину = 100% / (количество показываемых одновременно)
  // Но с учётом общего количества? См. ниже:
  reviewItems.forEach(item => {
    // При itemsPerSlide=3, каждый отзыв занимает 1/3 ширины контейнера
    // При itemsPerSlide=1, каждый отзыв занимает 100% контейнера
    item.style.width = (100 / reviewItems.length * reviewItems.length / itemsPerSlide) + '%';
  });
  
  // Сбрасываем текущий индекс, если он выходит за границы
  if (currentReviewIndex > maxReviewIndex) {
    currentReviewIndex = maxReviewIndex;
  }

  updateReviewsPosition();
}

function updateReviewsPosition() {
  // Смещаем "ленту" отзывов влево на currentReviewIndex "шагов"
  // Каждый "шаг" = (100 / itemsPerSlide) процентов
  const offset = (currentReviewIndex * (100 / itemsPerSlide));
  reviewSlide.style.transform = `translateX(-${offset}%)`;
}

function nextReview() {
  if (currentReviewIndex < maxReviewIndex) {
    currentReviewIndex++;
    updateReviewsPosition();
  }
}

function prevReview() {
  if (currentReviewIndex > 0) {
    currentReviewIndex--;
    updateReviewsPosition();
  }
}

// Навешиваем события на стрелки
nextReviewBtn.addEventListener('click', nextReview);
prevReviewBtn.addEventListener('click', prevReview);

// При загрузке страницы подстраиваем верстку
updateReviewLayout();

// Также слушаем изменение размера окна, чтобы динамически менять количество отзывов
window.addEventListener('resize', updateReviewLayout);