export function getAge(age: string) {
  if (age) {
    return Math.floor(
      (Date.now() - Date.parse(age)) / 1000 / 60 / 60 / 24 / 365
    );
  } else {
    console.error("Not a valid age");
  }
}
