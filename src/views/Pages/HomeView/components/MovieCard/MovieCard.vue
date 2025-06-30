<template>
  <div class="movie-card">
    <div class="movie-card__header">
      <AppButton
        class="movie-card__favorite"
        icon="heart-outline"
        color="red"
        transparent
        @click="handleClickFavorite"
      />
      <div
        class="movie-card__image"
        :style="{ backgroundImage: `url(${imgPath}/w500${movie.poster_path})` }"
      />
      <div class="movie-card__release-date">{{ releaseDate }}</div>
    </div>

    <div class="movie-card__container flex flex-col gap-1">
      <p class="movie-card__title">{{ title }}</p>

      <div class="flex align-center justify-center">
        <p class="movie-card__rating">
          <AppIcon icon="star" class="movie-card__rating-icon" />
          <span class="movie-card__rating-average">{{ average }}</span>
        </p>

        <p class="movie-card__genres">{{ genres }}</p>
      </div>

      <p class="movie-card__price">{{ getMonetary(movie.price) }}</p>
    </div>

    <div class="movie-card__footer">
      <AppButton class="movie-card__button" label="Adicionar" @click="handleClickAdd" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, inject, type PropType } from 'vue'
  import { AppIcon, AppButton } from '@/components'
  import { MONTHS } from '@/constants/dates'
  import { useNumberHandler } from '@/providers/composables'
  import type { iMovie } from '@/providers/services'

  defineOptions({
    name: 'MovieCard'
  })

  const props = defineProps({
    movie: {
      type: Object as PropType<iMovie>,
      required: true
    }
  })

  const { getMonetary } = useNumberHandler()

  const emit = defineEmits(['clickAdd'])

  const imgPath = inject('imgPath')
  const title = computed(() => props.movie.title)
  const average = computed(() => Math.floor(props.movie.vote_average))
  const genres = computed(() => props.movie.genres[0])

  const releaseDate = computed(() => {
    if (props.movie?.release_date) {
      const date = new Date(props.movie.release_date)

      return `${date.getDate()} de ${MONTHS[date.getMonth()]}, ${date.getFullYear()}`
    }

    return ''
  })

  const handleClickAdd = () => {
    emit('clickAdd', props.movie)
  }

  const handleClickFavorite = () => {
    alert(`favorite ${props.movie.id}`)
  }
</script>

<style lang="scss" scoped>
  .movie-card {
    border: 1px solid var(--border-color);
    border-radius: 0.25rem;
    overflow: hidden;

    &__header {
      position: relative;
    }

    &__container {
      padding: 0.75rem;

      @media #{$md-and-up} {
        padding: 1rem;
      }
    }

    &__favorite {
      background-color: rgba(255, 255, 255, 0.5) !important;
      position: absolute;
      top: 0;
      right: 0;
    }

    &__image {
      aspect-ratio: 3 / 4;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      width: 100%;
    }

    &__release-date {
      background-color: rgba(255, 255, 255, 0.5);
      backdrop-filter: blur(10px);
      bottom: 0;
      color: var(--text-color);
      font-size: 1rem;
      left: 0;
      padding: 0.5rem;
      position: absolute;
      right: 0;
      text-align: center;

      @media #{$md-and-up} {
        font-size: 1.25rem;
      }
    }

    &__title {
      display: -webkit-box;
      font-weight: 700;
      overflow: hidden;
      text-align: center;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }

    &__rating {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.25rem;

      &-icon {
        font-size: 1.25rem;
      }

      &-average {
        font-size: 1rem;
      }
    }

    &__genres {
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      display: -webkit-box;
      font-size: 1rem;
      font-weight: 700;
      margin-left: 1rem;
      overflow: hidden;
      text-align: center;
      text-overflow: ellipsis;

      @media #{$md-and-up} {
        margin-left: 1.5rem;
      }
    }

    &__price {
      font-weight: 700;
      text-align: center;
    }

    &__button {
      width: 100%;
    }
  }
</style>
