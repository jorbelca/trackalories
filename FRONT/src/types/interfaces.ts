interface Meal {
  id: number;
  name: string;
  calories: number;
}

interface User {
  name: string;
  weight: number;
}

interface Search {
  term: string;
}

interface Notification {
  message: string;
}
interface MealState {
  meals: Meal[];
  setMeal: (newMeal: Omit<Meal, "id">) => void;
  removeMeal: (id: number) => void;
  resetSearchedMeals: () => void;
}

interface UserState {
  user: User;
  setUser: (data: User) => void;
  setUserWeight: (weight: number) => void;
  removeUser: () => void;
}

interface SearchState {
  search: Search[];
  setSearch: (newSearch: Search[]) => void;
}

interface NotificationState {
  notifications: Notification[];
  setNotifications: (message: Notification) => void;
  removeNotifications: () => void;
}
