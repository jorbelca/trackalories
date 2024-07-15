import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

let mealStoreIn = (set) => ({
  meals: [],
  setMeal: (newMeal) =>
    set((state) => ({
      meals: [...state.meals, { id: state.meals.length + 1, ...newMeal }],
    })),
  removeMeal: (id) =>
    set((state) => ({
      meals: state.meals.filter((meal) => meal.id !== id),
    })),
  resetSearchedMeals: () =>
    set(() => ({
      meals: [],
    })),
})

let userStoreIn = (set) => ({
  user: {},
  setUser: (data) => set(() => ({ user: data })),
  setUserWeight: ({ weight }) =>
    set((state) => ({
      user: { ...state.user, weight },
    })),

  removeUser: () => {
    set(() => ({ user: {} }))
  },
})

let searchStoreIn = (set) => ({
  search: [],
  setSearch: (newSearch) => set(() => ({ search: newSearch })),
})

let notificationStoreIn = (set) => ({
  notifications: [],
  setNotifications: (message) =>
    set(() => ({
      notifications: [message],
    })),
  removeNotifications: () =>
    set(() => ({
      notifications: [],
    })),
})

mealStoreIn = devtools(mealStoreIn)
mealStoreIn = persist(mealStoreIn, { name: "mealsState" })
export const mealStore = create(mealStoreIn)

userStoreIn = devtools(userStoreIn)
userStoreIn = persist(userStoreIn, { name: "userState" })
export const userStore = create(userStoreIn)

export const searchStore = create(searchStoreIn)

notificationStoreIn = devtools(notificationStoreIn)
export const notificationStore = create(notificationStoreIn)
