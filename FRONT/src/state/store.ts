import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";

let mealStoreIn: StateCreator<MealState> = (set) => ({
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
});

let userStoreIn: StateCreator<UserState> = (set) => ({
  user: {} as User,
  setUser: (data) => set(() => ({ user: data })),
  setUserWeight: (weight) =>
    set((state) => ({
      user: { ...state.user, weight },
    })),
  removeUser: () => {
    set(() => ({ user: {} as User }));
  },
});

let searchStoreIn: StateCreator<SearchState> = (set) => ({
  search: [],
  setSearch: (newSearch) => set(() => ({ search: newSearch })),
});

let notificationStoreIn: StateCreator<NotificationState> = (set) => ({
  notifications: [],
  setNotifications: (message) =>
    set(() => ({
      notifications: [message],
    })),
  removeNotifications: () =>
    set(() => ({
      notifications: [],
    })),
});

export const mealStore = create<MealState>()(
  persist(devtools(mealStoreIn), { name: "mealsState" })
);
export const userStore = create<UserState>()(
  persist(devtools(userStoreIn), { name: "userState" })
);

export const searchStore = create<SearchState>(searchStoreIn);

export const notificationStore = create<NotificationState>()(
  devtools(notificationStoreIn)
);
