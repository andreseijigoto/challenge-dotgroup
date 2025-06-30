export interface iUserAccountAvatar {
  gravatar: { hash: string }
  tmdb: { avatar_path: string | null }
}

export interface iUserAccount {
  avatar: iUserAccountAvatar
  id: number | null
  include_adult: boolean | null
  iso_639_1: string | null
  iso_3166_1: string | null
  name: string | null
  username: string | null
}
