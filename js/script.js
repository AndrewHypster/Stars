"use strict"
const
$ = e => document.querySelector(e),
$All = e => document.querySelectorAll(e),

ratings = $All('.rating'),

// О С Н О В Н А   Ф У Н К Ц І Я ***
initRatings = () => {
  let ratingActive, ratingValue
  const 

  // Инициализация переменних
  initRatingVars = rating => {
    ratingActive = rating.querySelector('.rating__active')
    ratingValue = rating.querySelector('.rating__value')
  },

  // Змінюєм ширину активних зірок
  setRatingActiveWidth = (i = ratingValue.innerHTML) => {
    const ratingActiveWidth = i/0.05
    ratingActive.style.width = `${ratingActiveWidth}%`
  },

  setRatingValue = async (value, rating) => {
    if (!rating.classList.contains('rating_sending')) {
      rating.classList.add('rating_sending')

      //відправка value на сервер
      let response = await fetch('rating.json', {
        method: 'GET',

        // body: JSON.stringify({
        //   userRating: value
        // }),
        // headers: {
        //   'content-type': 'application/json'
        // }

      })
      if (response.ok) {
        const
        result = await response.json()

        // Отримуємо новий рейтинг
        const newRating = result.newRating

        //Вивід нового середнього результату
        ratingValue.innerHTML = newRating

        // Оноввлення активних зірок
        setRatingActiveWidth()
        
        rating.classList.remove('rating_sending')
      } else {
        alert('Помилка')
        rating.classList.remove('rating_sending')
      }
    }
  },

  // Можливість встановити оцінку
  setRating = rating => {
    const ratingsItems = rating.querySelectorAll('.rating__item')
    ratingsItems.forEach((ratingItem, index) => {
      ratingItem.addEventListener("mouseenter", e => {
        // Оновлюєм змінні
        initRatingVars (rating)
        // Оновлюєм активні зірочки
        setRatingActiveWidth(ratingItem.value)
      })
      ratingItem.addEventListener("mouseleave", e => {
        // Оновлюєм активні зірочки
        setRatingActiveWidth()
      })
      ratingItem.addEventListener("click", e => {
        // Оновлюєм змінні
        initRatingVars (rating)

        if (rating.dataset.ajax) setRatingValue(rating.value, rating)
        else {
          ratingValue.innerHTML = index+1;
          setRatingActiveWidth();
        }
      })
    })
  },

  // Инициализируем конкретний рейтинг
  initRating = rating => {
    initRatingVars(rating)
    setRatingActiveWidth()

    if (rating.classList.contains('rating_set')) setRating(rating)
  }

  // Біжимо по всім класам .rating
  ratings.forEach(rating => initRating(rating))
}

if (ratings) initRatings()